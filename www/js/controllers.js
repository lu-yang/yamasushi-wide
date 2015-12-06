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
			$scope.hotDishes = null;
			return;
		}
		$scope.hotDishes = data.list;
	};
	
	var getColddish = function(){
		GET.url = baseUrl + 'kitchen/cold/orders';
		$http(GET).success(setColddish).error(function(data) {
			alert(data);
		});
	};
	
	var setColddish = function(data) {
		if (!data.list || data.list.length == 0) {
			$scope.coldDishes = null;
			return;
		}
		$scope.coldDishes = data.list;
	};
	
	var getServeddish = function(){
		GET.url = baseUrl + 'kitchen/served/orders';
		$http(GET).success(setServeddish).error(function(data) {
			alert(data);
		});
	};
	
	var setServeddish = function(data) {
		if (!data.list || data.list.length == 0) {
			$scope.servedDishes = null;
			return;
		}
		$scope.servedDishes = data.list;
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

	$scope.cancelServed  = function(id){
		PUT.url = baseUrl + 'order/revert/' + id;

		$http(PUT).success(function(data) {
			setDashboard(data);
		}).error(function(data) {
			alert(data);
		});
	}
	
	var setDashboard = function(data) {
		if (!data) {
			$scope.servedDishes = null;
			$scope.coldDishes = null;
			$scope.hotDishes = null;
			return;
		}
		$scope.coldDishes = data.coldDishes;
		$scope.servedDishes = data.servedDishes;
		$scope.hotDishes = data.hotDishes;
	};
	
	$scope.refresh  = function(){
		GET.url = baseUrl + 'kitchen/dashboard/';
		$http(GET).success(setDashboard).error(function(data) {
			alert(data);
		});
	}
	
	$scope.refresh();
})
