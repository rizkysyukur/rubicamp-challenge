const express = require('express');
const router = express.Router();

// connect to database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bread.db');

/* GET home page. */
router.get('/', function(req, res, next){
  let sql = 'SELECT * FROM bread';
  db.all(sql, [], (err, rows) => {
    if(err)throw err;
    res.render('index', { data: rows });
  });
});

router.get('/add', function(req, res, next){
  res.render('add');
})

router.post('/add', function(req, res, next){
  // let id = data.length + 1;
  // let string = req.body.string;
  // let integer = req.body.integer;
  // let float = req.body.float;
  // let date = req.body.date;
  // let boolean = req.body.boolean;
  //
  // db.run('INSERT INTO bread(id, string, integer, float, date, boolen) VALUES (?,?,?,?,?,?)' [id,string,integer,float,date,boolean], function(err){
  //   if(err)throw err;
    res.redirect('/');
  // });
});

module.exports = router;
