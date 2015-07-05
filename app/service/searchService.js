'use strict';

define(['angular'],function(angular) {
    angular.module('myApp.service', [])
        .factory('FetchHotelsDataService', ['$q', '$http', function ($q, $http) {
            var fhdAPI = {
                fetch: function (searchText) {
                    var deferred = $q.defer();
                    $http({
                        url: "mock_data/hotels1.json",
                        method: "GET"
                    }).success(function (response) {
                        deferred.resolve(response);
                    }).error(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
            return fhdAPI;
        }])
    });