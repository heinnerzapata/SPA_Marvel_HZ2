var mainApp = angular.module('mainApp',['ngRoute','angularUtils.directives.dirPagination']);

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
    $scope.Search = '';
    $scope.filterOrder = 'name';

    $scope.newSearch = function(filter){
      $scope.getCharacters(filter);
    }

    $scope.getCharacters = function(filter)
    {

      /*
        https://gateway.marvel.com:443/v1/public/characters/1011334?ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3
        http://gateway.marvel.com/v1/public/characters/1009491?ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3

      */

      var url = 'https://gateway.marvel.com/v1/public/characters?';
      var ApiKey = 'ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3';
      var namefilter = '';

      if(filter != '')
        namefilter = 'nameStartsWith=' + filter + '&';

     
      var limit = 'limit=50&';


      $http.get(url+namefilter+limit+ApiKey).
          then(function(response) {
              $scope.Characters = response.data.data.results;

          });

    }

    $scope.getCharacters('');

});
