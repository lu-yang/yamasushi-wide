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
