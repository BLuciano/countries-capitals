var mainApp = angular.module('mainApp', ['ngRoute'])
.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
    });
});