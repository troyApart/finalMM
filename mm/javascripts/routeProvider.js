var microManager = angular.module('microManager', []);

microManager.config(function ($routeProvider) {
    $routeProvider
        .when('/landing',
            {
                controller: '',
                templateUrl: 'mm/partials/landing.html'
            })
        .when('/app',
            {
                controller: 'appController',
                templateUrl: 'mm/partials/app.html'
            })
        .when('/update',
            {
                controller: '',
                templateUrl: 'mm/partials/update.html'
            })
        .otherwise({ redirectTo: '/landing' });
});