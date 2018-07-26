const express = require('express');
const router = express.Router();
const util = require('../helpers/util');

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

// Connection URL
function connect(cb){
  var url = 'mongodb://localhost:27017/bread';
  // Use connect method to connect to the Server
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err) throw err;
    const db = client.db("bread");
    cb(db);
    // client.close();
  });
}

function findData(limit, skip, where, cb){
  connect(function(db){
    db.collection("bread").find(where).count(function(err, count){
      db.collection("bread").find(where).skip(skip).limit(limit).toArray(function(err, result){
        if(err) throw err;
        cb(result, count);
      });
    });
  });
}

function showTable(myQuery, res, req){
  var skip = parseInt(req.query.o) || 0;
  var cpage = req.query.c || 1;
  findData(5, skip, myQuery, function(result, count){
    var page = Math.ceil(count/5);
    res.render('index', { data: result, page: page, cpage: cpage, util: util });
  });
}
// /* GET home page. */

router.get('/', function(req, res, next){
  showTable({}, res, req);
});


router.get('/search', function(req, res, next){
  let string = req.query.string || 0;
  let integer = req.query.integer || 0;
  let float = req.query.float || 0;
  let sdate = req.query.sdate || 0;
  let edate = req.query.edate || 0;
  let boolean = req.query.boolean || 0;
  let myQuery = {};

  if(string != 0)myQuery.string = string;
  if(integer != 0)myQuery.integer = integer;
  if(float != 0)myQuery.float = float;
  if(boolean != 0)myQuery.boolean = boolean;
  if(sdate != 0)myQuery.date = {"$gte": sdate};
  if(edate != 0)myQuery.date != undefined ? myQuery.date["$lte"] = edate : myQuery.date = {"$lte": edate};

  var skip = parseInt(req.query.o) || 0;
  var cpage = req.query.c || 1;

  if(Object.keys(myQuery).length !== 0){
    showTable(myQuery, res, req);
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
  let myObj = {string: string, integer: integer, float: float, date: date, boolean: boolean};
  connect(function(db){
    db.collection("bread").insertOne(myObj, function(err, data){
      if(err) throw err;
      res.redirect('/');
    });
  });
});

router.get('/delete/:id', function(req, res, next){
  let id = mongoose.Types.ObjectId(req.params.id);
  console.log(id);
  let myQuery = { _id: id };
  connect(function(db){
    db.collection("bread").deleteOne(myQuery, function(err, obj){
      if(err) throw err;
      res.redirect('/');
    });
  });
});

router.get('/edit/:id', function(req, res, next){
  let id = req.params.id;
  findData(0, 0, {}, function(rows){
    var index = -1;
    for(let i=0; i<rows.length; i++){
      if(rows[i]._id == id){
        index = i;
        break;
      }
    }
    res.render('edit', { data : rows[index], util, util});
  });
});

router.post('/edit/:id', function(req, res, next) {
  let id = mongoose.Types.ObjectId(req.params.id);
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  let myQuery = { _id: id };
  let newValues = { $set:{string: string, integer: integer, float: float, date: date, boolean: boolean} };
  connect(function(db){
    db.collection("bread").updateOne(myQuery, newValues, function(err, obj){
      if(err)throw err;
      res.redirect('/');
    });
  });
});

module.exports = router;
