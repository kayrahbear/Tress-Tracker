'use strict';

app.controller('singlePinViewCtrl', function($scope, $routeParams, AuthFactory, FirebaseStorage, $window) {

    let user = AuthFactory.getUser();
    let userEmail = AuthFactory.getUserEmail();
    let displayName = AuthFactory.getUserDisplayName();

    $scope.addOwnedWig = {};

    FirebaseStorage.getSingleWig($routeParams.jinId).then(function successCallback(response){
        console.log('getSingleItemResponse', response);
        $scope.selectedWig = response;
    });

    $scope.addOwnedWig = function () {
        $scope.addOwnedWig.uid = user;
        $scope.addOwnedWig.displayName = displayName;
        $scope.addOwnedWig.owned = true;

        FirebaseStorage.addUserWig($scope.addOwnedWig).then(function (comeback){
            $window.alert("You sucessfully added a pin to your board!");
        });
    };


});
