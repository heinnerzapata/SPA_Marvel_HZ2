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


mainApp.factory('comicFavorite', function() {
    
    var obj = [
      //{name:,img:image}
    ];      

    return {getComicFavorite:function(){return obj;}};
});


mainApp.controller('homeController',function homeController($scope,$http) {

    $scope.Characters = [];
    $scope.Search = '';
    $scope.filterOrder = 'name';

    $scope.favComics = [];

    
   
    //Comic data
    
    $scope.addFavorite = function(name,image){
       
       $scope.favComics.push({"name":name,"img":image});

    }


    $scope.getComic = function(filter){
       
       var str = filter;
       var res = str.split("/");

       $scope.modalComicId = res[6];

       var url = 'https://gateway.marvel.com:443/v1/public/comics/';
       var ApiKey = 'ts=1&apikey=3ea1cd1673639f6a528e957b1db5939b&hash=cfa3f7936bc2ccd074e8876351bcffa3';
       var namefilter = $scope.modalComicId + '?';

       $http.get(url+namefilter+ApiKey).
          then(function(response) {

              $scope.modalComicTitle = response.data.data.results[0].title;
              $scope.modalComicDesc = response.data.data.results[0].description;
              $scope.modalComicPrice = response.data.data.results[0].prices[0].price;
              $scope.modalComicImg = response.data.data.results[0].thumbnail.path + '.' + response.data.data.results[0].thumbnail.extension;
              
              $("#btnTest").click();
              
          });
    
       
       

    }

    $scope.newSearch = function(filter){
      $scope.getCharacters(filter);
    }

    $scope.getCharacters = function(filter)
    {

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
