angular.module('mainCtrl', [])
.controller('mainController', function ($rootScope, $location, $scope, Auth, AuthToken) {
    var vm = this;
    vm.message = "";
    vm.loggedIn = Auth.isUserLoggedIn();
    vm.user = {};

    if (vm.loggedIn) {
        Auth.getUser()
       .then(function (response) { vm.setUser(response.data.userDetails) },
       function (error, status, headers, config, statusText) {
           //console.log("GetUser ERROR: " + JSON.stringify(error));
           vm.error = 'Error Occurred: Couldn\'t Get User Information!';
       });
    }
   
    vm.setUser = function (userDetails) {
        vm.user.userId = userDetails.userId;
        vm.user.username = userDetails.username;
        vm.user.site = userDetails.site;
        vm.user.account = userDetails.account;
    };

    vm.doLogin = function (isValid) {

        if (isValid) {
            //set to processing, clear previous error msg
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.user.username, vm.user.password)
            .then(function (response) {
                //console.log("Login: " + JSON.stringify(response));
                AuthToken.setToken(response.data.access_token);
                vm.processing = false;
                vm.loggedIn = true;
                vm.user.password = '';
                vm.error = '';
                Auth.getUser()
                .then(function (response) {
                    //console.log("getUser: " + JSON.stringify(response));
                    vm.user.userId = response.data.userDetails.userId;
                    vm.user.site = response.data.userDetails.site;
                    vm.user.account = response.data.userDetails.account;
                    $location.path('/');
                },
                function (error, status, headers, config, statusText) {
                    console.log("GetUser ERROR: " + JSON.stringify(error));
                    vm.error = 'Error Occurred: Couldn\'t Get User Information!';
                });
            },
            function (error) {
                    //console.log("Login Error: " + JSON.stringify(error));
                    if (error) vm.error = 'Error Occurred: ' + error.error_description;
                    else vm.error = 'Error Occurred: Server Currently Unavailable';
            });
        }
    };

    vm.doLogout = function () {
        Auth.logout();
        vm.user = {};
        vm.error = '';
        vm.EquipmentCheckMessage = null;
        vm.loggedIn = false;
        $location.path('/login');
    };

});