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
.controller("countriesCtrl", ['$scope', 'getData', '$q', function($scope, getData, $q){
	getData()
		.then(function(data){
			return $q.when(data);
		})
		.then(function(){
			$scope.data = data;
			console.log($scope.data);
		});
}]);
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries:country", {
		templateUrl : "./country.html",
		controller : "countryCtrl"
	});
}])
.controller("countryCtrl", ["$scope", function($scope){

}]);
mainApp.factory('getData', ['$http', '$q', function($http, $q){
	return function(){
		var url = 'http://api.geonames.org/countryInfo?username=lucianogeonames';
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