'use strict';

define(['angular'],function(angular) {
    angular.module('myApp.directives', [])
        .directive('priceSlider', ['$timeout', function($timeout) {
            return function ($scope, element, attrs) {
                element.slider({
                    range: true,
                    min: parseFloat(attrs.min),
                    max: parseFloat(attrs.max),
                    step: parseFloat(attrs.step),
                    values: [parseFloat(attrs.minsel), parseFloat(attrs.maxsel)],
                    slide: function (event, ui) {
                        $timeout(function(){
                            $scope.maxSelect = ui.values[1]
                            $scope.minSelect = ui.values[0]
                        },0)
                    },
                    change: function(event, ui) {
                        $timeout(function(){
                            $scope[attrs.callback]($scope.maxSelect, $scope.minSelect , [ui.values[0],ui.values[1]]);
                        },0)
                    }
                });
            };
        }])
        .directive('starRating', function() {
            return {
                restrict : 'A',
                template : '<ul class="rating">'
                + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                + '\u2605'
                + '</li>'
                + '</ul>',
                scope : {
                    ratingValue : '=',
                    max : '=',
                    onRatingSelected : '&'
                },
                link : function(scope, elem, attrs) {
                    var updateStars = function() {
                        scope.stars = [];
                        for ( var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled : i < scope.ratingValue
                            });
                        }
                    };

                    scope.toggle = function(index) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating : index + 1
                        });
                    };

                    scope.$watch('ratingValue',
                        function(oldVal, newVal) {
                            updateStars();
                        }
                    );
                }
            };
        })
        .directive('errSrc', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('error', function() {
                        if (attrs.src != attrs.errSrc) {
                            attrs.$set('src', attrs.errSrc);
                        }
                    });
                }
            }
        })
        .directive('whenScrolled', function() {
            return function(scope, elm, attr) {
                var raw = elm[0];

                elm.scroll(function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            };
        })
        .filter('rangeFilter', function() {
            return function( items, rangeInfo ) {
                var filtered = [];
                var min = parseInt(rangeInfo.userMin);
                var max = parseInt(rangeInfo.userMax);
                var type = rangeInfo.type;
                // If time is with the range
                angular.forEach(items, function(item) {
                    if( item[type] >= min && item[type] <= max ) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('greaterThanFilter', function() {
            return function( items, rangeInfo ) {
                var filtered = [];
                var rating = parseInt(rangeInfo.rating);
                var type = rangeInfo.type;
                // If time is with the range
                angular.forEach(items, function(item) {
                    if( item[type] >= rating ) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        });
});