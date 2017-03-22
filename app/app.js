'use strict';

var app = angular.module("TressTracker", ["ngRoute", "ngMaterial", "oitozero.ngSweetAlert"]);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

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
        controller: "SearchCtrl",
        resolve: {isAuth}
    }).
    when('/search/:wigId', {
        templateUrl: 'partials/singlewig.html',
        controller: 'SingleWigCtrl',
        resolve: {isAuth}
    }).
    when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: "ProfileCtrl",
        resolve: {isAuth}
    }).
    when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: "ResourcesCtrl",
        resolve: {isAuth}
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
