angular.module('starter', ['ionic', 'starter.controllers' ])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    cache:false,
    url : "/app",
    abstract : true,
    templateUrl : "templates/menu.html"
  })
  .state('app.tabs',{
  	url:"/tabs",
  	views : {
  		"menuContent":{
  			templateUrl :"templates/tabs.html"
  		}
  	}
  })
  .state('app.tabs.list', {
    cache:false,
    url: '/list',
    views : {
      'tab-list' : {
        templateUrl: 'templates/list.html',
        controller: 'pageCtrl'
      }
    }
  })
  .state('app.tabs.orderHistory', {
    cache:false,
    url: '/history',
    views : {
      'tab-history' : {
        templateUrl: 'templates/history.html',
        controller: 'pageCtrl'
      }
    }
  })
  ;



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tabs/list');

});
