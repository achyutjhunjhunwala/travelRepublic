'use strict';

require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		angularMocks: 'bower_components/angular-mocks/angular-mocks',
		text: 'bower_components/requirejs-text/text',
		sanitize: 'bower_components/angular-sanitize/angular-sanitize',
		jquery: 'bower_components/jquery/jquery',
		jqueryui: 'bower_components/jquery-ui/ui/jquery-ui'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'sanitize' : ['angular'],
		'jqueryui' : {exports: "$", deps:['jquery']},
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});

require([
	'angular',
	'jquery',
	'jqueryui',
	'app'
	], function(angular, $, jqueryui, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);