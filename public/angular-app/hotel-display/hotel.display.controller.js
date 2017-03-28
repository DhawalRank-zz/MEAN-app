angular.module('meanhotel')
  .controller('hotelController', hotelController);

function hotelController($route, hotelDataFactory, $routeParams) {
  var me = this;
  var id = $routeParams.id;
  hotelDataFactory.displayHotel(id).then(function(response) {
    me.hotel = response;
    me.stars = _getStarRating(response.stars);
  });

function _getStarRating(stars) {
  return new Array(stars);
}
me.addReview = function() {
  var postData = {
    name: me.name,
    rating: me.rating,
    review: me.review
  };
  if(me.reviewForm.$valid){
    hotelDataFactory.postReview(id, postData).then(function(response){
      if(response._id){
        $route.reload();
      }
    }).catch(function(err){
      console.log(err);
    });
  }
  else{
    me.isSubmitted = true;
  }
};
}
