'use strict';

define([
	'angular',
	'angularRoute',
	'sanitize',
	'search/searchView',
	'service/searchService',
	'directives/searchDirectives'
], function(angular, angularRoute, sanitize, view1, searchService, searchDirectives) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'ngSanitize',
		'myApp.search',
		'myApp.service',
		'myApp.directives'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/search'});
	}]);
});

