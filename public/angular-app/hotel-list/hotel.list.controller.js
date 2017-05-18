angular.module('meanhotel')
  .controller('hotelsController', hotelsController)
  .factory('PagerService', PagerService);

function hotelsController(hotelDataFactory, PagerService) {
  var me = this;
  me.title = 'List of Hotels';
  hotelDataFactory.hotelList().then(function(response) {
    me.hotelsResponse = response;
    me.pager = {};
    me.setPage = setPage;

    initController();

    function initController() {
        // initialize to page 1
        me.setPage(1);
    }

    function setPage(page) {
        if (page < 1 || page > me.pager.totalPages) {
            return;
        }

        // get pager object from service
        me.pager = PagerService.GetPager(me.hotelsResponse.length, page);

        // get current page of items
        me.hotels = me.hotelsResponse.slice(me.pager.startIndex, me.pager.endIndex + 1);
    }
  });
}
function PagerService() {
  // service definition
  var service = {};

  service.GetPager = GetPager;

  return service;

  // service implementation
  function GetPager(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = range(startPage, endPage, 1, 0);

      // return object with all pager properties required by the view
      return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
      };
  }
}
//get an array from provided range
function range(start, end, step, offset) {
  var len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
  var direction = start < end ? 1 : -1;
  var startingPoint = start - (direction * (offset || 0));
  var stepSize = direction * (step || 1);
  return Array(len).fill(0).map(function(_, index) {
    return startingPoint + (stepSize * index);
  });

}
