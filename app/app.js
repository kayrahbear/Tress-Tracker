'use strict';

var app = angular.module("TressTracker", ["ngRoute", "ngMaterial", "oitozero.ngSweetAlert"]);

//used to authenticate user when navigating to other views
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("You're an authenticated user! Hooray!");
            resolve();
        } else {
      console.log("Who are you? Stranger danger! Shoo!");
            reject();
        }
    });
});

//set up route paramaters
app.config( function($routeProvider) {
   $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: "UserCtrl"
    }).
    when('/login', {
        templateUrl: 'partials/home.html',
        controller: 'UserCtrl'
    }).
    when('/logout', {
        templateUrl: 'partials/home.html',
        controller: 'UserCtrl'
    }).
    when('/home', {
        templateUrl: 'partials/home.html',
        controller: "HomeCtrl"
    }).
    when('/search', {
        templateUrl: 'partials/search.html',
        controller: "SearchCtrl"
    }).
    when('/search/:wigId', {
        templateUrl: 'partials/singlewig.html',
        controller: 'SingleWigCtrl'
    }).
    when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: "ProfileCtrl"
    }).
    otherwise('/', {});
    });

//initialize Firebase
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

firebase.initializeApp(authConfig);
});


//Materialize Functions
$('.dropdown-button').dropdown({
inDuration: 300,
outDuration: 225,
constrainWidth: false, // Does not change width of dropdown to that of the activator
hover: false, // Activate on hover
gutter: 0, // Spacing from edge
belowOrigin: false, // Displays dropdown below the button
alignment: 'left', // Displays dropdown with edge aligned to the left of button
stopPropagation: false // Stops event propagation
}
);
