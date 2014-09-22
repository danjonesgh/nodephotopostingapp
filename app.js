var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient;
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
S3_BUCKET = process.env.S3_BUCKET


var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/hero';
mongoose.connect(mongoUri, function(err, result) {
  if(err) {
    console.log('error connecting to mongodb with mongoose');
    console.log(err);
  } else {
    console.log('successfully connected to mongodb');
  }
})


/*
mongo.connect(mongoUri, function(err, db) {
  if(err) {
    console.log(err);
    throw err;
  } else {
    db.collection('posts', function(err, collection) {
      //collection.insert({'newkey':'newval'}, function(err, rs) {
      //  console.log(rs);
      //  console.log('started');
      //});
    });
  }
});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
