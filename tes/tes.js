// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
// db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
//
//
// SELECT projectid, array_to_string(array_agg(distinct "userid"),', ') AS Member FROM members GROUP BY projectid;
//
// SELECT projects.projectid AS id, name, array_to_string(array_agg(distinct "firstname"),', ') AS member
// FROM members, users, projects
// WHERE members.userid=users.userid
// AND members.projectid=projects.projectid
// GROUP BY name, projects.projectid;
//
//
insert into colum_issues
(c_issueid, c_subject, c_tracker, email, c_description, c_status, c_priority, c_assignee, c_startdate, c_duedate, c_estimatedtime, c_done, c_files, c_spendtime, c_targetversion, c_author, c_createddate, c_updateddate, c_closeddate, c_parenttask, c_projectid)
values
(true, true, true, 'rizkysaeful@gmail.com', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true),
(true, true, true, 'angriramadhan@gmail.com', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true),
(true, true, true, 'yudhistiramaulana@gmail.com', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true),
(true, true, true, 'bambangsetiawan@gmail.com', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true);
//
// console.log(`projectid: ${projectid}, tracker: ${tracker}, subject: ${subject}, description: ${description}, status: ${status}`);
// console.log(`priority: ${priority}, assignee: ${assignee}, startdate: ${startdate}, duedate: ${duedate}, done: ${done}`);
// console.log(`file: ${file}, spenttime: ${spenttime}, targetversion: ${targetversion}, author: ${author}, createddate: ${createddate}`);
// console.log(`updateddate: ${updateddate}, closeddate: ${closeddate}, parenttask: ${parenttask}, estimateddate: ${estimateddate}`);


// for (var i = 0; i < 10; i++) {
//
// }

// let hei = "wooowww";
//
// (function (param) {
//     console.log(hei);
// })();

// var d = new Date("Wed Aug 22 2018 00:00:00 GMT+0700 (WIB");
// console.log(d);

function get7Dates(){
  let date = new Date();
  let dates = [];
  let yer, month, day;
  for (var i = 0; i < 7; i++) {
    date.setDate(date.getDate()-1);
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    // YYYY-MM-DD
    dates.push(`${month}/${day}/${year}`);
  }
  return dates;
}

function get7Days(){
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let index = new Date().getDay();
  let date = new Date();
  let fixedDays = [];
  for (var i = 0; i < 7; i++) {
    if(index < 0) index=6;
    fixedDays.push(days[index]);
    index--;
  }
  return fixedDays;
}

let dates = get7Dates();
let sevenDays = get7Days();

for (var i = 0; i < dates.length; i++) {
  console.log(dates[i]);
}




// function date(minus){
//   var date = new Date();
//   date.setDate(date.getDate()+minus);
//   return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
// }
//
// console.log(date(-10));


// let log = [];
// let note = ["one", "two", "three"];
// log.push({day: "today", note: note});
//
// for (var i = 0; i < log.length; i++) {
//   console.log(log[i].day);
//   for (var j = 0; j < log[i].note.length; j++) {
//     console.log(`- ${log[i].note[j]}`);
//   }
// }

// console.log(d.getHours()+":"+d.getMinutes());
// console.log(d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear());

// var date = new Date();
// // date.setDate(date.getDate() + 5);
// console.log(date.getDate());
// console.log(date.getMonth());
// console.log(date.getFullYear());
