var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/mean-hotel';
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);


//connection.on() --> listens to connection events
//@param: event, callback
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to: ', dbUrl);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected from: ', dbUrl);
});

mongoose.connection.on('error', function(error){
  console.log('Mongoose connection failed: ', error);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination.');
    //exits process
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination.');
    process.exit(0);
  });
});


//will be triggered only once
process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app terminstion.');
    process.kill(process.pid, 'SIGUSR2');
  });
});

//require all the model schemas
require('./hotels.model.js');
