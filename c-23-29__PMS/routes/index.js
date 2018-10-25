const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const util = require('../helpers/util');

module.exports = function(pool){

  /* GET login page. */
  router.get('/', function(req, res, next) {
    res.render('login', {alert: null});
  });

  // cek login
  router.post('/', function(req, res){
    getDB(`SELECT COUNT(email) AS login FROM users WHERE email='${req.body.email}' AND password='${req.body.password}'`, function(data){
      if(data[0].login > 0){
        // menyimpan email yg diinputkan dari form login ke session
        req.session.email = req.body.email;
        res.redirect('/projects');
      }else{
        res.render('login', {alert: "Password dan email salah!!"});
      }
    });
  });

  //    ===================================================================================
  // ==================================== PROJECTS ===========================================
  //    ===================================================================================

  // get projects page
  router.get('/projects', helpers, function(req, res, next){
    var offset = req.query.o || 0;
    var cpage = req.query.c || 1;
    // get data tabel project
    getDB(`SELECT projects.projectid AS id, name, array_to_string(array_agg(distinct firstname),', ') AS member FROM members, users, projects WHERE members.userid=users.userid AND members.projectid=projects.projectid GROUP BY name, projects.projectid LIMIT 5 OFFSET ${offset}`, function(data){ // get data projects
      getDB(`SELECT * FROM users`, function(users){
        // get jumlah project
        getDB(`SELECT COUNT(projectid) as count FROM projects`, function(c){ // get data projects
          // get colum yang akan ditampilkan
          getDB(`SELECT * FROM colum WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
            // get jumlah halaman
            var page = Math.ceil(c[0].count/5);
            res.render('projects', {
              data: data,
              colum: colum,
              cpage: cpage,
              page: page,
              users: users
            });
          });
        });
      });
    });
  });

  router.get('/search', helpers, function(req, res, next){
    let id = req.query.id || 0;
    let ck_id = req.query.ck_id || 0;
    let name = req.query.name || 0;
    let ck_name = req.query.ck_name || 0;
    let members = req.query.members;
    let ck_members = req.query.ck_members || 0;
    let having_m = "";
    let condition = [];
    if(id != 0 && ck_id != 0)condition.push(`projects.projectid=${id}`);
    if(name != 0 && ck_name != 0)condition.push(`name='${name}'`);
    if(members != "not select" && ck_members != 0) having_m = `HAVING array_to_string(array_agg(distinct firstname),', ') LIKE '%${members}%'`;
    if(condition.length > 0 || having_m != ""){
      condition.length > 0 ? condition = `AND ${condition.join(" AND ")}` : condition = "";
      getDB(`SELECT projects.projectid AS id, name, array_to_string(array_agg(distinct firstname),', ') AS member FROM members, users, projects WHERE members.userid=users.userid AND members.projectid=projects.projectid ${condition} GROUP BY name, projects.projectid ${having_m}`, function(data){ // get data projects
        getDB(`SELECT * FROM colum WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
          getDB(`SELECT * FROM users`, function(users){
            res.render('projects', {
              data: data,
              colum: colum,
              cpage: 0,
              page: 0,
              users: users
            });
          });
        });
      });
    }else{
      res.redirect('/projects');
    }
  });

  router.get('/profile', helpers, function(req, res, next){
    let email = req.session.email;
    getDB(`SELECT * FROM users WHERE email='${email}'`, function(data){
      res.render('profile', {
        email: email,
        data: data
      });
    });
  });

  router.post('/profile', helpers, function(req, res, next){
    let position = req.body.position;
    let type = req.body.type;
    let password = "";
    req.body.password ? password = `, password='${req.body.password}'` : password = "";
    // update data di database
    executeDB(`UPDATE users SET role='${position}', type='${type}' ${password} WHERE email='${req.session.email}'`, function(){
      res.redirect('/projects');
    });
  });

  router.get('/colum', helpers, function(req, res, next){
    let w_query = [];
    req.query.id ? w_query.push("c_id = true") : w_query.push("c_id = false");
    req.query.name ? w_query.push("c_name = true") : w_query.push("c_name = false");
    req.query.members ? w_query.push("c_member = true") : w_query.push("c_member = false");
    // update data di database
    executeDB(`UPDATE colum SET ${w_query.join(", ")} WHERE email='${req.session.email}'`, function(){
      res.redirect('/projects');
    });
  });

  // fungsi untuk menampilkan halaman project dan checkbox sejumlah user yang tersimpan
  router.get('/add_project', helpers, function(req, res, next){
    getDB(`SELECT * FROM users`, function(user){
      res.render('add_project', {user: user, alert: false});
    });
  });

  router.post('/add_project', helpers, function(req, res, next){
    let name = req.body.name;
    let members = req.body.members;
    // cek apakah name dan members diisi ?
    if(!name || !members){
      // parameter bernilai true agar alert muncul
      getDB(`SELECT * FROM users`, function(user){
        res.render('add_project', {
          user: user,
          alert: true
        });
      });
    }else{
      // menyimpan data ke tabel projects
      executeDB(`INSERT INTO projects(name) VALUES ('${name}')`, function(){
        // get id projects yang baru disimpan
        getDB(`SELECT projectid FROM projects ORDER BY projectid DESC LIMIT 1`, function(data){
          let v_members = [];
          // membentuk query untuk menyimpan data member sesuai jumlah member yang ikut serta
          for (var i = 0; i < members.length; i++) {
            v_members.push(`(${members[i]}, ${data[0].projectid})`);
          }
          // menyimpan beberapa record ke table members
          executeDB(`INSERT INTO members(userid, projectid) VALUES ${v_members.join(",")}`, function(){
            res.redirect("projects");
          });
        });
      });
    }
  });

  router.get('/edit_project/:id', helpers, function(req, res, next){
    getDB(`SELECT * FROM users`, function(user){
      getDB(`SELECT name, members.userid, projects.projectid FROM projects, members, users WHERE projects.projectid = members.projectid AND users.userid = members.userid AND projects.projectid = ${req.params.id}`, function(project){
        res.render('edit_project', {
          user: user,
          project: project,
          alert: false,
          util: util
        });
      });
    });
  });

  router.post('/edit_project/:id', helpers, function(req, res, next){
    let name = req.body.name;
    let members = req.body.members;
    let id = req.params.id;
    // cek apakah name dan members diisi ?
    if(!name || !members){
      getDB(`SELECT * FROM users`, function(user){
        getDB(`SELECT name, members.userid, projects.projectid FROM projects, members, users WHERE projects.projectid = members.projectid AND users.userid = members.userid AND projects.projectid = ${id}`, function(project){
          res.render('edit_project', {
            user: user,
            project: project,
            alert: true,
            util: util
          });
        });
      });
    }else{
      executeDB(`UPDATE projects SET name='${name}' WHERE projectid=${id}`, function(){
        // mengosongkan terlebih dahulu data member
        executeDB(`DELETE FROM members WHERE projectid=${id}`, function(){
          let v_members = [];
          // membentuk query untuk menyimpan data member sesuai jumlah member yang ikut serta
          for (var i = 0; i < members.length; i++) {
            v_members.push(`(${members[i]}, ${id})`);
          }
          // menyimpan beberapa record ke table members
          executeDB(`INSERT INTO members(userid, projectid) VALUES ${v_members.join(",")}`, function(){
            res.redirect("../projects");
          });
        });
      });
    }
  });

  router.get('/delete/:id', helpers, function(req, res, next){
    let id = req.params.id;
    executeDB(`DELETE FROM members WHERE projectid = ${id}`, function(){
      executeDB(`DELETE FROM issues WHERE projectid = ${id}`, function(){
          executeDB(`DELETE FROM projects WHERE projectid = ${id}`, function(){
            res.redirect("../projects");
        });
      });
    });
  });

  //    ===================================================================================
  // ================================ PROJECTS OVERVIEW ======================================
  //    ===================================================================================

  router.get('/projects_overview/:id', helpers, function(req, res, next) {
    let id = req.params.id;
    getDB(`SELECT COUNT(issuesid) AS b_amount FROM issues WHERE projectid = ${id} AND tracker = 'Bug'`, function(b_amount){
      getDB(`SELECT COUNT(issuesid) AS bug FROM issues WHERE projectid = ${id} AND status != 'Clossed' AND tracker = 'Bug'`, function(bug){
        getDB(`SELECT COUNT(issuesid) AS f_amount FROM issues WHERE projectid = ${id} AND tracker = 'Feature'`, function(f_amount){
          getDB(`SELECT COUNT(issuesid) AS feature FROM issues WHERE projectid = ${id} AND status != 'Clossed' AND tracker = 'Feature'`, function(feature){
            getDB(`SELECT COUNT(issuesid) AS s_amount FROM issues WHERE projectid = ${id} AND tracker = 'Support'`, function(s_amount){
              getDB(`SELECT COUNT(issuesid) AS support FROM issues WHERE projectid = ${id} AND status != 'Clossed' AND tracker = 'Support'`, function(support){
                getDB(`SELECT firstname, lastname FROM users, members WHERE members.userid = users.userid AND projectid = ${id}`, function(users){
                  res.render('projects_overview', {
                    id: id,
                    bug: bug[0].bug,
                    b_amount: b_amount[0].b_amount,
                    feature: feature[0].feature,
                    f_amount: f_amount[0].f_amount,
                    support: support[0].support,
                    s_amount: s_amount[0].s_amount,
                    users: users
                  });
                });
              });
            });
          });
        });
      });
    });
  });


  //    ===================================================================================
  // ================================ PROJECTS MEMBERS========================================
  //    ===================================================================================
  // get projects page
  router.get('/projects_members/:id', helpers, function(req, res, next){
    let offset = req.query.o || 0;
    let cpage = req.query.c || 1;
    let id = req.params.id;
    // get data tabel project
    getDB(`SELECT * FROM users, members WHERE users.userid = members.userid AND projectid = ${id} LIMIT 5 OFFSET ${offset}`, function(users){
      // get jumlah project
      getDB(`SELECT COUNT(users.userid) as count FROM users, members WHERE users.userid = members.userid AND projectid = ${id}`, function(c){ // get data projects
        // get colum yang akan ditampilkan
        getDB(`SELECT * FROM colum_member WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
          // get jumlah halaman
          var page = Math.ceil(c[0].count/5);
          res.render('projects_members', {
            id: id,
            data: users,
            colum: colum,
            cpage: cpage,
            page: page,
          });
        });
      });
    });
  });

  router.get('/add_project_member/:id', helpers, function(req, res, next){
    let id = req.params.id;
    getDB(`SELECT * FROM users`, function(user){
      getDB(`SELECT name, members.userid, projects.projectid FROM projects, members, users WHERE projects.projectid = members.projectid AND users.userid = members.userid AND projects.projectid = ${id}`, function(project){
        res.render('add_project_member', {
          id: id,
          user: user,
          project: project,
          alert: false,
          util: util
        });
      });
    });
  });

  router.post('/add_project_member/:id', helpers, function(req, res, next){
    let members = req.body.members;
    let id = req.params.id;
    // cek apakah members diisi ?
    if(!members){
      getDB(`SELECT * FROM users`, function(user){
        getDB(`SELECT name, members.userid, projects.projectid FROM projects, members, users WHERE projects.projectid = members.projectid AND users.userid = members.userid AND projects.projectid = ${id}`, function(project){
          res.render('add_project_member', {
            id: id,
            user: user,
            project: project,
            alert: true,
            util: util
          });
        });
      });
    }else{
      // mengosongkan terlebih dahulu data member
      executeDB(`DELETE FROM members WHERE projectid=${id}`, function(){
        let v_members = [];
        // membentuk query untuk menyimpan data member sesuai jumlah member yang ikut serta
        for (var i = 0; i < members.length; i++) {
          v_members.push(`(${members[i]}, ${id})`);
        }
        // menyimpan beberapa record ke table members
        executeDB(`INSERT INTO members(userid, projectid) VALUES ${v_members.join(",")}`, function(){
          res.redirect(`../projects_members/${id}`);
        });
      });
    }
  });

  router.get('/search_members/:id', helpers, function(req, res, next){
    let id = req.params.id;
    let userid = req.query.userid || 0;
    let ck_userid = req.query.ck_userid || 0;
    let name = req.query.name || 0;
    let ck_name = req.query.ck_name || 0;
    let position = req.query.position;
    let ck_position = req.query.ck_position || 0;
    let condition = [];
    if(userid != 0 && ck_userid != 0)condition.push(`users.userid=${userid}`);
    if(name != 0 && ck_name != 0)condition.push(`firstname='${name}'`);
    if(position != "not select" && ck_position != 0) condition.push(`role='${position}'`);
    if(condition.length > 0){
      getDB(`SELECT * FROM users, members WHERE users.userid = members.userid AND projectid = ${id} AND ${condition.join(" AND ")}`, function(data){ // get data projects
        getDB(`SELECT * FROM colum WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
          res.render('projects_members', {
            id: id,
            data: data,
            colum: colum,
            cpage: 0,
            page: 0,
          });
        });
      });
    }else{
      res.redirect(`/projects_members/${id}`);
    }
  });

  router.get('/delete_member/:id/:userid', helpers, function(req, res, next){
    let id = req.params.id;
    let userid = req.params.userid;
    executeDB(`DELETE FROM members WHERE projectid = ${id} AND userid = ${userid}`, function(){
      res.redirect(`../../projects_members/${id}`);
    });
  });

  router.get('/colum_member/:id', helpers, function(req, res, next){
    let id = req.params.id;
    let w_query = [];
    req.query.id ? w_query.push("c_id = true") : w_query.push("c_id = false");
    req.query.name ? w_query.push("c_name = true") : w_query.push("c_name = false");
    req.query.position ? w_query.push("c_position = true") : w_query.push("c_position = false");
    // update data di database
    executeDB(`UPDATE colum_member SET ${w_query.join(", ")} WHERE email='${req.session.email}'`, function(){
      res.redirect(`../projects_members/${id}`);
    });
  });


  //    ===================================================================================
  // ================================ PROJECTS ACTIVITY ======================================
  //    ===================================================================================

  router.get('/projects_activity/:id', helpers, function(req, res, next) {
    let id = req.params.id;
    let sevenDates = util.get7Dates();
    let sevenDays = util.get7Days();
    let log = [];
    getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[0]}'`, function(note){
      if(note.length > 0) log.push({day: `Today - ${sevenDays[0]}, ${sevenDates[0]}`, note: note});
      getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[1]}'`, function(note){
        if(note.length > 0) log.push({day: `Yesterday - ${sevenDays[1]}, ${sevenDates[1]}`, note: note});
        getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[2]}'`, function(note){
          if(note.length > 0) log.push({day: `${sevenDays[2]}, ${sevenDates[2]}`, note: note});
          getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[3]}'`, function(note){
            if(note.length > 0) log.push({day: `${sevenDays[3]}, ${sevenDates[3]}`, note: note});
            getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[4]}'`, function(note){
              if(note.length > 0) log.push({day: `${sevenDays[4]}, ${sevenDates[4]}`, note: note});
              getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[4]}'`, function(note){
                if(note.length > 0) log.push({day: `${sevenDays[5]}, ${sevenDates[5]}`, note: note});
                getDB(`SELECT note FROM activity WHERE logdate='${sevenDates[6]}'`, function(note){
                  if(note.length > 0) log.push({day: `${sevenDays[6]}, ${sevenDates[6]}`, note: note});
                  res.render('projects_activity', {
                    id: id,
                    log: log,
                    dateNow: sevenDates[0],
                    dateBefore: sevenDates[6]
                  });
                });
              });
            });
          });
        });
      });
    });
  });


  //    ===================================================================================
  // ================================ PROJECTS ISSUES========================================
  //    ===================================================================================

  router.get('/projects_issues/:id', helpers, function(req, res, next){
    let offset = req.query.o || 0;
    let cpage = req.query.c || 1;
    let id = req.params.id;
    getDB(`SELECT * FROM issues WHERE projectid = ${id} LIMIT 5 OFFSET ${offset}`, function(issues){
      getDB(`SELECT COUNT(projectid) as count FROM issues WHERE  projectid = ${id}`, function(c){ // get data projects
        getDB(`SELECT * FROM colum_issues WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
          var page = Math.ceil(c[0].count/5);
          getDB(`SELECT issuesid FROM issues`, function(issueid){
            getDB(`SELECT userid, firstname FROM users`, function(users){
              res.render('projects_issues', {
                id: id,
                data: issues,
                colum: colum,
                cpage: cpage,
                page: page,
                util: util,
                issueid: issueid,
                users: users
              });
            });
          });
        });
      });
    });
  });

  router.get('/add_project_issue/:id', helpers, function(req, res, next){
    let id = req.params.id;
    getDB(`SELECT users.userid AS userid, firstname, lastname FROM users, members WHERE users.userid = members.userid AND projectid = ${id}`, function(users){
      getDB(`SELECT userid FROM users WHERE email='${req.session.email}'`, function(userid){
        getDB(`SELECT issuesid FROM issues WHERE projectid =  ${id}`, function(issuesid){
          res.render('add_project_issue', {
            id: id,
            alert: false,
            util: util,
            userid: userid[0].userid,
            users: users,
            issuesid: issuesid
          });
        });
      });
    });
  });

  router.post('/add_project_issue/:id', helpers, function(req, res, next){
    let projectid = req.params.id;
    let tracker = req.body.tracker;
    let subject = req.body.subject;
    let description = req.body.description;
    let status = req.body.status;
    let priority = req.body.priority;
    let assignee = req.body.assignee;
    let startdate = req.body.startdate;
    let duedate = req.body.duedate;
    let done = req.body.done;
    let file = req.body.files;
    let spendtime = req.body.spendtime;
    let targetversion = req.body.targetversion;
    let author = req.body.author;
    let createdate = req.body.createdate;
    let updateddate = req.body.updateddate;
    let closedate = req.body.closedate;
    let parenttask = req.body.parenttask || 0;
    let estimatedtime = req.body.estimatedtime;
    let sql = `INSERT INTO issues(projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, done, file, spendtime, targetversion, author, createdate, updateddate, closedate, parenttask, estimatedtime) VALUES (${projectid}, '${tracker}', '${subject}', '${description}', '${status}', '${priority}', ${assignee}, '${startdate}', '${duedate}', ${done}, '${file}', ${spendtime}, '${targetversion}', ${author}, '${createdate}', '${updateddate}', '${closedate}', ${parenttask}, ${estimatedtime})`;

    executeDB(sql, function(){
      getDB(`SELECT issuesid FROM issues ORDER BY issuesid DESC LIMIT 1`, function(issuesid){
        getDB(`SELECT firstname FROM users WHERE email='${req.session.email}'`, function(user){
          insertLog(subject, issuesid[0].issuesid, "added issue", status, user[0].firstname, function(){
            res.redirect(`../projects_issues/${projectid}`);
          });
        });
      });
    });

  });

  router.get('/search_issues/:id', helpers, function(req, res, next){
    let id = req.params.id;
    let issueid = req.query.issueid;
    let ck_issueid = req.query.ck_issueid || 0;
    let subject = req.query.subject || 0;
    let ck_subject = req.query.ck_subject || 0;
    let tracker = req.query.tracker;
    let ck_tracker = req.query.ck_tracker || 0;
    let status = req.query.status;
    let ck_status = req.query.ck_status || 0;
    let priority = req.query.priority;
    let ck_priority = req.query.ck_priority || 0;
    let assignee = req.query.assignee;
    let ck_assignee = req.query.ck_assignee || 0;

    let condition = [];
    if(issueid != "not select" && ck_issueid != 0) condition.push(`issueid='${issueid}'`);
    if(subject != 0 && ck_subject != 0)condition.push(`subject='${subject}'`);
    if(tracker != "not select" && ck_tracker != 0) condition.push(`tracker='${tracker}'`);
    if(status != "not select" && ck_status != 0) condition.push(`status='${status}'`);
    if(priority != "not select" && ck_priority != 0) condition.push(`priority='${priority}'`);
    if(assignee != "not select" && ck_assignee != 0) condition.push(`assignee='${assignee}'`);

    if(condition.length > 0){
      getDB(`SELECT * FROM issues WHERE projectid = ${id} AND ${condition.join(" AND ")} ORDER BY issuesid DESC`, function(data){ // get data projects
        getDB(`SELECT * FROM colum_issues WHERE email = '${req.session.email}'`, function(colum){ // control which colum will be show
          getDB(`SELECT issuesid FROM issues`, function(issueid){
            getDB(`SELECT userid, firstname FROM users`, function(users){
              res.render('projects_issues', {
                id: id,
                util: util,
                data: data,
                colum: colum,
                cpage: 0,
                page: 0,
                issueid: issueid,
                users: users
              });
            });
          });
        });
      });
    }else{
      res.redirect(`/projects_issues/${id}`);
    }
  });

  router.get('/delete_issue/:id/:issuesid', helpers, function(req, res, next){
    let issuesid = req.params.issuesid;
    let projectid = req.params.id;
    getDB(`SELECT subject, status FROM issues WHERE issuesid = ${issuesid}`, function(issues){
      getDB(`SELECT firstname FROM users WHERE email='${req.session.email}'`, function(user){
        insertLog(issues[0].subject, issuesid, "deleted issue", issues[0].status, user[0].firstname, function(){
          executeDB(`DELETE FROM issues WHERE issuesid = ${issuesid}`, function(){
            res.redirect(`../../projects_issues/${projectid}`);
          });
        });
      });
    });
  });

  router.get('/colum_issues/:id', helpers, function(req, res, next){
    let id = req.params.id;
    let w_query = [];
    req.query.issueid ? w_query.push("c_issueid = true") : w_query.push("c_issueid = false");
    req.query.projectid ? w_query.push("c_projectid = true") : w_query.push("c_projectid = false");
    req.query.subject ? w_query.push("c_subject = true") : w_query.push("c_subject = false");
    req.query.tracker ? w_query.push("c_tracker = true") : w_query.push("c_tracker = false");
    req.query.description ? w_query.push("c_description = true") : w_query.push("c_description = false");
    req.query.status ? w_query.push("c_status = true") : w_query.push("c_status = false");
    req.query.priority ? w_query.push("c_priority = true") : w_query.push("c_priority = false");
    req.query.assignee ? w_query.push("c_assignee = true") : w_query.push("c_assignee = false");
    req.query.startdate ? w_query.push("c_startdate = true") : w_query.push("c_startdate = false");
    req.query.duedate ? w_query.push("c_duedate = true") : w_query.push("c_duedate = false");
    req.query.estimatedtime ? w_query.push("c_estimatedtime = true") : w_query.push("c_estimatedtime = false");
    req.query.done ? w_query.push("c_done = true") : w_query.push("c_done = false");
    req.query.files ? w_query.push("c_files = true") : w_query.push("c_files = false");
    req.query.spendtime ? w_query.push("c_spendtime = true") : w_query.push("c_spendtime = false");
    req.query.targetversion ? w_query.push("c_targetversion = true") : w_query.push("c_targetversion = false");
    req.query.author ? w_query.push("c_author = true") : w_query.push("c_author = false");
    req.query.createddate ? w_query.push("c_createddate = true") : w_query.push("c_createddate = false");
    req.query.updateddate ? w_query.push("c_updateddate = true") : w_query.push("c_updateddate = false");
    req.query.closeddate ? w_query.push("c_closeddate = true") : w_query.push("c_closeddate = false");
    req.query.parenttask ? w_query.push("c_parenttask = true") : w_query.push("c_parenttask = false");
    // update data di database
    executeDB(`UPDATE colum_issues SET ${w_query.join(", ")} WHERE email='${req.session.email}'`, function(){
      res.redirect(`../projects_issues/${id}`);
    });
  });

  router.get('/edit_issue/:id/:issuesid', helpers, function(req, res, next){
    let id = req.params.id;
    let issuesid = req.params.issuesid;
    getDB(`SELECT * FROM issues WHERE projectid = ${id} AND issuesid = ${issuesid}`, function(issues){
      getDB(`SELECT users.userid AS userid, firstname, lastname FROM users, members WHERE users.userid = members.userid AND projectid = ${id}`, function(users){
        getDB(`SELECT issuesid FROM issues WHERE projectid =  ${id}`, function(issuesid){
          res.render('edit_project_issue', {
            id: id,
            alert: false,
            util: util,
            users: users,
            issues: issues[0],
            issuesid: issuesid
          });
        });
      });
    });
  });

  router.post('/edit_issue/:id/:issuesid', helpers, function(req, res, next){
    let issuesid = req.params.issuesid;
    let setData = [];
    setData.push(`tracker = '${req.body.tracker}'`)
    setData.push(`subject = '${req.body.subject}'`)
    setData.push(`description = '${req.body.description}'`)
    setData.push(`status = '${req.body.status}'`)
    setData.push(`priority = '${req.body.priority}'`)
    setData.push(`done = ${req.body.done}`)
    setData.push(`startdate = '${req.body.startdate}'`)
    setData.push(`duedate = '${req.body.duedate}'`)
    setData.push(`estimatedtime = ${req.body.estimatedtime}`)
    setData.push(`file = '${req.body.files}'`)
    setData.push(`spendtime = ${req.body.spendtime}`)
    setData.push(`targetversion = '${req.body.targetversion}'`)
    setData.push(`createdate = '${req.body.createdate}'`)
    setData.push(`updateddate = '${req.body.updateddate}'`)
    setData.push(`closedate = '${req.body.closedate}'`)
    setData.push(`parenttask = ${req.body.parenttask || 0}`)
    setData.push(`assignee = ${req.body.assignee}`)
    let sql = `UPDATE issues SET ${setData.join(", ")} WHERE issuesid = ${issuesid}`;
    executeDB(sql, function(){
      getDB(`SELECT firstname FROM users WHERE email='${req.session.email}'`, function(user){
        insertLog(req.body.subject, issuesid, "modified issue", req.body.status, user[0].firstname, function(){
          res.redirect(`../../projects_issues/${req.params.id}`);
        });
      });
    });
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    });
  });

  function insertLog(subject, issuesid, description, status, author, cb){
    let date = new Date();
    let dateNow = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let note = `${date.getHours()}:${date.getMinutes()} ${subject} #${issuesid} (${status}): ${description}, author: ${author}`;
    console.log();
    executeDB(`INSERT INTO activity (logdate, note) VALUES ('${dateNow}', '${note}')`, cb);
  }

  function getDB(sql, cb){
    pool.query(sql, [], (err, data)=>{
      if(err) throw err;
      cb(data.rows);
    });
  }

  function executeDB(sql, cb){
    pool.query(sql, function(err){
      if(err) throw err;
      cb();
    });
  }

  return router;
}
