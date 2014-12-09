'use strict';

angular.module('myApp.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/index.html',
    controller: 'NotesCtrl'
  });
}])

.controller('NotesCtrl', [function() {

}]);