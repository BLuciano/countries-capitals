//FACTORIES TESTS

describe('getData', function() {
    beforeEach(module('mainApp'));

    it('should query API and return data',
    inject(function(getData, $rootScope, $httpBackend) {
        var url = 'http://api.geonames.org/countryInfoJSON?username=lucianogeonames';
		var status = false;
        $httpBackend.expect('GET', url).respond(200);
        getData().then(function() {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});

describe('getCountry', function() {
    beforeEach(module('mainApp'));

    it('should query API and return data',
    inject(function(getCountry, $rootScope, $httpBackend) {
        var url = 'http://api.geonames.org/countryInfoJSON?country=US&username=lucianogeonames';
        var status = false;
        $httpBackend.expect('GET', url).respond(200);
        getCountry(':US').then(function() {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});

/*describe('showCountry', function(){
	beforeEach(module('mainApp'));

	it('should change location to specific country page',
	inject(function(showCountry, $location, $rootScope){
		$rootScope.$apply(function() {
        	$location.path('/countries:US');
        });
		showCountry('US');
		$rootScope.$digest();
		expect($location.path).toBe('/countries/'); 
	}));
});*/

describe('getCapital', function() {
    beforeEach(module('mainApp'));

    it('should query API and return data',
    inject(function(getCapital, $rootScope, $httpBackend) {
        var url = 'http://api.geonames.org/searchJSON?&q=UnitedStates' +
		'&name_equals=UnitedStates&isNameRequired=true&country=US' + 
		'&style=LONG&username=lucianogeonames';
        var status = false;
        $httpBackend.expect('GET', url).respond(200);
        getCapital('US', 'UnitedStates').then(function() {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});

describe('getNeighbors', function() {
    beforeEach(module('mainApp'));

    it('should query API and return data',
    inject(function(getNeighbors, $rootScope, $httpBackend) {
        var url = 'http://api.geonames.org/neighboursJSON?country=US&username=lucianogeonames';
        var status = false;
        $httpBackend.expect('GET', url).respond(200);
        getNeighbors('US').then(function() {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});

//ROUTES TESTS
describe("mainApp", function() {
    beforeEach(module("mainApp"));

    describe("/ route", function() {
        it('should load template',
        inject(function($location, $rootScope, $httpBackend, $route) {
        	$httpBackend.whenGET('./home.html').respond(200);
            $rootScope.$apply(function() {
                $location.path('/');
            });
            $httpBackend.flush();
            expect($route.current.loadedTemplateUrl).toBe("./home.html");
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }));
    });

    describe("/home route", function() {
        it('should load template',
        inject(function($location, $rootScope, $httpBackend, $route) {
        	$httpBackend.whenGET('./home.html').respond(200);
            $rootScope.$apply(function() {
                $location.path('/home');
            });
            $httpBackend.flush();
            expect($route.current.loadedTemplateUrl).toBe("./home.html");
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }));
    });

    describe("/countries route", function() {
        it('should load template and controllew',
        inject(function($location, $rootScope, $httpBackend, $route) {
        	$httpBackend.whenGET('./countries.html').respond(200);
            $rootScope.$apply(function() {
                $location.path('/countries');
            });
            $httpBackend.flush();
            expect($route.current.controller).toBe('countriesCtrl');
            expect($route.current.loadedTemplateUrl).toBe("./countries.html");
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }));
    });

   describe("/countries/: route", function() {
        it('should load template, controller and resolve variable',
        module(function($provide) {
            $provide.value('getCountry', function(value) {
                return value;
            });
        }),

        inject(function($location, $rootScope, $httpBackend, $route) {
        	$httpBackend.whenGET('./country.html').respond(200);

            $rootScope.$apply(function() {
                $location.path('/countries/:US');
            });
            $httpBackend.flush();
            expect($route.current.controller).toBe('countryCtrl');
            expect($route.current.loadedTemplateUrl).toBe("./country.html");
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }));
    });
});

//CONTROLLERS TESTS
