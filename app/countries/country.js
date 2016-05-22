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