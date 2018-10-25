const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/config');
const helpers = require('../helpers/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello")
})

module.exports = router;
