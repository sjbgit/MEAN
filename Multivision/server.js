/**
 * Created by Seth on 7/12/2014.
 */
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//match all routes - all requests
app.get('*', function(req, res) {
    res.render('index');
})
