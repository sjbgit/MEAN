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

        console.dir(recordset);
    });


console.log('test');