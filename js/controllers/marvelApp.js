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


mainApp.controller('homeController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});
