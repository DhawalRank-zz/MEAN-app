var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controllers.js');
router
  .route('/hotels')
  //get executes function with req and res on its own
  //just pass the function object to it
  .get(ctrlHotels.getAllHotels);

module.exports = router;

router
  .route('/hotels/:hotelID')
  .get(ctrlHotels.getHotelByID);

  router
    .route('/hotels/new')
    .post(ctrlHotels.addHotel);
