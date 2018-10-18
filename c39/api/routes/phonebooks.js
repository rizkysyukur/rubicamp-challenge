var express = require('express');
var router = express.Router();
var Phonebooks = require('../models/phonebooks');

Phonebooks.deleteMany({}, (err)=>{
  if (err) console.log("Clear data failed")
});
let data = new Phonebooks({
  id: Date.now(),
  name: "Saeful",
  phone: "085722876360"
})
data.save().then(item=>{
  console.log("Initial data Successfully");
}).catch(err=>{
  console.log("Initial data failed");
})

// READ
router.get('/', (req, res) => {
  Phonebooks.find().then(data=>{
    res.json(data);
  }).catch(err=>{
    res.json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

// ADD
router.post('/', (req, res)=>{
  let data = new Phonebooks({
    id : req.body.id,
    name : req.body.name,
    phone : req.body.phone
  })
  data.save().then(item=>{
    res.json({
      status: "Success",
      data:item
    }).catch(err=>{
      res.json({
        error: true,
        message: err.message
      })
    })
  })
})

// EDIT
router.put('/:id', (req, res)=>{
  let id = req.params.id;
  Phonebooks.findOneAndUpdate({id: id}, {
    name: req.body.name,
    phone: req.body.phone
  }, {new: true}).then(item=>{
    if(item){
      res.json({
        status: "SUCCESS",
        data: item
      })
    }else{
      res.json({
        error: true,
        message: `updating data has been failed id : ${id} not found`
      })
    }
  }).catch(err=>{
    res.json({
      error: true,
      message: err.message
    })
  })
})

// DELETE
router.delete('/:id', (req, res)=>{
  let id = req.params.id;
  Phonebooks.findOneAndDelete({id: id}).then(item=>{
    if(item){
      console.log(item);
      res.json({
        status: "SUCCESS",
        data: item
      })
    }else{
      res.json({
        error: true,
        message: `deleting data has been failed id : ${id} not found`
      })
    }
  }).catch(err=>{
    res.json({
      error: true,
      message: err.message
    })
  })
})

module.exports = router;
