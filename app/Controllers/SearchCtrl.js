'use strict';

app.controller('SearchCtrl', function($scope, $filter, $routeParams, $location, AuthFactory, FirebaseStorage) {

    $scope.allWigs = [];

    FirebaseStorage.getAllWigs().then(function(allWigs){
        console.log('Complete list of all wigs: ', allWigs);
        $scope.allWigs = allWigs;
    });

    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.q = '';

    $scope.getData = function () {
        return $filter('filter')($scope.allWigs, $scope.q);
    };

    $scope.numberOfPages=function(){
      return Math.ceil($scope.getData().length/$scope.pageSize);
    };

    for (var i=0; i<65; i++) {
      $scope.allWigs.push("Wig "+i);
  }
});

//custom filter for pagination on search page
app.filter('startFrom', function() {
  return function(input, start) {
      if (!input || !input.length) { return; }
      start = +start; //parse to int
      return input.slice(start);
  };
});
