angular.module('dataUsageCtrl', [])
.controller('dataUsageController', function ($rootScope, $location, $scope, DataUsage, AuthToken) {

    var vm = this;
    vm.user = {};
    vm.error = '';

    vm.ActiveEquipmentCheck = function () {
        DataUsage.CheckActiveEquipment()
       .then(function (response) {
           vm.EquipmentCheckMessage = response.data.resultMessage;
           throw "SAMPLE EXCEPTION!!!!!";
       }, function (error) {
           //console.log("CheckActiveEquipment Error: " + JSON.stringify(error));
           vm.error = 'Error Occurred: Unable to retrieve usage data!';
       });
    };

    vm.GetActiveEquipment = function () {
        DataUsage.GetActiveEquipment()
       .then(function (response) {
           vm.user.devices = response.data.userEquipment;
       }, function (error) {
           //console.log("CheckActiveEquipment Error: " + JSON.stringify(error));
           vm.error = 'Error Occurred: Unable to retrieve usage data!';
       });
    };

});