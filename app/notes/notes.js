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

noteApp.service('NotesBackend', function NotesBackend($http) {
  var notes = [];

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    $http.get(elevennoteBasePath+'notes?api_key='+apiKey)
    .success(function(notes_data) {
      notes = notes_data;
    });
  };

  this.postNote = function(note_data, callback) {
    $http({
      method: 'POST',
      url: elevennoteBasePath + 'notes',
      data: {
        api_key: apiKey,
        note: note_data
      }})
    .success(function(note_data){
      callback();
    });
  };
});

noteApp.controller('NotesCtrl', function NotesCtrl($scope, $http, $timeout, NotesBackend) {
  NotesBackend.fetchNotes();

  $scope.notes = function() {
    return NotesBackend.getNotes();
  };

  $scope.bodyHtml = 'This is the body';

  $scope.submit = function() {
    var note = {
      title: 'SuperCool Note',
      body_html: 'THIS IS AWESOME'
    };
    NotesBackend.postNote(note, function(){
      $scope.notes();
    });
  };
});