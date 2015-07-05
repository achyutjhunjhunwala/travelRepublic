/*global module, inject */
'use strict';

define(['app', 'angularMocks'], function(app) {
	describe('myApp.search module', function() {

		beforeEach(module('myApp.search'));

		describe('search controller', function(){

			it('should ....', inject(function($controller) {
			//spec body
			var view2Ctrl = $controller('View2Ctrl', { $scope: {} });
			expect(view2Ctrl).toBeDefined();
		}));

		});
	});
});