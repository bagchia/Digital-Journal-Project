var express = require('express');
var mysql = require('./dbcon.js');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(cors())

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

port = 15224


app.set('port', port);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script', function(req, res) {
    res.sendFile(__dirname + '/script.js');
});


app.post('/authenticate', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT EXISTS(SELECT * FROM Users WHERE username=? AND password=?) AS authenticated", [req.body.username, req.body.password], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        else{
            data = rows[0]
            res.send(data)
        }
    });
});


app.get('/get_templates', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT * FROM `Templates`", [], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        else{
            res.send(rows)
        }
    });
});


app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
