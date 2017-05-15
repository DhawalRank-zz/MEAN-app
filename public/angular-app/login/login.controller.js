angular.module('meanhotel').controller('loginController', loginController);

function loginController($http, $location, $window, AuthFactory, jwtHelper) {
  var me = this;

  me.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  me.login = function() {
    if (me.userName && me.password) {
      var user = {
        userName: me.userName,
        password: me.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          me.loggedInUser = decodedToken.userName;
        }
      }).catch(function(error) {
        console.log(error);
      });

    }
  };

  me.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  };

  me.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  };
}
