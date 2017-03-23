var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/mean-hotel';

var _connection = null;

var open = function() {
  //set db connection
  MongoClient.connect(dbUrl, function(err, db){
    if(err){
       console.log(err);
       return;
     }
    else{
      _connection = db;
      console.log("Connected to MongoDB");
    }
  });
};

var get = function() {
  return _connection;
};

module.exports = {
  open: open,
  get: get
};
