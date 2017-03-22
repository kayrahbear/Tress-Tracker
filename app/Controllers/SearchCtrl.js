'use strict';

app.controller('SearchCtrl', function($scope, $filter, $route, $routeParams, $location, AuthFactory, FirebaseStorage) {

//all scoped vars
    $scope.allWigs = [];
    $scope.allBrands = ["Amore","Belle Madame", "BelleTress", "Easihair", "Ellen Wille", "Envy","Envy (Alan Eaton)", "Estetica", "Gabor", "HairDo", "Henry Margu", "Jon Renau", "Jon Renau Evolution", "Jon Renau Illusions", "Louis Ferre", "Naturally Yours(Henry Margu)", "Noriko", "Raquel Welch", "Rene of Paris Hi Fashion", "Revlon", "Sherri Shepherd", "Tony of Beverly", "TressAllure"];
    $scope.wigTypes = ["Partial/Topper", "Full Wig"];
    $scope.hairTypes = ["Synthetic", "Human Hair"];
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.search = '';
    $scope.filterHair = '';
    $scope.filterBrand = '';
    $scope.filterWig = '';

//Firebase call to get all wig objects
    FirebaseStorage.getAllWigs().then(function(allWigs){
        console.log('Complete list of all wigs: ', allWigs);
        $scope.allWigs = allWigs;
    });

//pagination functionality
    $scope.getData = function () {
        return $filter('filter')($scope.allWigs, $scope.search);
    };

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    };

    for (var i=0; i<65; i++) {
    $scope.allWigs.push("Wig "+i);
    }

    $scope.clearFilters = ()=>{
        $scope.filterHair = '';
        $scope.filterBrand = '';
        $scope.filterWig = '';
        $route.reload();
    };


//materialize stuff
    $(document).ready(function() {
        $('select').material_select();
    });


});

//custom filter for pagination on search page
app.filter('startFrom', function() {
  return function(input, start) {
      if (!input || !input.length) { return; }
      start = +start; //parse to int
      return input.slice(start);
  };
});
