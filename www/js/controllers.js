angular.module('starter.controllers', [ 'ngResource' ,'customHelpers'])

.controller('pageCtrl', function($scope, $http, $window, $loadingHelpers,$interval,$ionicModal,$location) {


	var getCombo = function(){
		GET.url = baseUrl + 'kitchen/combo/orders';
		$http(GET).success(setCombo).error(function(data) {
			alert(data);
		});
	};

	var setCombo = function(data) {
		if (!data.list || data.list.length == 0) {
			$scope.combos = null;
			return;
		}
		$scope.combos = data.list;
	};

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

	var done = function(orderId, type, productId, setter){
		PUT.url = baseUrl + 'order/serve/'+type + '/' + orderId + '/' + productId;

		$http(PUT).success(function(data) {
			setter(data);
			$scope.closeModal();
		}).error(function(data) {
			alert(data);
		});
	};

	$scope.orderDone  = function(orderId, type, productId){
		switch(type) {
			case 0:
				done(orderId, 'cold', productId, setColddish);
				break;
			case 1:
				done(orderId, 'hot', productId, setHotdish);
				break;
//			case 2:
//				done(orderId, 'combo', productId, setCombo);
//				break;
			default:
				alert("没有这个类型。");
		}
	};
	
	$scope.reminder = function(id){
		PUT.url = baseUrl + 'order/reminder' + '/' + id;
		$http(PUT).success(function(data) {
			if(data.model){
				getDashboard();
				$scope.closeModal();
			}
		}).error(function(data) {
			alert(data);
		});

	}
	$scope.cancelServed  = function(id){
		PUT.url = baseUrl + 'order/revert/'  + orderId + '/' + productId;
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

	$scope.openModal = function(orderId, isServed, type, productId) {
		$scope.modal.show();
		$scope.orderId = orderId;
		$scope.isServed = isServed;
		$scope.type = type;
		$scope.productId = productId;
	};

	$scope.openServedModal = function(orderId, isServed, productId) {
		$scope.modal.show();
		$scope.orderId = orderId;
		$scope.isServed = isServed;
		$scope.productId = productId;
	};
	$scope.closeModal = function(){
		$scope.modal.hide();
	}
	var setDashboard = function(data) {
		if (!data) {
			$scope.servedDishes = null;
			$scope.coldDishes = null;
			$scope.hotDishes = null;
			$scope.combos = null;
			return;
		}
		$scope.coldDishes = data.coldDishes;
		$scope.servedDishes = data.servedDishes;
		$scope.hotDishes = data.hotDishes;
		$scope.combos = data.combos;
	};

	$scope.getTimes=function(n){
		return new Array(n);
	};
	
	$scope.getProduct = function(orderProductGroup){
		var product = orderProductGroup.order.product;
		if(product.type == 2){
			product = orderProductGroup.product;
		}
		return product;
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
		var t = 300;
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

	var getDashboard = function(){
		GET.url = baseUrl + 'kitchen/dashboard/';
		$http(GET).success(setDashboard).error(function(data) {
			alert(data);
		});
	};

	var init = function(){
		$scope.timeCount();

		getDashboard();
	 }
	init();
})
