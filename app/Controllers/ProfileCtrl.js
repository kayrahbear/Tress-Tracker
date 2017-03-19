"use strict";

app.controller('ProfileCtrl', function($scope, $routeParams, $filter, $location, AuthFactory, FirebaseStorage) {

    $scope.user = AuthFactory.getUser();
    console.log("user", $scope.user);

    $scope.allUserWigs = [];
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.q = '';

    FirebaseStorage.getUserWigs($scope.user.currentUser).then(function(allUserWigs){
        console.log('Complete list of users wigs:' , allUserWigs);
        $scope.allUserWigs = allUserWigs;
    });

    $scope.getData = function () {
        return $filter('filter')($scope.allUserWigs, $scope.q);
    };

    $scope.numberOfPages=function(){
      return Math.ceil($scope.getData().length/$scope.pageSize);
    };

    for (var i=0; i<65; i++) {
      $scope.allUserWigs.push("Wig "+i);
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
