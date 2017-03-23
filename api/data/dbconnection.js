var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/mean-hotel';

var _connection = null;

//opens a database connection
var open = function() {
  //set db connection
  //connect --> connect to database
  //@params: connectionURL, callback
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

//get opened connection
var get = function() {
  return _connection;
};

module.exports = {
  open: open,
  get: get
};
