// server.js

// BASE SETUP
// =============================================================================

var sql = require('mssql'); 

//Data Source=tcp:cxgkje8oaa.database.windows.net,1433;Initial Catalog=bingpulseci;User ID=bingpulse@cxgkje8oaa;Password=PuL$3#P@$$#

var config = {
    user: 'bingpulse@cxgkje8oaa',
    password: 'PuL$3#P@$$#',
    server: 'cxgkje8oaa.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'bingpulseci',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

var query = 'SELECT count(*) as count FROM [dbo].[PulseAggregates]';
    //query = 'select 1 as number';
    query = 'SELECT top 100 [Id], [Date],[Thread],[Level],[Logger],left([Message], 120),left([Exception], 120) FROM [dbo].[Logs] order by id desc';

var runningQuery = 'SELECT top 100 [Id], [Date],[Thread],[Level],[Logger],left([Message], 120),left([Exception], 120) FROM [dbo].[Logs] where message like \'%Message: Main process%\' order by id desc';


var connection = new sql.Connection(config, function(err) {
    // ... error checks
    console.log(err);
    // Query

    

    var request = new sql.Request(connection); // or: var request = connection.request();
    
/*
    request.query(query , function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });
*/

});


var request = connection.request();

request.query(query , function(err, recordset) {
        // ... error checks

        //console.dir(recordset);
    });



// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.get('/log', function(req, res) {
    
    var request = connection.request();

    request.query(query , function(err, recordset) {
        // ... error checks

        //console.dir(recordset);
        res.json(recordset);
    });

    //res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/running', function(req, res) {
    
    var request = connection.request();

    request.query(runningQuery , function(err, recordset) {
        // ... error checks

        //console.dir(recordset);
        res.json(recordset);
    });

    //res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);