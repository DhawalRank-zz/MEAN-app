angular.module('meanhotel')
  .controller('registerController', registerController);

  function registerController($http) {
    var me = this;

    me.register = function(){
      var user = {
        userName: me.userName,
        name: me.name,
        password: me.password
      };
      if(!me.userName || !me.password){
        me.error = "Please add username and password";
      }
      if(me.password !== me.passwordRepeat){
        me.error = "Passwords do not match!";
      }
      else{
        $http.post('/api/users/register', user).then(function(result){
          me.message = "Registration Successful";
          me.error = "";
        }).catch(function(err){
          console.log(err);
        });
      }
    };
  }
