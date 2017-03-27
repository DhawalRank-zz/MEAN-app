var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controller.js');
router
  .route('/hotels')
  //get executes function with req and res on its own
  //just pass the function object to it
  .get(ctrlHotels.getAllHotels)
  .post(ctrlHotels.addHotel);

module.exports = router;

router
  .route('/hotels/:hotelID')
  .get(ctrlHotels.getHotelByID)
  .put(ctrlHotels.updateHotelByID)
  .delete(ctrlHotels.deleteHotelByID);


router
  .route('/hotels/:hotelID/reviews')
  .get(ctrlReviews.getAllReviews)
  .post(ctrlReviews.addReview);

router
  .route('/hotels/:hotelID/reviews/:reviewID')
  .get(ctrlReviews.getReviewByID)
  .put(ctrlReviews.updateReviewByID)
  .delete(ctrlReviews.deleteReviewByID);
