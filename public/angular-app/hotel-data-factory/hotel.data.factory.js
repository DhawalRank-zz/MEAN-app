angular.module('meanhotel')
  .factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http){
  return{
    hotelList: hotelList,
    displayHotel: displayHotel,
    postReview: postReview,
    addHotel: addHotel
  };
  function hotelList() {
    return $http.get('/api/hotels/').then(compelete).catch(failed);
  }
  function displayHotel(id) {
    return $http.get('/api/hotels/' + id).then(compelete).catch(failed);
  }
  function postReview(id, review){
    console.log("here");
    return $http.post('/api/hotels/' + id + '/reviews', review).then(compelete).catch(failed);
  }
  function addHotel(aHotel) {
    return $http.post('/api/hotels/', aHotel).then(compelete).catch(failed);
  }
  function compelete(response){
    return response.data;
  }
  function failed(err){
    console.log(err);
    console.log(err.statusText);
  }
}
