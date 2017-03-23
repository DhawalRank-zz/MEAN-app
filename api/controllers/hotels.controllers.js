var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');
module.exports.getAllHotels = function(req, res) {
  var db = dbconn.get();
  console.log(db);
  console.log('Get all Hotels');
  //req.query contains request string posted on the browser
  console.log(req.query);
  var offset = 0, count = 5;
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }
  var retData = hotelData.slice(offset, offset+count);
  res.status(200).json(retData);
};

module.exports.getHotelByID = function(req, res) {
  //get parameters
  var hotelID = req.params.hotelID;
  var thisHotel = hotelData[hotelID];
  console.log('Get all Hotels with ID: ' + hotelID);
  res.status(200).json(thisHotel);
};

module.exports.addHotel = function(req, res){
  console.log("Add new Hotel");

  //req.body gets data from HTTP body in JSON format
  console.log(req.body);
  res.status(200).json(req.body);
};
