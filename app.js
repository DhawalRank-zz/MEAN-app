require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
//body parser for HTTP body
var bodyParser = require('body-parser');

/* -----------Server code Starts--------------- */
//start HTTPS server if sslcert/server.key & sslcert/server.crt files are available else start HTTP server
try{
  var https = require('https');
  var fs = require('fs');
  var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
  var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
  //HTTPS Server
  app.set("port", 8443);
  var server = https.createServer(credentials, app);

}

catch (e){
  var http = require('http');
  console.warn('Error starting HTTPS Server');
  console.error('Error: ', e.message);
  console.log('Starting "INSECURE" HTTP Server');
  //HTTP server
  app.set("port", 3000);
  var server = http.createServer(app);
}

server.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Server lisening to port ' + port);
});

/* -----------Server code ends--------------- */

//display more information on console by using middleware
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

 //add static files
app.use(express.static(path.join(__dirname, 'public')));

//extended: false --> only string and array from HTTP body
//extended: true --> all datatypes from HTTP body
app.use(bodyParser.urlencoded({extended: false}));

//set routes
app.use('/api', routes);
