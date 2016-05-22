mainApp.factory('getData', ['$http', '$q', function($http, $q){
	return function(){
		var url = 'http://api.geonames.org/countryInfoJSON?username=lucianogeonames';
		return $http.get(url, {cache : true})
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);

mainApp.factory('getCountry', ['$http', '$q', function($http, $q){
	return function(country){
		country = country.replace(':','');
		var url = 'http://api.geonames.org/countryInfoJSON?country=' + country + '&username=lucianogeonames';
		return $http.get(url)
			.then(function(response){
				return $q.when(response.data);
			});
	};
}]);

mainApp.factory('showCountry', ['$location', function($location){
	return function(country){
		$location.path('countries/:' + country);
	};
}]);