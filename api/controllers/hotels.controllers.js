var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');

//to convert ID to ObjectID for mongodb to understand ID
var ObjectId = require('mongodb').ObjectId;

//gets all the hotels
module.exports.getAllHotels = function(req, res) {
  console.log('Get all Hotels');
  var db = dbconn.get();
  // fetch collection from db
  var collection = db.collection('hotel');
  var offset = 0, count = 5;
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }
  collection
  //find all data
    .find()
    //select start point
    .skip(offset)
    //select end point
    .limit(count)
    //toArray --> get the collection in form of JSON array
    //@params: callback
    .toArray(function(err, docs){
      res
        .status(200)
        .json(docs);
    });

};

//get hotel by unique ID
module.exports.getHotelByID = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotel');

  //get parameters
  var hotelID = req.params.hotelID;

  collection
  //findOne --> find document by key
  // @params --> filter, callback
    .findOne({_id: ObjectId(hotelID)}, function(err, doc){
      console.log('Get Hotel with ID: ' + hotelID);
      res
        .status(200)
        .json(doc);
    });
};

//add a hotel 
module.exports.addHotel = function(req, res){
  console.log("Add new Hotel");
  var db = dbconn.get();
  var collection = db.collection('hotel');
  var newHotel = {};
  if(req.body && req.body.name && req.body.stars){
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    //req.body gets data from HTTP body in JSON format
    collection
    //insertOne --> insert into collection
    //@params --> document, callback
      .insertOne(newHotel, function(err, response){
        console.log("Added Hotel: ", response.ops);
        res
          .status(201)
          .json(response.ops);
      });
  }
  else{
    console.log("Data missing from the body");
    res
      .status(404)
      .json({message: "Required data missing from body"});
  }
};
