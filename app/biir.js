var biir = angular.module('biir', ['ngRoute']);

biir.config(function($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'app/partials/main.html',
      controller: 'mainController'
    })
    .otherwise({
      redirectTo: '/main'
    });
});
