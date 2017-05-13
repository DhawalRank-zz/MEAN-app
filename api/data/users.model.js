var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});
mongoose.model('User', userSchema);
