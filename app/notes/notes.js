'use strict';

var elevennoteBasePath = 'http://localhost:3000/api/v1/';
var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';

angular.module('myApp.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/index.html',
    controller: 'NotesCtrl'
  });
}])

.controller('NotesCtrl', function NotesCtrl($scope, $http) {
  $http.get(elevennoteBasePath+'notes?api_key='+apiKey)
    .success(function(notes_data) {
      $scope.notes = notes_data;
    });
});