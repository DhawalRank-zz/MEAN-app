angular.module('meanhotel')
  .directive('hotelRating', hotelRating);
//above implies <hotel-rating> directive in html
function hotelRating() {
  return {
    //restrict to element
    restrict: 'E',
    template: '<span ng-repeat="star in me.stars track by $index" class="	glyphicon glyphicon-star">{{ star }}</span>',
    bindToController: true,
    controller: 'hotelController',
    controllerAs: 'me',
    scope: {
      stars: '@'
    }
  };
}
