const express = require('express');
const router = express.Router();
const Maps = require('../models/maps');
const config = require('../config/config');
const helpers = require('../helpers/util');

// #1 BROWSE
router.post('/search', (req, res) =>{
  let keyword = {};
  if(req.body.title){
    keyword.title = req.body.title
  }
  if(req.body.lat){
    keyword.lat = req.body.lat
  }
  if(req.body.lng){
    keyword.lng = req.body.lng
  }

  Maps.find(keyword).then(maps1 => {
    res.json(maps1);
  })
})

// #2 READ
router.get('/', (req, res) =>{
  Maps.find().then(maps1 => {
    res.json(maps1);
  })
})

// #3 EDIT
router.put('/:id', function(req, res) {
  let id = req.params.id;
  Maps.findByIdAndUpdate(id, {
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  }, {new: true}).then(maps => {
    res.json({
      success: true,
      message: "data has been updated",
      data: {
        _id: maps._id,
        title: maps.title,
        lat: maps.lat,
        lng: maps.lng
      }
    })
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
  let maps = new Maps({
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  })
  maps.save().then(maps1 => {
    res.json({
      success: true,
      message: "data has been added",
      data:{
        _id: maps1._id,
        title: maps1.title,
        lat: maps1.lat,
        lng: maps1.lng
      }
    })
  }).catch(err => {
    res.json({
      success: false,
      message: "adding maps has been failed",
      maps:{
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

// #5 DELETE
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  Maps.findByIdAndRemove(id).then(maps => {
    res.json({
      success: true,
      message: "data has been deleted",
      data:{
        _id: maps._id,
        title: maps.title,
        lat: maps.lat,
        lng: maps.lng
      }
    })
  }).catch(err => {
    res.json({
      success: false,
      message: "daleting data has been failed",
      data:{
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

// #6 FIND
router.get('/:id', function(req, res){
  let id = req.params.id;
  Maps.findById(id).then(maps => {
    res.json({
      success: true,
      message: "data found",
      data:{
        _id: maps._id,
        title: maps.title,
        lat: maps.lat,
        lng: maps.lng
      }
    })
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
