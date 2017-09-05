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
weatherApp.controller('homeController', ['$scope',  'cityService', function($scope, cityService) {
	
		$scope.city = cityService.city;
		
		$scope.$watch('city', function(){
			cityService.city = $scope.city;
		})
		
		
			
    
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
