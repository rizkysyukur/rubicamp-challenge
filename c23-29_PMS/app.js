var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'bynenfjcqmptlj',
  host: 'ec2-174-129-236-147.compute-1.amazonaws.com',
  database: 'dak0cku50c3rvj',
  password: 'c5b4a3989ff6e58b505ec7c807c7b0002bd5714985eee5647aec1acbde7e2f3c',
  port: 5432,
});

var indexRouter = require('./routes/index')(pool);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'belajar pms',
  resave: false,
  saveUninitialized: false
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
