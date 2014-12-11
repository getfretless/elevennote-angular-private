'use strict';

var elevennoteBasePath = 'http://localhost:3000/api/v1/';
var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';

var noteApp = angular.module('myApp.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/index.html',
    controller: 'NotesCtrl'
  });
}]);

noteApp.controller('NotesCtrl', function NotesCtrl($scope, $http, $timeout) {
  $scope.notes = [];
  $scope.$watch('notes', function(){
    console.log('notes updated');
  });

  $http.get(elevennoteBasePath+'notes?api_key='+apiKey)
    .success(function(notes_data) {
      $scope.notes = notes_data;
    });

  $scope.body_html = 'This is the body';
  $scope.submit = function() {
    console.log('submitting');
    $http({
      method: 'POST',
      url: elevennoteBasePath + 'notes',
      data: {
        api_key: apiKey,
        note: {
          title: 'Title',
          body_html: 'Body HTML'
        }
      }})
      .success(function(note_data){
        console.log(note_data);
        console.log($scope.notes);
        $scope.notes = $scope.notes.concat(note_data);
      });
  }
});