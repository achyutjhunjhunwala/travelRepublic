'use strict';

define([
	'angular',
	'angularRoute',
	'sanitize'
], function(angular) {
	angular.module('myApp.search', ['ngRoute', 'ngSanitize'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/search', {
			templateUrl: 'search/searchView.html',
			controller: 'searchCtrl'
		});
	}])
	// We can load the controller only when needed from an external file
	.controller('searchCtrl', ['$scope', '$injector','$routeParams','FetchHotelsDataService','$location',
			function($scope, $injector, $routeParams,FetchHotelsDataService,$location) {
		require(['search/searchCtrl'], function(ctrl2) {
			// injector method takes an array of modules as the first argument
			// if you want your controller to be able to use components from
			// any of your other modules, make sure you include it together with 'ng'
			// Furthermore we need to pass on the $scope as it's unique to this controller
			$injector.invoke(ctrl2, this, {'$scope': $scope, '$routeParams':$routeParams,
				'FetchHotelsDataService':FetchHotelsDataService, '$location':$location});
		});
	}]);
});