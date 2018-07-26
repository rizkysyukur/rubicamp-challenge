var express = require('express');
var router = express.Router();
var util = require('../helpers/util');
module.exports = function(pool){

  function getData1(cb){
    let sql = 'SELECT * FROM bread';
    pool.query(sql, [], (err, res) => {
      if (err)throw err;
      cb(res.rows);
    });
  }

  function getData2(limit, offset, cb){
    let sql = `SELECT * FROM bread LIMIT ${limit} OFFSET ${offset}`;
    pool.query(sql, [], (err, res) => {
      if (err)throw err;
      cb(res.rows);
    });
  }

  /* GET home page. */
  router.get('/', function(req, res, next){
    var offset = req.query.o || 0;
    var cpage = req.query.c || 1;
    getData2(5, offset, function(data){
      let sql = 'SELECT COUNT(id) as count FROM bread';
      pool.query(sql, [], (err, res2) => {
        if(err)throw err;
        var page = Math.ceil(res2.rows[0].count/5);
        res.render('index', { data: data, page: page, cpage: cpage, util: util });
      });
    });
  });

  router.get('/search', function(req, res, next){
    let id = req.query.id || 0;
    let string = req.query.string || 0;
    let integer = req.query.integer || 0;
    let float = req.query.float || 0;
    let sdate = req.query.sdate || 0;
    let edate = req.query.edate || 0;
    let condition = [];
    let boolean = req.query.boolean || 0;
    if(id != 0)condition.push(`id=${id}`);
    if(string != 0)condition.push(`string='${string}'`);
    if(integer != 0)condition.push(`integer=${integer}`);
    if(float != 0)condition.push(`float=${float}`);
    if(boolean != 0)condition.push(`boolean='${boolean}'`);
    if(edate != 0)condition.push(`date<='${edate}'`);
    if(sdate != 0)condition.push(`date>='${sdate}'`);
    if(condition.length > 0){
      let sql = "SELECT * FROM bread WHERE "+condition.join(" AND ");
      pool.query(sql, (err, item) => {
        if(err)throw err;
        res.render('index', { data: item.rows, page: 1, cpage: 1, util: util });
      });
    }else{
      res.redirect('/');
    }
  });

  router.get('/add', function(req, res, next){
    res.render('add');
  });

  router.post('/add', function(req, res, next){
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `INSERT INTO bread(string, integer, float, date, boolean) VALUES ('${string}',${integer},${float},'${date}','${boolean}')`;
    pool.query(sql, function(err2){
      if(err2)throw err2;
      res.redirect('/');
    });
  });

  router.get('/delete/:id', function(req, res, next){
    let id = req.params.id;
    let sql = `DELETE FROM bread WHERE id = ${id}`;
    pool.query(sql, function(err){
      if(err)throw err;
      res.redirect('/');
    });
  });

  router.get('/edit/:id', function(req, res, next){
    let id = parseInt(req.params.id);
    getData1(function(rows){
      var index = -1;
      for(let i=0; i<rows.length; i++){
        if(rows[i].id == id){
          index = i;
          break;
        }
      }
      res.render('edit', { data : rows[index], util, util});
    });
  });

  router.post('/edit/:id', function(req, res, next) {
    let id = req.params.id;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `UPDATE bread SET string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;
    pool.query(sql, function(err){
      if(err)throw err;
      res.redirect('/');
    });
  });

  return router;
}
