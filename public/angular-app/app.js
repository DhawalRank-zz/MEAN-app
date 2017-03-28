angular.module('meanhotel', ['ngRoute'])
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: hotelsController,
      controllerAs: 'me'
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: hotelController,
      controllerAs: 'me'
    });
}
