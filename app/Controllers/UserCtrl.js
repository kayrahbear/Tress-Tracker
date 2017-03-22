'use strict';

// login, logout, register, loginGoogle, conditional, authfactory
app.controller('UserCtrl', function ($scope, $window, AuthFactory, SweetAlert, FirebaseStorage) {

//all scoped vars
	$scope.isLoggedIn = false;
	$scope.account = {
		email: '',
		password: '',
		displayName: 'New User'
	};

//logout function, sends back to login/home page
	$scope.logout = () => {
		console.log("logout clicked");
		AuthFactory.logoutUser().then(function(data){
			console.log("logged out?", data);
			$window.location.url = "#!/login";
			$scope.isLoggedIn = false;
		}, function(error){
			SweetAlert.swal("Oops!", error.message, "error");
		});
	};

//when first loaded, make sure no one is logged in
	if(AuthFactory.isAuthenticated()){
		$scope.logout();
	}

//use 'register' button to create a new email/pass user
	$scope.register = () => {
		AuthFactory.createUser({
			displayName: $scope.account.displayName,
			email: $scope.account.email,
			password: $scope.account.password
		}).then((userData) => {
			console.log("UserCtrl newUser: ", userData );
			$scope.login();
		}, (error) => {
			SweetAlert.swal("Oops!", error.message, "error");
		});
	};

//use 'login' button to log in with an existing user email/pass account
	$scope.login = () => {
		AuthFactory.loginUser($scope.account)
		.then( () => {
			console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
			$scope.isLoggedIn = true;
			$window.location.href = "#!/profile";
		}, (error) => {
			SweetAlert.swal("Oops!", error.message, "error");
		});
	};

//login or register with google account
	$scope.loginGoogle = () => {
		AuthFactory.authWithProvider().then(function(result) {
			console.log("logged in user: ", result.user);
			$scope.isLoggedIn = true;
			$window.location.href = "#!/profile";
		}).catch(function(error) {
			SweetAlert.swal("Oops!", error.message, "error");
		});
	};


});
