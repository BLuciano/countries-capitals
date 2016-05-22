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
.controller("countryCtrl", ['$scope', 'getCapital', 'countryInfo', 
	function($scope, getCapital, countryInfo){
		var country = countryInfo.geonames[0];
		$scope.country = country;
		
		getCapital(country.countryCode, country.capital)
		.then(function(data){
			angular.forEach(data.geonames, function(value, key){
				if(country.capital === value.name){
					$scope.capitalPop = value.population;
					return;
 				}
			});
			
		});
}]);