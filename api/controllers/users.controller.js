var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res) {
  var userName = req.body.userName;
  var name = req.body.name || null;
  var password = req.body.password;

  User.create({
    userName: userName,
    name: name,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, createdUser){
    if(err){
      res.status(400).json(err);
    }
    else{
      res.status(201);
    }
  });
};

module.exports.login = function(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;

  User
    .findOne({userName: userName})
    .exec(function(err, foundUser){
      var response = {
        status: 400,
        message: "Uncaught Error"
      };
      if(err){
        response.status = 400; response.message = err;
      }
      else if(foundUser === null){
        response.status = 400; response.message = {"error":"Unauthorized User"};
      }
      else{
        if(bcrypt.compareSync(password, foundUser.password)){
          var token = jwt.sign({userName: foundUser.userName}, 's3cr3t', {expiresIn: 3600});
          response.status = 200; response.message = {success: true, token: token};
        }
        else{
          response.status = 400; response.message = {"error":"Unauthorized User"};
        }
      }
      res.status(response.status)
      .json(response.message);
    });
};

module.exports.authenticate = function(req, res, next){
  var header = req.headers.Authorization;
  if(header){
    var token = req.headers.Authorization.split(" ")[1];
    jwt.verify(token, 's3cr3t', function(err, decoded){
      if(err){
        res.status(401).json({"error":"Unauthorized User"});
      }
      else{
        req.user = decoded.userName;
        next();
      }
    });
  }
  else{
    res.status(403).json({"error":"No token present"});
  }
};
