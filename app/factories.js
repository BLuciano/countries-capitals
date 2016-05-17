mainApp.factory('getData', ['$http', '$q', function($http, $q){
	return function(){
		var url = 'http://api.geonames.org/countryInfo?username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);