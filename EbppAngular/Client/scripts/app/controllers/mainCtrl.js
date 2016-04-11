angular.module('mainCtrl', [])
.controller('mainController', function ($rootScope, $location, $scope, Auth, AuthToken, DataUsage) {
    var vm = this;
    vm.message = "";
    vm.loggedIn = AuthToken.getToken() !== null;
    vm.user = {};

    console.log("main Controller...");

    if (!vm.loggedIn) {
        $location.path('/login'); //redirect to login view
    } else {
        console.log("Get User...");
        Auth.getUser()
            .success(function (response) {
                console.log("getUser: " + JSON.stringify(response));
                vm.user.userId = response.userDetails.userId;
                vm.user.username = response.userDetails.username;
                vm.user.site = response.userDetails.site;
                vm.user.account = response.userDetails.account;
                console.log("User: " + JSON.stringify(vm.user));
            })
            .error(function (error, status, headers, config, statusText) {
                //console.log("GetUser ERROR: " + JSON.stringify(error));
                vm.error = 'Error Occurred: Couldn\'t Get User Information!';
            });
    }

    vm.doLogin = function (isValid) {

        if (isValid) {
            //set to processing, clear previous error msg
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.user.username, vm.user.password)
            .success(function (data) {
                //console.log("Login: " + JSON.stringify(data));
                AuthToken.setToken(data.access_token);
                vm.processing = false;
                vm.loggedIn = true;
                vm.user.password = '';
                vm.error = '';
                Auth.getUser()
                .success(function (response) {
                    //console.log("getUser: " + JSON.stringify(response));
                    vm.user.userId = response.userDetails.userId;
                    vm.user.site = response.userDetails.site;
                    vm.user.account = response.userDetails.account;
                    $location.path('/');
                })
                .error(function (error, status, headers, config, statusText) {
                    //console.log("GetUser ERROR: " + JSON.stringify(error));
                    vm.error = 'Error Occurred: Couldn\'t Get User Information!';
                });
            })
            .error(function (error, status, headers, config, statusText) {
                console.log("Login Error: " + JSON.stringify(error));
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