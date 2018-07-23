const express = require('express');
const router = express.Router();
const fs = require('fs');
var rawdata = fs.readFileSync('data.json');
var data = JSON.parse(rawdata);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: data });
});

router.post('/search', function(req, res, next) {
  let id = req.body.id;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let boolean = req.body.boolean;

  res.render('index', { data: data });
});

router.get('/delete/:id', function(req, res, next){
  let id = req.params.id;
  var index = -1;
  for(let i=0; i<data.length; i++){
    if(data[i].id == id){
      index = i;
      break;
    }
  }

  data.splice(index, 1);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 3), 'utf8');
  res.redirect('/');
})

router.get('/add', function(req, res, next){
  res.render('add');
});

router.post('/add', function(req, res, next) {
  let id = data.length + 1;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;

  data.push({id: id, string: string, integer: integer, float: float, date: date, boolean: boolean});
  fs.writeFileSync("data.json", JSON.stringify(data, null, 3), 'utf8');
  res.redirect('/');
});

router.get('/edit/:id', function(req, res, next){
  let id = req.params.id;
  var index = -1;
  for(let i=0; i<data.length; i++){
    if(data[i].id == id){
      index = i;
      break;
    }
  }
  res.render('edit', {item:data[index]});
})

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  var index = -1;
  for(let i=0; i<data.length; i++){
    if(data[i].id == id){
      index = i;
      break;
    }
  }
  data[index].string = req.body.string;
  data[index].integer = req.body.integer;
  data[index].float = req.body.float;
  data[index].date = req.body.date;
  data[index].boolean = req.body.boolean;

  fs.writeFileSync("data.json", JSON.stringify(data, null, 3), 'utf8');
  res.redirect('/');
});


router.post('/', function(req, res, next) {
  let id = req.body.id;
  res.send("Id yang dihapus adalah")
})

module.exports = router;
