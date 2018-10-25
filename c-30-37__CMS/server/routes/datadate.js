const express = require('express');
const router = express.Router();
const Datadate = require('../models/datadate');
const config = require('../config/config');
const helpers = require('../helpers/util');
const moment = require('moment');

router.post('/search', (req, res) =>{
  let keyword = {};
  if(req.body.letter){
    keyword.letter = req.body.letter
  }
  if(req.body.frequency){
    keyword.frequency = req.body.frequency
  }

  Datadate.find(keyword).then(datadate1 => {
    let data = [];
    datadate1.forEach(item=>{
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data);
  })
})

// #2 READ
router.get('/', (req, res) =>{
  Datadate.find().then(datadate1 => {
    let data = [];
    datadate1.forEach(item=>{
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data);
  })
})

// #3 EDIT
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  Datadate.findByIdAndUpdate(id, {
    letter: req.body.letter,
    frequency: req.body.frequency
  }, {new: true}).then(datadate => {
    if(!datadate){
      res.json({
        success: false,
        message: `updating datadate has been failed id : ${id} not found`,
        data: {
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }else{
      res.json({
        success: true,
        message: "datadate has been updated",
        data: {
          _id: datadate._id,
          letter: moment(datadate.letter).format("YYYY-MM-DD"),
          frequency: datadate.frequency
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "updating datadate has been failed",
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
  let datadate = new Datadate({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  datadate.save().then(datadate1 => {
    res.json({
      success: true,
      message: "datadate has been added",
      data:{
        _id: datadate1._id,
        letter: moment(datadate1.letter).format("YYYY-MM-DD"),
        frequency: datadate1.frequency
      }
    })
  }).catch(err => {
    res.json({
      success: false,
      message: "adding datadate has been failed",
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
  Datadate.findByIdAndRemove(id).then(datadate => {
    if(datadate){
      res.json({
        success: true,
        message: "datadate has been deleted",
        data:{
          _id: datadate._id,
          letter: moment(datadate.letter).format("YYYY-MM-DD"),
          frequency: datadate.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `daleting datadate has been failed id: ${id}`,
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
      message: "daleting datadate has been failed id: ",
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
  Datadate.findById(id).then(datadate => {
    if(datadate){
      res.json({
        success: true,
        message: "datadate found",
        data:{
          _id: datadate._id,
          letter: moment(datadate.letter).format("YYYY-MM-DD"),
          frequency: datadate.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `datadate with id: ${id} not found`,
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
      message: "datadate not found",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

module.exports = router;
