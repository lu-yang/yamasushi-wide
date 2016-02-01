angular.module('starter.controllers', [ 'ngResource' ,'customHelpers'])

.controller('pageCtrl', function($scope, $http, $window, $loadingHelpers,$interval,$ionicModal,$location) {


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
			$scope.closeModal();
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

	$scope.reminder = function(id,isHot){
		PUT.url = baseUrl + 'order/reminder' + '/' + id;
		$http(PUT).success(function(data) {
			if(data.model){
				getHotdish();
				getColddish();
				$scope.closeModal();
			}
		}).error(function(data) {
			alert(data);
		});

	}
	$scope.cancelServed  = function(id){
		PUT.url = baseUrl + 'order/revert/' + id;

		$http(PUT).success(function(data) {
			setDashboard(data);
			$scope.closeModal();
		}).error(function(data) {
			alert(data);
		});
	};


	$ionicModal.fromTemplateUrl('templates/modalTpls/list.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openHotModal = function(id,isServed) {
		$scope.modal.show();
		$scope.itemId = id;
		$scope.isServed = isServed;
		$scope.isHot = true;
	};
	$scope.openColdModal = function(id,isServed) {
		$scope.modal.show();
		$scope.itemId = id;
		$scope.isServed = isServed;
		$scope.isHot = false;
	};
	$scope.openServedModal = function(id,isServed) {
		$scope.modal.show();
		$scope.itemId = id;
		$scope.isServed = isServed;
	};
	$scope.closeModal = function(){
		$scope.modal.hide();
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

	$scope.getTimes=function(n){
		return new Array(n);
	};

	$scope.refresh  = function(){

		$loadingHelpers.loadingShow();
		GET.url = baseUrl + 'kitchen/dashboard/';
		$http(GET).success(function(data){
			if(!data){
				console.log('no data');
				$loadingHelpers.loadingHide();
			}else{
				setDashboard(data);
				$loadingHelpers.loadingHide();
			}

		}).error(function(data) {
			alert(data);
			$loadingHelpers.loadingHide();
		});
	}

	$scope.doRefresh = function(){
		$scope.refresh();
		$scope.$broadcast('scroll.refreshComplete');
	};



	 $scope.timeCount = function(){
		 	var t = 30;
		$interval(function () {

			if(t > 1){
				t = t-1;
			}else if(t==1){
				$window.location.reload(true);
				t = 30;
			}
			$scope.t = t;

		}, 1000);
	}


	var init = function(){
		$scope.timeCount();

		GET.url = baseUrl + 'kitchen/dashboard/';
		$http(GET).success(function(data){
			if(!data){
			}else{
				setDashboard(data);
			}
		}).error(function(data) {
			alert(data);

		});
	 }
	init();
})
