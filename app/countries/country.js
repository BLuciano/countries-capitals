mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries:country", {
		templateUrl : "./country.html",
		controller : "countryCtrl"
	});
}])
.controller("countryCtrl", ["$scope", function($scope){

}]);