const express = require('express');
const router = express.Router();

// connect to database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bread.db');

/* GET home page. */
router.get('/', function(req, res, next){
  var offset = req.query.o || 0;
  var cpage = req.query.c || 1;
  getData2(5, offset, function(data){
    let sql = 'SELECT COUNT(id) as count FROM bread';
    db.all(sql, [], (err, rows) => {
      if(err)throw err;
      var page = Math.ceil(rows[0].count/5);
      res.render('index', { data: data, page: page, cpage: cpage });
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
  if(edate != 0)condition.push(`date<='${new Date(edate)}'`);
  if(sdate != 0)condition.push(`date>='${new Date(sdate)}'`);
  res.send(sql);
  if(condition.length > 0){
    let sql = "SELECT * FROM bread WHERE "+condition.toString().replace(/,/g, " AND ");
    db.all(sql, [], (err, rows) => {
      if(err)throw err;
      res.render('index', { data: rows, page: 1, cpage: 1 });
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
  let date = new Date(req.body.date);
  let boolean = req.body.boolean;
  let sql = `INSERT INTO bread(string, integer, float, date, boolean) VALUES ('${string}',${integer},${float},'${date}','${boolean}')`;
  console.log(sql);
  db.run(sql, function(err2){
    if(err2)throw err2;
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res, next){
  let id = req.params.id;
  db.run('DELETE FROM bread WHERE id = ?', id, function(err){
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
    res.render('edit', { data : rows[index]});
  });
});

router.post('/edit/:id', function(req, res, next) {
  getData1(function(rows){
    let id = req.params.id;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `UPDATE bread SET string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;
    db.run(sql, function(err){
      if(err)throw err;
      res.redirect('/');
    });
  });
});

function getData1(cb){
  let sql = 'SELECT * FROM bread';
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    cb(rows);
  });
}

function getData2(limit, offset, cb){
  let sql = `SELECT * FROM bread LIMIT ${limit} OFFSET ${offset}`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    cb(rows);
  });
}

module.exports = router;
