var mainApp = angular.module('mainApp', ['ngRoute'])
	.run(function($rootScope, $location) {
    	$rootScope.$on('$routeChangeError', function() {
        	$location.path('/');
    	});
	})
	.config(function($httpProvider) {
    	$httpProvider.defaults.useXDomain = true;
    	delete $httpProvider.defaults.headers.common['X-Requested-With'];
  	});
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries", {
		templateUrl : "./countries.html",
		controller : "countriesCtrl"
	});
}])
.controller("countriesCtrl", ['$scope', 'getData', 'showCountry', 
	function($scope, getData, showCountry){
	
	getData()
	.then(function(data){
		$scope.countries = data.geonames;
	});

	$scope.showCountry = showCountry;
}]);
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries/:country", {
		templateUrl : "./country.html",
		controller : "countryCtrl",
		resolve : {
      		countryInfo : ['getCountry', '$route', function(getCountry, $route) {
        	return getCountry($route.current.params.country);
        }]}
    });
}])
.controller("countryCtrl", ['$scope', 'showCountry', 'countryInfo', 
	function($scope, showCountry, countryInfo){
		$scope.country = countryInfo.geonames[0];
}]);
mainApp.factory('getData', ['$http', '$q', function($http, $q){
	return function(){
		var url = 'http://api.geonames.org/countryInfoJSON?username=lucianogeonames';
		return $http.get(url, {cache : true})
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);

mainApp.factory('getCountry', ['$http', '$q', function($http, $q){
	return function(country){
		country = country.replace(':','');
		var url = 'http://api.geonames.org/countryInfoJSON?country=' + country + '&username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);

mainApp.factory('showCountry', ['$location', function($location){
	return function(country){
		$location.path('countries/:' + country);
	};
}]);
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "./home.html"
	}).when("/home", {
		templateUrl : "./home.html"
	})
	.otherwise("/");
}]);