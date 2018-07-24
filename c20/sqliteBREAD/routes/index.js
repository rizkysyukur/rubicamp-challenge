const express = require('express');
const router = express.Router();

// connect to database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bread.db');

/* GET home page. */
router.get('/', function(req, res, next){
  getData(5, 0, function(data){
    let sql = 'SELECT COUNT(id) as count FROM bread';
    db.all(sql, [], (err, rows) => {
      if(err)throw err;
      var page = Math.ceil(rows[0].count/5);
      res.render('index', { data: data, page: page, cpage: 1 });
    });
  });
});

router.get('/:offset/:cpage', function(req, res, next){
  var offset = req.params.offset;
  var cpage = req.params.cpage;
  getData(5, offset, function(data){
    let sql = 'SELECT COUNT(id) as count FROM bread';
    db.all(sql, [], (err, rows) => {
      if(err)throw err;
      var page = Math.ceil(rows[0].count/5);
      res.render('index', { data: data, page: page, cpage: cpage });
    });
  });
});

router.get('/:cpage/add', function(req, res, next){
  res.render('add');
});

router.post('/add', function(req, res, next){
  getData(function(rows){
    let id = `${rows.length + 1}`;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    db.run('INSERT INTO bread(id, string, integer, float, date, boolean) VALUES (?,?,?,?,?,?)', [id,string,integer,float,date,boolean], function(err2){
      if(err2)throw err2;
      res.redirect('/');
    });
  });
});

router.get('/:cpage/delete/:id', function(req, res, next){
  let id = req.params.id;
  db.run('DELETE FROM bread WHERE id = ?', id, function(err){
    if(err)throw err;
    res.redirect('/');
  });
});

router.get('/:cpage/edit/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  getData(function(rows){
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
  getData(function(rows){
    let id = req.params.id;
    var string = req.body.string;
    var integer = req.body.integer;
    var float = req.body.float;
    var date = req.body.date;
    var boolean = req.body.boolean;
    db.run('UPDATE bread SET string = ?, integer = ?, float = ?, date = ?, boolean = ? WHERE id = ?', [string,integer,float,date,boolean,id], function(err){
      if(err)throw err;
      res.redirect('/');
    });
  });
});


function getData(cb){
  let sql = 'SELECT * FROM bread';
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    cb(rows);
  });
}

function getData(limit, offset, cb){
    let sql = `SELECT * FROM bread LIMIT ${limit} OFFSET ${offset}`;
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    cb(rows);
  });
}

module.exports = router;
