mainApp.factory('getData', ['$http', '$q', function($http, $q){
	return function(){
		var url = 'http://api.geonames.org/countryInfoJSON?username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);