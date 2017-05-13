angular.module('meanhotel')
  .factory('AuthFactory', AuthFactory);

function AuthFactory(){
  var auth = {
    loggedInUser: false
  };
  return {
    auth: auth
  };

}
