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