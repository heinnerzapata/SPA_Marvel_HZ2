var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(function($routeProvider){

  $routeProvider
    .when('/home',{
      templateUrl:'js/views/home.html',
      controller  : 'homeController'
    })
    .otherwise({
      redirectTo:'/home'
    });

});



mainApp.controller('homeController',function homeController($scope,$http) {

    $scope.Characters = [];

    $scope.getCharacters = function()
    {

      /*
        https://gateway.marvel.com:443/v1/public/characters/1011334?ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3
        http://gateway.marvel.com/v1/public/characters/1009491?ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3

      */

      $http.get('https://gateway.marvel.com/v1/public/characters?limit=50&ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3').
          then(function(response) {
              $scope.Characters = response.data.data.results;

          });

    }

    $scope.getCharacters();

});
