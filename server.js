process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var db = mongoose();
var passport = passport();
var app = express();
app.listen(3000);
console.log('Server is running...');