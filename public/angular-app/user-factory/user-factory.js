angular.module('meanhotel')
  .factory('userFactory', userFactory);

  function userFactory($http) {
    return {
      getUser: getUser,
      addUser: addUser,
      updateUser: updateUser
    }
    function getUser(userName) {
      return $http.get('api/users/getUser/' + userName).then(compelete).catch(failed);
    }
    function addUser() {
      return {};
    }
    function updateUser() {
      return {};
    }
    function compelete(response){
      return response.data;
    }
    function failed(err){
      console.log(err.statusText);
    }
  }
