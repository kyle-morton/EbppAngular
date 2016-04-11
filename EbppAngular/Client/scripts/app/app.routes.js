angular.module('app.routes', ['ngRoute'])
.config(function ($routeProvider, $locationProvider) {

    //apply routes to $routeProvider
    $routeProvider

    .when('/', {
        templateUrl: 'Client/scripts/app/views/home.html',
        controller: 'dataUsageController',
        controllerAs: 'dataUsage'
    })
    //login page
	.when('/login', {
	    templateUrl: 'Client/scripts/app/views/login.html'
	});

    //clean up url string
    $locationProvider.html5Mode(true);
});