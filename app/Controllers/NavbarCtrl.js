"use strict";

app.controller("NavCtrl", function($scope, $window, AuthFactory){

//all scoped vars
    $scope.isLoggedIn = false;
    $scope.user = AuthFactory.getUser();

//set Auth for show/hide functionality on NavBar
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            $scope.isLoggedIn = true;
            console.log("current user is logged in", $scope.isLoggedIn);
        }else {
            $scope.isLoggedIn = false;
            console.log("current user is logged in", $scope.isLoggedIn);
            $window.location.href = "#!/login";
        }
    });

//materialize stuff
    $('.dropdown-button').dropdown();

    $('.button-collapse').sideNav({
        edge: 'left',
        closeOnClick: true,
        draggable: true
    });

    $('.collapsible').collapsible();

});
