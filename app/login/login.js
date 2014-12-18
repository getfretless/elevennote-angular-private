'use strict';

var loginApp = angular.module('myApp.login', ['ngRoute']);

loginApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}]);

loginApp.service('SessionBackend', function SessionBackend($http) {
  var elevennoteBasePath = 'http://localhost:3000/api/v1/';
  var apiKey = '$2a$10$5GO4Gw5d9Snpy.KfhHDhJesJ4XKZ7iCTJaeUO0D0Z51T586TEbUTa';
  var user;

  this.fetchUser = function(user) {
    $http.post(elevennoteBasePath+'session', {
      user: {
        username: user.username,
        password: user.password
      }
    }).success(function(userData){
      console.log('got user');
      user = userData;
    });
  };
});

loginApp.controller('LoginController', function LoginController($scope, $location, SessionBackend) {
  $scope.user = {};
  $scope.submit = function() {
    SessionBackend.fetchUser($scope.user);
  };
});