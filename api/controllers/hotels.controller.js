var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
  var lat = parseFloat(req.query.lat), lng = parseFloat(req.query.lng);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    //in meters
    maxDistance: 2000,
    num: 5
  };
  Hotel
    .geoNear(point, geoOptions, function(err, results, stats){
      var response = {
        status: 200,
        message: results
      };
      if(err){
        response.status = 500; response.message = err;
      }
      else{
        console.log(stats);
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

//gets all the hotels
module.exports.getAllHotels = function(req, res) {
  console.log('Get all Hotels');
  var offset = 0, count = 5, maxCount = 10;

  if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req, res);
    return;
  }

  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }
  if(isNaN(offset) || isNaN(count)){
    res
      .status(400)
      .json({error: 'Count or offset should be a number'});
    return;
  }
  if(count > maxCount){
    res
      .status(500)
      .json({error: "max count of 10 reached"});
    return;
  }
  Hotel
    .find()
    //select start point
    .skip(offset)
    //select end point
    .limit(count)
    .exec(function(err, hotels){
      var response = {
        status: 200,
        message: hotels
      };
      if(err){
        console.log('Error getting data: ', err);
        response.status = 500; response.message = {message: "Error getting data"};
      }
      else{
        console.log("Found " + hotels.length + " hotel(s)");
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

//get hotel by unique ID
module.exports.getHotelByID = function(req, res) {
  //get parameters
  var hotelID = req.params.hotelID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 200,
        message: aHotel
      };
      if(err){
        console.log('Error finding hotel with ID : ', hotelID);
        response.status = 500; response.message = err;
      }
      else if(!aHotel){
        console.log('Error finding hotel with ID : ', hotelID);
        response.status = 404; response.message = {error: "HotelID not found"};
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _splitArray = function(input){
  var output;
  if(input && input.length > 0){
    output = input.split(",");
  }
  else{
    output = [];
  }
  return output;
};

//add a hotel
module.exports.addHotel = function(req, res){
  console.log("Add new Hotel");
  if(req.body && req.body.name && req.body.stars){
    Hotel.create(
      {
        name: req.body.name,
        stars: parseInt(req.body.stars, 10),
        currency: req.body.currency,
        description: req.body.description,
        location: {
          address: req.body.address,
          coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        },
        services: _splitArray(req.body.services),
        photos: _splitArray(req.body.photos)

    }, function(err, aHotel){
      var response = {
        status: 201,
        message: aHotel
      };
      if(err){
        console.log('Error adding hotel: ', err);
        response.status = 400; response.message = {message: "Error adding hotel"};
      }
      else{
        console.log("Added Hotel: ", aHotel);
      }
      res
        .status(response.status)
        .json(response.message);
    });
  }
  else{
    console.log("Data missing from the body");
    res
      .status(404)
      .json({message: "Required data missing from body"});
  }
};


module.exports.updateHotelByID = function(req, res){
  var hotelID = req.params.hotelID;
  Hotel
    .findById(hotelID)
    //exclude specific documents seperated by a space
    .select('-reviews -rooms')
    .exec(function(err, aHotel){
      var response = {
        status: 200,
        message: aHotel
      };
      if(err){
        console.log('Error finding hotel with ID : ', hotelID);
        response.status = 500; response.message = err;
      }
      else if(!aHotel){
        console.log('Error finding hotel with ID : ', hotelID);
        response.status = 404; response.message = {error: "HotelID not found"};
      }
      if(response.status !== 200){
        res
          .status(response.status)
          .json(response.message);
      }
      else{
        aHotel.name = req.body.name;
        aHotel.stars = parseInt(req.body.stars, 10);
        aHotel.currency = req.body.currency;
        aHotel.description = req.body.description;
        aHotel.location = {
          address: req.body.address,
          coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        };
        aHotel.services = _splitArray(req.body.services);
        aHotel.photos = _splitArray(req.body.photos);
        aHotel.save(function(err, updatedHotel){
          var response = {
            status: 204,
            message: updatedHotel
          };
          if(err){
            console.log('Error adding hotel: ', err);
            response.status = 400; response.message = {message: "Error adding hotel"};
          }
          else{
            console.log("Added Hotel: ", updatedHotel);
          }
          res
            .status(response.status)
            .json(response.message);
        });
      }
    });
};
module.exports.deleteHotelByID = function(req, res){
  var hotelID = req.params.hotelID;
  Hotel
    .findByIdAndRemove(hotelID)
    .exec(function(err, deletedHotel){
      if(err){
        res
          .status(404)
          .json(err);
      }
      else{
        res
          .status(204)
          .json(deletedHotel);
      }
    });
};
