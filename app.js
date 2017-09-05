// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($routeProvider){
	$routeProvider
	
		.when('/', {
			templateUrl: 'pages/home.htm',
			controller: 'homeController'
		})
		
		.when('/forecast', {
			templateUrl: 'pages/forecast.htm',
			controller: 'forecastController'
		})
		
		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.htm',
			controller: 'forecastController'
		})
});

// SERVICES

weatherApp.service('cityService', function(){
	
	this.city = "Ahmedabad, IN";
});


// CONTROLLERS
weatherApp.controller('homeController', ['$scope',  'cityService', '$location', function($scope, cityService, $location) {
	
		$scope.city = cityService.city;
		
		$scope.$watch('city', function(){
			cityService.city = $scope.city;
		})
		
		$scope.submit = function(){
			$location.path("/forecast")
		};
		
			
    
}]);


weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams) {
		
		$scope.city = cityService.city;
		
		$scope.days = $routeParams.days || '2';
		
		$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=f429911348202563cf2e9d6c2b18058b");
		
		$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});
		
		$scope.convertToFarenheit = function(degK){
			return Math.round((1.8 * (degK - 273)) + 32);
		}
		
		$scope.convertToDate = function(dt){
			return new Date(dt * 1000);
		}
		
		
    
}]);


// DIRECTIVES

weatherApp.directive('weatherReport', function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.htm',
		replace: true,
		scope: {
			weatherDay: "=",
			convertToStandard: '&',
			convertToDate: '&',
			dateFormat: '@'
		}
	}
});
