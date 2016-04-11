angular.module('dataUsageService', [])

.factory('DataUsage', function ($http, $q) {

    var dataUsageFactory = {};

    dataUsageFactory.CheckActiveEquipment = function () {
        return $http.get(apiHost + 'datausage/activeequipmentcheck/');
    };

    dataUsageFactory.GetActiveEquipment = function () {
        return $http.get(apiHost + 'datausage/getactiveequipment/');
    };

    return dataUsageFactory;

});