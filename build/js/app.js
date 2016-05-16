var mainApp = angular.module('mainApp', ['ngRoute'])
.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
    });
});
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries", {
		templateUrl : "./countries.html",
		controller : "countriesCtrl"
	});
}])
.controller("countriesCtrl", ["$scope", function($scope){

}]);
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/countries:country", {
		templateUrl : "./country.html",
		controller : "countryCtrl"
	});
}])
.controller("countryCtrl", ["$scope", function($scope){

}]);
mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "./home.html",
		controller : "homeCtrl"
	}).when("/home", {
		templateUrl : "./home.html",
		controller : "homeCtrl"
	})
	.otherwise("/");
}])
.controller("homeCtrl", ["$scope", function($scope){

}]);