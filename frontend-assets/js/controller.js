var finalProject = angular.module('finalProject', ['ngRoute', 'firebase']);

finalProject.config(function($routeProvider){
	$routeProvider

	//routes for pages
	.when('/',{
		templateUrl: 'frontend-assets/views/home.html',
		controller: 'mainController'
	})
	.when('/login',{
		templateUrl: 'frontend-assets/views/login.html',
		controller: 'mainController'
	})
	.when('/register',{
		templateUrl: 'frontend-assets/views/register.html',
		controller: 'mainController'
	})
	.when('/portal',{
		templateUrl: 'frontend-assets/views/portal.html',
		controller: 'mainController'
	})
	.when('/boards',{
		templateUrl: 'frontend-assets/views/boards.html',
		controller: 'mainController'
	})
	.otherwise({
		redirectTo: '/'
	})
});



finalProject.controller('mainController', function($scope, $http, $firebase){
	var apiPath = "http://localhost:8000/";
	
// var ref = new Firebase("https://www.gstatic.com/firebasejs/3.5.2/firebase.js")
// var fb = $firebase(ref);
// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyDqoOSZyaaPB7V67mSqWbKnu-ILTLQje6w",
//     authDomain: "bridesmaidal.firebaseapp.com",
//     databaseURL: "https://bridesmaidal.firebaseio.com",
//     storageBucket: "bridesmaidal.appspot.com",
//     messagingSenderId: "1006473603582"
//   };
//   firebase.initializeApp(config);

	$scope.register = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/register', {
	 		username: $scope.username,
	 		password: $scope.password,
	 		password2: $scope.password2,
	 		email: $scope.email
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.message == 'added'){
	 			$location.path('/options');
	 			$cookies.put('token', response.data.token);
	 			$cookies.put('username', $scope.username);
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };
$scope.username = $scope.register();

$scope.login = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/login', {
	 		username: $scope.username,
	 		password: $scope.password
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.success == 'userFound'){
	 			$location.path('/options');
	 			$cookies.put('username', $scope.username);
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };

// $scope.username = $scope.login();

	// $scope.home = 'home';


	// $scope.portal = 'portal';
});
