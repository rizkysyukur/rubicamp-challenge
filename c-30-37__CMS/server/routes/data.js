const express = require('express');
const router = express.Router();
const Data = require('../models/data');
const config = require('../config/config');
const helpers = require('../helpers/util');

router.post('/search', (req, res) =>{
  let keyword = {};
  if(req.body.letter){
    keyword.letter = req.body.letter
  }
  if(req.body.frequency){
    keyword.frequency = req.body.frequency
  }

  Data.find(keyword).then(data1 => {
    res.json(data1);
  }).catch(err => {
    res.json({
      error: true,
      message: err.message
    })
  })
})

// #2 READ
router.get('/', (req, res) =>{
  Data.find().then(data1 => {
    res.json(data1);
  }).catch(err => {
    json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

// #3 EDIT
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  Data.findByIdAndUpdate(id, {
    letter: req.body.letter,
    frequency: req.body.frequency
  }, {new: true}).then(data => {
    if(!data){
      res.json({
        success: false,
        message: `updating data has been failed id : ${id} not found`,
        data: {
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }else{
      res.json({
        success: true,
        message: "data has been updated",
        data: {
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "updating data has been failed",
      data: {
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// #4 ADD
router.post('/', (req, res) =>{
  let data = new Data({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  data.save().then(data1 => {
    res.json({
      success: true,
      message: "data has been added",
      data:{
        _id: data1._id,
        letter: data1.letter,
        frequency: data1.frequency
      }
    })
  }).catch(err => {
    res.json({
      success: false,
      message: "adding data has been failed",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// #5 DELETE
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  Data.findByIdAndRemove(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data has been deleted",
        data:{
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `daleting data has been failed id: ${id}`,
        data:{
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "daleting data has been failed id: ",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// #6 FIND
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Data.findById(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data found",
        data:{
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `data with id: ${id} not found`,
        data:{
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }
  }).catch(err =>{
    res.json({
      success: false,
      message: "data not found",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

module.exports = router;
