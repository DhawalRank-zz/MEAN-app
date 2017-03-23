require('./api/data/dbconnection.js').open();
var path = require('path');
var express = require('express');
var fs = require('fs');
var app = express();
var routes = require('./api/routes');
//body parser fot HTTP body
var bodyParser = require('body-parser');
var http = require('http');
//https server
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

app.set('port', 3000);    //set port
app.set('sslPort', 8443);    //set port


//provide details on console about HTTP verbs
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

 //add static files, looks for index.html
app.use(express.static(path.join(__dirname, 'public')));

//extended: false --> only string and array from HTTP body
//extended: true --> all datatypes from HTTP body
app.use(bodyParser.urlencoded({extended: false}));

//set middleware
app.use('/api', routes);


//server

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(app.get('port'), function () {                //listen http req
//   var port = httpServer.address().port;
//   console.log('Server lisening to port ' + port);
// });
httpsServer.listen(app.get('sslPort'), function () {            //listen https req
  var sslPort = httpsServer.address().port;
  console.log('Server lisening to port ' + sslPort);
});
