var finalProject = angular.module('finalProject', ['ngRoute', 'ngCookies']);

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
/////////////////////////////////////////////////////////////

finalProject.controller('mainController', function($scope, $http, $sce, $location, $cookies){
	var apiPath = "http://localhost:8000";
	
	var CLIENT_ID = '357508717792-rnb52hc4im3835bdf2cpt4najunjeam3.apps.googleusercontent.com';

    var SCOPES = ["https://www.googleapis.com/auth/calendar"];
    var insertCal = ["https://www.googleapis.com/calendar/v3/calendars.insert"];

    $scope.register = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/register_user', {
	 		username: $scope.username,
	 		name: $scope.name,
	 		password: $scope.password,
	 		password_confirm: $scope.password_confirm,
	 		email: $scope.email,
	 		wed_date: $scope.wed_date,
	 		location: $scope.location,
	 		budget: $scope.budget 
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



    // **
    //    * Check if current user has authorized this application.
    //    */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
          calendar();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      $scope.handleAuthClick = function()  {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        // console.log(event);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
        console.log(gapi.client);
        gapi.client.load('calendar.calendars', 'v3', calendar); 
      }

      function calendar(){
      	var request = gapi.client.calendar.calendars.insert({
          	"resource" :
     		{"summary": "Tshirl",//fix this so that it can be entered from user
     		"description": "test",
     		"timezone" : "xxxx"}
         });
      	request.execute(function(resp) {
          var events = resp.items;
          console.log(resp.id);
		});
		return resp;
	}

	// $scope.resp = calendar();
	// console.log(resp);

	var calendarID = "bu10m6dl0ppkaq50eksuoe7e9o@group.calendar.google.com";
	$scope.calendarID = $sce.trustAsResourceUrl('https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffccff&amp;' +calendarID+'&amp;color=%23691426&amp;ctz=America%2FNew_York" style="border-width:0" width="1000" height="600" frameborder="0" scrolling="no"');

//
      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          console.log(events);
          for (i = 0; i < resp.length; i++) {
          console.log(resp[i]);
      }
          // appendPre('Upcoming events:');

          // if (events.length > 0) {
          //   for (i = 0; i < events.length; i++) {
          //     var event = events[i];
          //     var when = event.start.dateTime;
          //     if (!when) {
          //       when = event.start.date;
          //     }
          //     appendPre(event.summary + ' (' + when + ')')
          //   }
          // } else {
          //   appendPre('No upcoming events found.');
          // }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

 // handleAuthClick(event);

$scope.addHer = false;

$scope.party = [
		{
			img: "donna.jpg",
			name: "Test1",
			title: "Donna"
		},
		{
			img: "tam.jpg",
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

});
