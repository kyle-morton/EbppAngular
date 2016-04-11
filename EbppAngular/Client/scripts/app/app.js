var app = angular.module('ebppApp', ['ngAnimate', 'app.routes', 'angular-loading-bar',
                         'authService', 'dataUsageService', 'mainCtrl', 'dataUsageCtrl']);

// application configuration to integrate token into requests
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

var host = 'http://localhost:57525';
var apiHost = 'http://localhost:57525/api/';
