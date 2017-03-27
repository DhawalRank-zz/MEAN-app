var mongoose = require('mongoose');

//schema creation
var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

var roomSchema = new mongoose.Schema({
  type: String,
  number: Number,
  description: String,
  photos: [String],
  price: Number
});

var hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  services: [String],
  description: String,
  photos: [String],
  currency: String,
  //reference to reviewSchema
  reviews: [reviewSchema],
  rooms: [roomSchema],
  location: {
    address: String,
    //always store coordinates in longitude(east-west), latitude order(north-south)
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  }
});

//model() --> converts schemas to models which node.js understands
//@param: name, schema
mongoose.model('Hotel', hotelSchema);
