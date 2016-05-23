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