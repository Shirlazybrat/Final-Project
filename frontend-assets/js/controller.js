var finalProject = angular.module('finalProject', ['ngRoute']);

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



finalProject.controller('mainController', function($scope, $http){
	var apiPath = "http://localhost:8000/";
	

	$scope.register = function(){
	 	console.log($scope.username);
	 	// $http.post(apiPath + '/register', {
	 	// 	username: $scope.username,
	 	// 	password: $scope.password,
	 	// 	password2: $scope.password2,
	 	// 	email: $scope.email
	 	// }).then(function successCallback(response){
	 	// 	console.log(response);
	 	// 	if(response.data.message == 'added'){
	 	// 		$location.path('/options');
	 	// 		$cookies.put('token', response.data.token);
	 	// 		$cookies.put('username', $scope.username);
	 	// 	}
	 	// }, function errorCallback(response){
	 	// 	console.log(response);
	 	// });
	 };
$scope.username = $scope.register();

$scope.login = function(){
	 	console.log($scope.username);
	 	// $http.post(apiPath + '/login', {
	 	// 	username: $scope.username,
	 	// 	password: $scope.password
	 	// }).then(function successCallback(response){
	 	// 	console.log(response);
	 	// 	if(response.data.success == 'userFound'){
	 	// 		$location.path('/options');
	 	// 		$cookies.put('username', $scope.username);
	 	// 	}
	 	// }, function errorCallback(response){
	 	// 	console.log(response);
	 	// });
	 };

$scope.addHer = false;

$scope.party = [
		{
			img: "toast.jpeg",
			name: "Test1",
			title: "Donna"
		},
		{
			img: "shoesOff.jpeg",
			name: "Test2",
			title: "Tam"
		} 
	];

	console.log($scope.task);

	$scope.removeTask = function(){
		$scope.party.splice(index,1);
	}

	$scope.addMaid = function(){
		$scope.party.push($scope.newMaid);
		$scope.newMaid = {};
		$scope.addHer = false;
		console.log($scope.party);
	}

$scope.task = [
		{
			title: "Test1",
			who: "Donna",
		},
		{
			title: "Test2",
			who: "Tam",
		} 
	];

	console.log($scope.task);

	$scope.removeTask = function(){
		$scope.task.splice(index,1);
	}

	$scope.addTask = function(){
		$scope.task.push($scope.newTask);
		$scope.newTask = {};
		$scope.add = false;
		console.log($scope.newTask);
	}

// $scope.username = $scope.login();

	// $scope.home = 'home';


	// $scope.portal = 'portal';
});
