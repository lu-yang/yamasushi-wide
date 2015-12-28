angular.module('starter.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

var baseUrl = 'http://192.168.2.2:8080/santhiya/';
var authorization = 'YWRtaW46cGFzMndvcmQ=';
var locale = 'fr';

var REQ = {
	headers : {
		'Authorization' : 'Basic ' + authorization
	}
};
var GET = {
	method : 'GET'
};
angular.extend(GET, REQ);
var POST = {
	method : 'POST'
};
angular.extend(POST, REQ);

var PUT = {
	method : 'PUT'
};
angular.extend(PUT, REQ);
