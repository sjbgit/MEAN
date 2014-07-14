/**
 * Created by Seth on 7/12/2014.
 */
var express = require('express'),
    stylus = require('stylus'), //add lib
    logger = require('morgan'), //importing function
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compiile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));//static route to public dir

//match all routes - all requests
app.get('*', function(req, res) {
    res.render('index');
})

var port = 3030;
app.listen(port);
console.log("listening on port " + port + "...");

