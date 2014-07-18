/**
 * Created by Seth on 4/30/2014.
 */
// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://mongoguy:d0m1c1l3@novus.modulusmongo.net:27017/aw8udEwo'); 	// connect to mongoDB database on modulus.io

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

var Todo = mongoose.model('Todo', {
    text : String
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

    //console.log('get in todo');
    // use mongoose to get all todos in the database


    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });

});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
    console.log('request ' + req.body.text);
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
