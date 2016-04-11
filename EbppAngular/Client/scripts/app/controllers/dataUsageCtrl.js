angular.module('dataUsageCtrl', [])
.controller('dataUsageController', function ($rootScope, $location, $scope, DataUsage, AuthToken) {

    var vm = this;
    vm.user = {};
    vm.error = '';

    vm.ActiveEquipmentCheck = function () {
        DataUsage.CheckActiveEquipment()
       .success(function (data) {
           vm.EquipmentCheckMessage = data.resultMessage;
       });
    };

    vm.GetActiveEquipment = function () {
        DataUsage.GetActiveEquipment()
       .success(function (data) {
           vm.user.devices = data.userEquipment;
       });
    };

});