'use strict';

app.controller('SingleWigCtrl', function($scope, $routeParams, SweetAlert, AuthFactory, FirebaseStorage, $window, $location, $anchorScroll) {

    $scope.user = AuthFactory.getUser();

    $scope.userWigObj = {};

    FirebaseStorage.getSingleWig($routeParams.wigId)
        .then(function successCallback(response){
            $scope.userWigObj = response;
            $scope.selectedWig = response;
            console.log("selected", $scope.userWigObj.wigUrl);
            FirebaseStorage.scrapeSingleWig($scope.userWigObj.wigUrl)
        .then(function successCallback(scrapeResponse){
            $scope.scrapedWig = scrapeResponse;
            $scope.scrapedColors = $scope.scrapedWig.product.variants;
            console.log("scraped", $scope.scrapedWig);
            console.log("colors", $scope.scrapedColors);
            });
        });



    $scope.addOwnedWig = function () {
        $('select').material_select();
        $scope.userWigObj.uid = $scope.user.currentUser;
        $scope.userWigObj.displayName = $scope.user.currentUserDisplayName;
        $scope.userWigObj.owned = true;
        $scope.userWigObj.color = "";
        $scope.userWigObj.purchasePrice = "";
        $scope.userWigObj.purchaseDate = "";
        $scope.userWigObj.capSize = "";
        $scope.userWigObj.notes = "";
    };

    $scope.addWishlistWig = function () {
        $('select').material_select();
        $scope.userWigObj.uid = $scope.user.currentUser;
        $scope.userWigObj.displayName = $scope.user.currentUserDisplayName;
        $scope.userWigObj.wishlist = true;
        $scope.userWigObj.color = "";
        $scope.userWigObj.capSize = "";
        $scope.userWigObj.notes = "";
    };

    $scope.addTriedLiked = function () {
        $('select').material_select();
        $scope.userWigObj.uid = $scope.user.currentUser;
        $scope.userWigObj.displayName = $scope.user.currentUserDisplayName;
        $scope.userWigObj.triedLiked = true;
        $scope.userWigObj.color = "";
        $scope.userWigObj.capSize = "";
        $scope.userWigObj.notes = "";

    };

    $scope.addTriedDisliked = function () {
        $('select').material_select();
        $scope.userWigObj.uid = $scope.user.currentUser;
        $scope.userWigObj.displayName = $scope.user.currentUserDisplayName;
        $scope.userWigObj.triedDisliked = true;
        $scope.userWigObj.color = "";
        $scope.userWigObj.capSize = "";
        $scope.userWigObj.notes = "";

    };

    $scope.ownedToFB = function (){
        FirebaseStorage.addUserWig($scope.userWigObj).then(function (comeback){
            SweetAlert.swal("Wig Added!", "You sucessfully added " +  $scope.selectedWig.wigName + " by " + $scope.selectedWig.wigBrand + " to your Owned list", "success");
        });
    };

    $scope.wishToFB = function (){
        FirebaseStorage.addUserWig($scope.userWigObj).then(function (comeback){
            SweetAlert.swal("Wig Added!", "You sucessfully added " +  $scope.selectedWig.wigName + " by " + $scope.selectedWig.wigBrand + " to your Wishlist", "success");
        });
    };

    $scope.likeToFB = function (){
        FirebaseStorage.addUserWig($scope.userWigObj).then(function (comeback){
            SweetAlert.swal("Wig Added!", "You sucessfully added " +  $scope.selectedWig.wigName + " by " + $scope.selectedWig.wigBrand + " to your Tried & Liked list", "success");
        });
    };

    $scope.dislikeToFB = function (){
        FirebaseStorage.addUserWig($scope.userWigObj).then(function (comeback){
            SweetAlert.swal("Wig Added!", "You sucessfully added " +  $scope.selectedWig.wigName + " by " + $scope.selectedWig.wigBrand + " to your Tried & Dislike list", "success");
        });
    };

    $(document).ready(function(){
        $('.modal').modal();
    });



});
