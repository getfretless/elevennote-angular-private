'use strict';

var noteApp = angular.module('myApp.notes', ['ngRoute', 'textAngular']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/index.html',
    controller: 'NotesController'
  });
}]);

noteApp.controller('NotesController', function NotesController($scope, $http, $filter, NotesBackend) {
  NotesBackend.fetchNotes();

  $scope.buttonText = function(note) {
    if (note && note.id) {
      return 'Update Note';
    } else {
      return 'Create Note';
    }
  }

  $scope.notes = function() {
    return NotesBackend.getNotes();
  };

  $scope.submit = function() {
    if ($scope.note.id) {
      NotesBackend.updateNote($scope.note);
    } else {
      NotesBackend.postNote($scope.note);
    }
  };

  $scope.findNote = function(noteID) {
    return $filter('filter')($scope.notes(), { id: noteID }, true)[0];
  };

  $scope.loadNote = function(noteID) {
    $scope.note = this.findNote(noteID);
  };

  $scope.clearNote = function() {
    $scope.note = {};
    document.getElementById('note_title').focus();
  };

  $scope.deleteNote = function() {
    NotesBackend.deleteNote($scope.note);
    this.clearNote();
  };
});