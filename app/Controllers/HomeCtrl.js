'use strict';

app.controller('HomeCtrl', function($scope, $routeParams, $location, AuthFactory, FirebaseStorage) {

    FirebaseStorage.getAllWigs().then(function(allWigs){
        console.log('Complete list of all wigs: ', allWigs);
        $scope.allWigs = allWigs;
    });

	// console.log('Current location: ' + $location.path());

});
