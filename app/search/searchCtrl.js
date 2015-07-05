'use strict';

define([], function() {
	return ['$scope', '$filter', '$timeout', '$routeParams','FetchHotelsDataService','$location', function($scope, $filter,
																							   $timeout, $routeParams,
																							   FetchHotelsDataService,
																							   $location) {
		// You can access the scope of the controller from here
		$scope.loadingData = false;
		$scope.minPriceRange = 0
		$scope.maxPriceRange = 1000;
		$scope.minAmountRange = 0;
		$scope.maxAmountRange = 10;
		$scope.rating = 0;
		$scope.pageIndex = 0;
		$scope.pageSize = 10;
		$scope.numberOfPages ;
		$scope.filterCondition ;


		$scope.priceSelection = function (maxSelect, minSelect, range) {
			console.log(maxSelect, minSelect, range);
			$scope.minPriceRange = minSelect;
			$scope.maxPriceRange = maxSelect;
			var rangeData = {};
			rangeData.userMin = minSelect;
			rangeData.userMax = maxSelect;
			rangeData.type = "MinCost";
			$scope.filterResults = $filter('rangeFilter')($scope.dataForInfiniteScroll, rangeData);
			$scope.reLoadPage($scope.filterResults);
			$scope.dataForInfiniteScroll=$scope.filterResults;


			//loadPage();
		};

		$scope.userRatingSelection = function (maxSelect, minSelect, range) {
			$scope.minAmountRange = minSelect;
			$scope.maxAmountRange = maxSelect;
			var rangeData = {};
			rangeData.userMin = minSelect;
			rangeData.userMax = maxSelect;
			rangeData.type = "UserRating";
			$scope.filterResults = $filter('rangeFilter')($scope.dataForInfiniteScroll, rangeData);
			$scope.reLoadPage($scope.filterResults);
			$scope.dataForInfiniteScroll=$scope.filterResults;

			//loadPage();
		};

		$scope.starRating = function(rating) {
			$scope.filterResults = $filter('filter')($scope.dataForInfiniteScroll, {'Stars':rating});
			$scope.reLoadPage($scope.filterResults);
			$scope.dataForInfiniteScroll=$scope.filterResults;
		};

		$scope.sortByClk = function($event,sort) {
			$event.preventDefault();
			$scope.dataForInfiniteScroll = $filter('orderBy')($scope.dataForInfiniteScroll, sort);
			$scope.reLoadPage($scope.dataForInfiniteScroll);
		};

		$scope.sortByTripRating = function(rating) {
			var rangeData = {};
			rangeData.rating = rating;
			rangeData.type = "TrpRating";
			$scope.dataForInfiniteScroll = $filter('greaterThanFilter')($scope.dataForInfiniteScroll, rangeData);
			$scope.reLoadPage($scope.dataForInfiniteScroll);
		},

		$scope.sortByHotelName = function(hotelName) {
			$scope.filterResults = $filter('filter')($scope.dataForInfiniteScroll, {'Name':hotelName});
			$scope.reLoadPage($scope.filterResults);
			$scope.dataForInfiniteScroll=$scope.filterResults;
		},

			FetchHotelsDataService.fetch($routeParams.searchTerm).then(function(result){
				$scope.searchResultOriginal = result.Establishments;
				$scope.numberOfPages = $scope.searchResultOriginal.length/10;
				$scope.dataForInfiniteScroll = $scope.searchResultOriginal;
				$scope.reLoadPage($scope.searchResultOriginal);
				$scope.UniqueNames($scope.dataForInfiniteScroll);
			});

		$scope.UniqueNames = function(data) {
			$scope.uNames = [];

			$.each(data, function(index, value) {
				if ($.inArray(value.Name, $scope.uNames) === -1) {
					$scope.uNames.push(value.Name);
				}
			});
		},

		$scope.reLoadPage = function (searchResults) {
			$scope.searchResult = $scope.sliceData(searchResults, 0);
			//$scope.UniqueNames(searchResults);

		},

		$scope.sliceData = function (array, start) {
			if (array != undefined) {
				var slicedArray = array.slice(start);
				return $filter("limitTo")(slicedArray, $scope.pageSize);
			}
		},

		$scope.handleInfiniteScroll = function () {
			$scope.loadingData = true;
			$timeout(function() {
				$scope.pageIndex != $scope.numberOfPages - 1 ? ++$scope.pageIndex : null;
				$scope.startProduct = $scope.pageIndex * $scope.pageSize;
				$scope.paginatedData = $scope.sliceData($scope.dataForInfiniteScroll, $scope.startProduct);
				$scope.searchResult = $scope.searchResult.concat($scope.paginatedData);
				$scope.loadingData = false;
			},1000);

		}

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});