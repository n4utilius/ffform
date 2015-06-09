(function () {
  'use strict';

  angular.module('demoApp', ['ui.tree', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'BasicExampleCtrl',
          templateUrl: 'views/basic-example.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }])

})();