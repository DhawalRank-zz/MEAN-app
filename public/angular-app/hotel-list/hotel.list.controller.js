angular.module('meanhotel')
  .controller('hotelsController', hotelsController);

function hotelsController(hotelDataFactory) {
  var me = this;
  me.title = 'List of Hotels';
  hotelDataFactory.hotelList().then(function(response) {
    me.hotels = response;
  });
}
