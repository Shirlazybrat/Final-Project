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



finalProject.controller('mainController', function($scope){
	$scope.home = 'home';
});
