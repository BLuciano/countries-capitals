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