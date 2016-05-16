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