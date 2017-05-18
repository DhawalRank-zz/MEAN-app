angular.module('meanhotel', ['ngRoute', 'angular-jwt'])
  .config(config)
  .run(run);

function config($httpProvider, $routeProvider) {
  //$httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html',
      access: {
        restricted: false
      }
    })
    .when('/hotels', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: hotelsController,
      controllerAs: 'me',
      access: {
        restricted: false
      }
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: hotelController,
      controllerAs: 'me',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: registerController,
      controllerAs: 'me',
      access: {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      controller: profileController,
      controllerAs: 'me',
      access: {
        restricted: true
      }
    })
    .when('/addHotel', {
      templateUrl: 'angular-app/add-hotel/add-hotel.html',
      controller: addHotelController,
      controllerAs: 'me',
      access: {
        restricted: true
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !AuthFactory.isLoggedIn) {
      delete $window.sessionStorage.token;
      event.preventDefault();
      $location.path('/');
    }
  });
}
