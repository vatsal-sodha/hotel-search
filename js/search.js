$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

     $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  });
var app=angular.module('search',[]);
 app.controller('searchHotels',function($scope,$http){

// get query value from url
 	var temp=window.location.href;
 	temp=temp.split('?');
 	temp=temp[1].toString();
 	temp=temp.split('=');
 	$scope.query=temp[1].toString();

 	console.log($scope.query);

 	var searchPlace="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
 	var searchKey="&type=lodging&key=AIzaSyBXmAQo752-dXxxWiFgVGQf7Mv3BTwj7PY"; //API key
 	var displayImage="data:image/JPEG;base64,";
	var image="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
 	var	imageKey="&key=AIzaSyBXmAQo752-dXxxWiFgVGQf7Mv3BTwj7PY";
 	$scope.search = function()
 	{
 		console.log("Inside");
 		$scope.displayImage=displayImage;
 		$scope.imageUrl=image;
 		$scope.imageKey=imageKey;
	 	$http.get(searchPlace+$scope.query+searchKey)
	 	.then(function(response){
	 		console.log(response.data.results);
	 		$scope.searchResults=response.data.results;
	 		$scope.searchResults=$scope.searchResults.slice(0,8);
	
	 		// get image url
	 		

	 	});
	 }
	 if($scope.query != "")
 	{
 		$scope.search();
 	}
	 $scope.searchFromIndex=function()
	 {
	 	$scope.query=$scope.query;
	 	console.log("from index");
	 	window.location.href="search.html";
	 	$scope.search();
	 }
	 
 });
 app.controller('signupValidation',function($scope,$http){

 	$scope.signupResponse="";
 	console.log($scope.email);

 	$scope.checkUsername=function(){
 		$scope.signupResponse="Checking";
	 	$http.get("api/signup.php?email_id="+$scope.email)

	 	.then(function(response)
	 	{
	 		console.log(response);
	 		if(response.data == "1")//unique username
	 		{
	 			$scope.signupResponse="Unique username";
	 		}
	 		else if(response.data == "-1")
	 		{
	 			$scope.signupResponse="Username already exists";
	 		}
	 	});
 
	}
});
	app.controller('login',function($scope,$http){

	$scope.isLogin=function(){
		data={
			'email':$scope.emailLogin,
			'password':$scope.passwordLogin
		};
		console.log(data);
		$http.post("api/login.php",data)
		.then(function(response){
			console.log(response);
				if(response.data == "1"){
					setSession($scope.emailLogin);
					alert("Logged in");
				}
			else if(response.data == "-1"){
				alert("Invalid Credentials");
				// window.location.href="index.html";
			}
		})
	}
});

app.controller("navbar",function($scope){

	$scope.checkLogin=function(){
		  if(localStorage.getItem('userName') !== null){
		  	$scope.userName=localStorage.getItem('userName');
		  	return false;
		  }
		  else{
		  	return true;
		  }
	}

	$scope.logout=function(){
		console.log("inside logout");
		if(localStorage.getItem('userName') !== null){
		  	localStorage.removeItem('userName');
		  	alert('Succesfully Logout');
		  	// window.location.href="index.html"
		 }

	}
});

app.controller('book',function($scope){

	$scope.isBook=function(){
		
	}
})