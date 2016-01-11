angular.module('customHelpers',['ngResource' ])
.factory('$loadingHelpers',['$ionicPopup','$state','$ionicLoading','$resource',function($ionicPopup,$state,$ionicLoading,$scope){
  return {
    loadingShow : function (){
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    },
    loadingHide : function (){
      $ionicLoading.hide();
    }
  }

}])
.factory('$localStorage', [ '$window', function($window) {
	return {
		set : function(key, value) {
			$window.localStorage[key] = value;
		},
		get : function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject : function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject : function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	}
} ]);
