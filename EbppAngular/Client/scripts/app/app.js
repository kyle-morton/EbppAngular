var app = angular.module('ebppApp', ['ngAnimate', 'app.routes', 'angular-loading-bar',
                         'authService', 'dataUsageService', 'mainCtrl', 'dataUsageCtrl',
                         'logging']);

// application configuration to integrate token into requests
app.config(function ($httpProvider, $routeProvider, $locationProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
app.run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!Auth.isUserLoggedIn()) 
            $location.path('/login');
        else if ($location.path('/login')) 
            $location.path("/home");
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        //console.log("Success:" + $location.path() + " Logged In: " + AuthToken.isUserLoggedIn());
    });
    $rootScope.$on('$routeChangeError', function () {
        //console.log("Error: " + $location.path() + " Logged In: " + AuthToken.isUserLoggedIn());
    });
})

var host = 'http://localhost:57525';
var apiHost = 'http://localhost:57525/api/';
