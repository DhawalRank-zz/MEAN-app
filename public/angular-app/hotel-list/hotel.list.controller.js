angular.module('meanhotel')
  .controller('hotelsController', hotelsController);

function hotelsController(hotelDataFactory) {
  var me = this;
  me.title = 'MEAN Hotel App';
  hotelDataFactory.hotelList().then(function(response) {
    me.hotels = response;
  });
}
