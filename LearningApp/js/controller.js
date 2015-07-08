// JavaScript Document



//adding angular module				
var myApp = angular.module('myApp',[]);



myApp.controller('MyController', function MyController($scope, $http, $window){
   $scope.count = 0;
   
    //getting the data from json in angular way
	//using success/error callback style
	$http.get('js/data.json').success(function(data){
		$scope.datalist = data;
		 
	
	}).error(function(err){
		throw err;
	});

	angular.element($window).on('resize', function(){
       $scope.$apply();
	})


});

  				
	   
	   