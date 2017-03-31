 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

 var app=angular.module('search',[]);
 app.controller('searchHotels',function($scope,$http){
 	console.log("hi");
 	var str1="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
 	var str2="&type=lodging&key=AIzaSyBXmAQo752-dXxxWiFgVGQf7Mv3BTwj7PY"; //API key

 	$scope.search = function()
 	{
 		console.log("Inside");
	 	$http.get(str1+$scope.query+str2)
	 	.then(function(response){
	 		console.log(response.data.results);
	 		$scope.searchResults=response.data.results;
	 	});
	 }
	 
 });