/**
 * Created by Seth on 7/12/2014.
 */
var express = require('express'),
    stylus = require('stylus'), //add lib
    logger = require('morgan'), //importing function
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
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

mongoose.connect('mongodb://mongoguy:d0m1c1l3@ds029837.mongolab.com:29837/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
   console.log('multivision db opened');

});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
   mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
})

//match all routes - all requests
app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = 3030;
app.listen(port);
console.log("listening on port " + port + "...");

