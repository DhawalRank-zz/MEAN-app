angular.module('meanhotel')
  .controller('addHotelController', addHotelController);
function addHotelController(hotelDataFactory) {
  var me = this;
  me.addHotel = function(){
    var aHotel = {
      name: me.name,
      description: me.description,
      stars: me.stars,
      services: me.services,
      address: me.address,
      lng: me.lng,
      lat: me.lat,
      currency: me.currency,
    }
    hotelDataFactory.addHotel(aHotel).then(function(response){
      if(response._id){
        me.message = "Hotel added successfully"
      }
      else{
        me.error = "Error saving hotel"
        console.log(response);
      }
    });
  }
}
