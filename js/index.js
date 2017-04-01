 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
 function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
function checkPassword(str)
{
    var password=$("#password").val();
    if(str.length ==0)
    {
        $("#confirmPasswordParent").html("replay");
        return false;

    }
    else if(str == password)
    {   
        $("#confirmPasswordParent").html("thumb_up");
        return true;
    }
    else if(str != password)
    {
        $("#confirmPasswordParent").html("thumb_down");
        return false;
    }
    else{
        $("#confirmPasswordParent").html("replay");
        return false;
    }
    return false;

}
function validateForm(){
	var password=checkPassword(document.getElementById("confirmPassword").value);
	var username=document.getElementById("signupResponse").value;
	if(password == true && username=="Unique username")
	{
		return true;
	}
	else if(password == false)
    {
        alert("Password must watch")
        return false;
    }
    else if(username == "Username already exists")
    {
    	alert("Enter unique Username");
    	return false;
    }
}
 var app=angular.module('search',[]);
 app.controller('searchHotels',function($scope,$http){
 	var searchPlace="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
 	var searchKey="&type=lodging&key=AIzaSyBXmAQo752-dXxxWiFgVGQf7Mv3BTwj7PY"; //API key
 	var displayImage="data:image/JPEG;base64,";
	var image="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
 	var	imageKey="&key=AIzaSyBXmAQo752-dXxxWiFgVGQf7Mv3BTwj7PY";
 	$scope.search = function()
 	{
 		console.log("Inside");
 		$scope.displayImage=displayImage;

	 	$http.get(searchPlace+$scope.query+searchKey)
	 	.then(function(response){
	 		console.log(response.data.results);
	 		$scope.searchResults=response.data.results;
	 		$scope.searchResults=$scope.searchResults.slice(0,1);
	
	 		// get image url
	 		for(var x in $scope.searchResults)
	 		{
	 			// console.log($scope.searchResults[x]);
	 			if($scope.searchResults[x].hasOwnProperty("photos"))
	 			{
		 			$http.get(image+$scope.searchResults[x].photos[0].photo_reference+imageKey)
		 			.then(function(response){
		 				console.log(type(response.data));
		 				$scope.searchResults[x].image=hexToBase64(response.data);
		 				console.log($scope.searchResults[x]);
		 			});
		 		}
	 		}

	 	});
	 }
	 
 });

 // signup validation
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