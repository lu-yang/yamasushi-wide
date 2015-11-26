angular.module('app.controllers', [ 'ngResource' ])

.controller('pageCtrl', function($scope, $http) {
	
	var getHotdish = function(){
		GET.url = baseUrl + 'kitchen/hot/orders';

		$http(GET).success(setHotdish).error(function(data) {
			alert(data);
		});
	};
	
	var setHotdish = function(data) {
		if (!data.list || data.list.length == 0) {
			$scope.hotdishes = null;
			return;
		}
		$scope.hotdishes = data.list;
	};
	
	var getColddish = function(){
		GET.url = baseUrl + 'kitchen/cold/orders';
		$http(GET).success(setColddish).error(function(data) {
			alert(data);
		});
	};
	
	var setColddish = function(data) {
		if (!data.list || data.list.length == 0) {
			$scope.colddishes = null;
			return;
		}
		$scope.colddishes = data.list;
	};
	
	var done = function(id, type, setter){
		PUT.url = baseUrl + 'order/serve/'+type + '/' + id;

		$http(PUT).success(function(data) {
			setter(data);
		}).error(function(data) {
			alert(data);
		});
	};
	
	$scope.coldDone  = function(id){
		done(id, 'cold', setColddish);
	};
	
	$scope.hotDone  = function(id){
		done(id, 'hot', setHotdish);
	}
	
	$scope.refresh  = function(){
		getColddish();
		getHotdish();
	}
	
	
	getColddish();
	getHotdish();
})
