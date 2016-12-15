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
    
    $scope.removeComic = function(name){

      var i=0;
      var isInArray=false;

      for(i=0;i<$scope.favComics.length;i++)
       {
          if($scope.favComics[i].name == name){
            $scope.favComics.splice(i,1);

          if (typeof(Storage) !== "undefined") 

            localStorage.setItem("comic" + String($scope.favComics.length), '-1');

            break;
          }
       }

    }    

    $scope.addFavorite = function(name,image){
       
       var i=0;
       var isInArray=false;

       
       for(i=0;i<$scope.favComics.length;i++)
       {
          if($scope.favComics[i].name == name){
            isInArray = true;
            break;
          }
       }
       


       if(!isInArray && $scope.favComics.length <= 2){

        $scope.favComics.push({"name":name,"img":image});

        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("comic" + String($scope.favComics.length), name+'$'+image);

       }

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

    // Read Localstorage
    if (typeof(Storage) !== "undefined") {

      var j=0;
      for(j=0;j<localStorage.length;j++){

          var strObj = "comic" + (j + 1).toString();
          var strComic = localStorage.getItem(strObj);
          var res = strComic.split("$"); 


          if(res.length > 0 && res[1] != '-1' && res[1] != '')
            $scope.favComics.push({"name":res[0],"img":res[1]});
 


      }        

    }

});
