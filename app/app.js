'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.notes',
  'myApp.login'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/notes'});
}]);


app.service('NotesBackend', function NotesBackend($http) {
  var elevennoteBasePath = 'http://localhost:3000/api/v1/';
  // var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';
  var notes = [];
  // var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';
  // var api_key = '';
  var apiKey = '';

  this.getApiKey = function() {
    return apiKey;
  };

  this.fetchApiKey = function(user, callback) {
    var _this = this;
    $http.post(elevennoteBasePath+'session', {
      user: {
        username: user.username,
        password: user.password
      }
    }).success(function(data){
      console.log('got api key');
      apiKey = data.api_key;
      _this.fetchNotes();
      callback();
    });
  };

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    if (apiKey !== '') {
      $http.get(elevennoteBasePath+'notes?api_key='+apiKey)
      .success(function(notesData) {
        notes = notesData;
      });
    }
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

  this.updateNote = function(note) {
    var _this = this;
    $http.put(elevennoteBasePath + 'notes/' + note.id, {
      api_key: apiKey,
      note: note
    }).success(function(newNoteData){
      _this.fetchNotes();
    });
  };

  this.deleteNote = function(note) {
    var _this = this;
    $http.delete(elevennoteBasePath + 'notes/' + note.id + '?api_key=' + apiKey)
    .success(function(newNoteData){
      _this.fetchNotes();
    });
  };
});
