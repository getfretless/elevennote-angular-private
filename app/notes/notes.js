'use strict';

var noteApp = angular.module('myApp.notes', ['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/index.html',
    controller: 'NotesController'
  });
}]);

noteApp.service('NotesBackend', function NotesBackend($http) {
  var elevennoteBasePath = 'http://localhost:3000/api/v1/';
  var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';
  var notes = [];

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    $http.get(elevennoteBasePath+'notes?api_key='+apiKey)
    .success(function(notesData) {
      notes = notesData;
    });
  };

  this.postNote = function(noteData) {
    var _this = this;
    $http.post(elevennoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    })
    .success(function(newNoteData){
      _this.fetchNotes();
    });
  };
});

noteApp.controller('NotesController', function NotesController($scope, $http, $filter, NotesBackend) {
  NotesBackend.fetchNotes();

  $scope.notes = function() {
    return NotesBackend.getNotes();
  };

  $scope.submit = function() {
    NotesBackend.postNote($scope.note);
  };

  $scope.findNote = function(noteID) {
    return $filter('filter')($scope.notes(), { id: noteID }, true)[0];
  };

  $scope.loadNote = function(noteID) {
    $scope.note = this.findNote(noteID);
  };
});