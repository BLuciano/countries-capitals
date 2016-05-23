var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate'])
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
.controller("countriesCtrl", ['$scope', 'getData', 'showCountry', '$rootScope',
'$timeout', function($scope, getData, showCountry, $rootScope, $timeout){
	$rootScope.loading = true;
	
	getData()
	.then(function(data){
		$scope.countries = data.geonames;
		$timeout(function() {
        	$rootScope.loading = false;
      	}, 1000);
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
.controller("countryCtrl", ['$scope', 'getCapital', 'getNeighbors', 'countryInfo', 
	function($scope, getCapital, getNeighbors, countryInfo){
		var country = countryInfo.geonames[0];
		$scope.country = country;
		
		getCapital(country.countryCode, country.capital)
		.then(function(data){
			for(var i = 0; i < data.geonames.length; i++){
				if(country.capital === data.geonames[i].name){
					$scope.capitalPop = data.geonames[i].population;
					break;
 				}
			}
		});

		getNeighbors(country.countryCode)
		.then(function(data){
			$scope.neighbors = data.geonames;
		});
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

mainApp.factory('getCapital', ['$http', '$q', function($http, $q){
	return function(code, capital){
		var url = 'http://api.geonames.org/searchJSON?&q=' + capital +
		'&name_equals=' + capital + '&isNameRequired=true&country=' + 
		code + '&style=LONG&username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);

mainApp.factory('getNeighbors', ['$http', '$q', function($http, $q){
	return function(code){
		var url = 'http://api.geonames.org/neighboursJSON?country=' + code + '&username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
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