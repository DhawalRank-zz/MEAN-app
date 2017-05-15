angular.module('meanhotel')
  .controller('profileController', profileController);

function profileController($window, jwtHelper, userFactory){
  var me = this;
  var token = jwtHelper.decodeToken($window.sessionStorage.token);
  userFactory.getUser(token.userName).then(function (response) {
    me.name = response.name;
    me.userName = response.userName
  });
}
