"use strict";

app.controller('ProfileCtrl', function ($scope, $routeParams, $filter, $location, AuthFactory, FirebaseStorage) {

//all scoped vars
    $scope.user = AuthFactory.getUser();
    $scope.allUserWigs = [];
    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.q = '';

//Firebase call for UserWigs and item deletion
    FirebaseStorage.getUserWigs($scope.user.currentUser).then(function (allUserWigs) {
        $scope.allUserWigs = allUserWigs;
    });

    $scope.itemDelete = function (wigId) {
        FirebaseStorage.deleteUserWig(wigId).then(function (response) {
            FirebaseStorage.getUserWigs($scope.user.currentUser).then(function (allUserWigs) {
                $scope.allUserWigs = allUserWigs;
            });
        });
    };

//pass values to "more info" modal view
    $scope.setMyModalValues = (modalValues) => {
        $scope.modalName = modalValues.wigName;
        $scope.modalHair = modalValues.hairType;
        $scope.modalWig = modalValues.wigType;
        $scope.modalBrand = modalValues.wigBrand;
        $scope.modalImage = modalValues.imageUrl;
        $scope.modalColor = modalValues.color;
        $scope.modalCap = modalValues.capSize;
        $scope.modalNote = modalValues.notes;
        $scope.modalOwned = modalValues.owned;
        $scope.modalWish = modalValues.wishlist;
        $scope.modalDislike = modalValues.triedDisliked;
        $scope.modalLike = modalValues.triedLiked;
        $scope.modalPrice = modalValues.averageWebPrice;
        $scope.modalPurchasePrice = modalValues.purchasePrice;
        $scope.modalPurchaseDate = modalValues.purchaseDate;
    };

//pagination functionality
    $scope.getData = function () {
        return $filter('filter')($scope.allUserWigs, $scope.q);
    };

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    };

    for (var i = 0; i < 65; i++) {
        $scope.allUserWigs.push("Wig " + i);
    }

//materialize stuff
    $(document).ready(function () {
        $('.modal').modal();
        $('select').material_select();
    });

});

//custom filter for pagination on search page
app.filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    };
});
