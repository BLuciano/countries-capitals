mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "./home.html"
	}).when("/home", {
		templateUrl : "./home.html"
	})
	.otherwise("/");
}]);