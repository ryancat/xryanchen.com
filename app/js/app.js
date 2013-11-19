'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

app
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/homepage.html', controller: 'HomepageController'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/bar-chart', {templateUrl: 'partials/barChart.html', controller: 'BarChartController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


app.value({"cssBaseUrl": "app/css"});