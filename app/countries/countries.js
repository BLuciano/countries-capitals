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