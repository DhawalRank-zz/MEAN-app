var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function(req, res) {
  console.log('Get all Reviews');
  var hotelID = req.params.hotelID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 200
      };
      if(err){
          response.status = 500; response.message = err;
      }
      else if(!aHotel){
        response.status = 500; response.message = {error: "Hotel not found"};
      }
      else{
        console.log('Found reviews of hotel with ID: ' + aHotel.reviews);
        response.message = aHotel.reviews;
      }
      res
        .status(response.status)
        .json(response.message);
      });
};

module.exports.getReviewByID = function(req, res) {
  console.log('Get Review by ID');
  var hotelID = req.params.hotelID;
  var reviewID = req.params.reviewID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 200,
      };
      if(err){
          response.status = 500; response.message = err;
      }
      else if(!aHotel){
        response.status = 500; response.message = {error: "Hotel not found"};
      }
      else{
        var aReview = aHotel.reviews.id(reviewID);
        if(!aReview){
          response.status = 404; response.message = {error: "not found"};
        }
        else{
          console.log('Found review with ID ' + reviewID);
          response.status = 200; response.message = aReview;
        }

      }
      res
        .status(response.status)
        .json(response.message);
      });
};

var _addReview = function(req, res, aHotel){
  aHotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });
  aHotel.save(function(err, newHotel){
    if(err)
    {
      res
        .status(500)
        .json(err);
    }
    else{
      res
        .status(201)
        .json(aHotel.reviews[aHotel.reviews.length-1]);
    }
  });
};

module.exports.addReview = function(req, res) {
  console.log('Get Review by ID');
  var hotelID = req.params.hotelID;
  var reviewID = req.params.reviewID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 200,
      };
      if(err){
          response.status = 500; response.message = err;
      }
      else if(!aHotel){
        response.status = 500; response.message = {error: "Hotel not found"};
      }
      if(aHotel){
        _addReview(req, res, aHotel);
      }
      else{
        res
          .status(response.status)
          .json(response.message);
        }
    });
};

module.exports.updateReviewByID = function(req, res){
  var hotelID = req.params.hotelID;
  var reviewID = req.params.reviewID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 204
      };
      if(err){
          response.status = 500; response.message = err;
      }
      else if(!aHotel){
        response.status = 500; response.message = {error: "Hotel not found"};
      }
      else{
        var aReview = aHotel.reviews.id(reviewID);
        if(!aReview){
          console.log('Invalid Review ID');
          response.status = 500; response.message = {message: 'Review not found'};
        }
        else{
          console.log('Found review with ID ' + reviewID);
          aReview.name = req.body.name;
          aReview.rating = parseInt(req.body.rating, 10);
          aReview.review = req.body.review;
          aHotel.save(function(err, updatedReview){
            if(err){
              response.status = 500; response.message = err;
            }
          });
        }
        res
          .status(response.status)
          .json(response.message);
      }

      });
};

module.exports.deleteReviewByID = function(req, res){
  var hotelID = req.params.hotelID;
  var reviewID = req.params.reviewID;
  Hotel
    .findById(hotelID)
    .exec(function(err, aHotel){
      var response = {
        status: 204
      };
      if(err){
          response.status = 500; response.message = err;
      }
      else if(!aHotel){
        response.status = 500; response.message = {error: "Hotel not found"};
      }
      else{
        var aReview = aHotel.reviews.id(reviewID).remove();
          console.log('Found review with ID ' + reviewID);
          aHotel.save(function(err, updatedReview){
            if(err){
              response.status = 500; response.message = err;
            }
          });
        res
          .status(response.status)
          .json(response.message);
      }
      });
};
