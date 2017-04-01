<?php
require_once '../config/connection.php';
session_start();

if(isset($_GET['email_id']))
{
	$email=$_GET['email_id'];
	$query2 = "SELECT email from users where email = '$email'";
		$result2= $conn->query($query2);
		if($result2->num_rows == 0)
		{
			echo "1";
		}
		else{
			echo "-1";
		}
}
if(isset($_POST['signUp']))
{
	$email=$_POST['email'];
	$password=$_POST['password'];
	$firstName=$_POST['firstName'];
	$lastName=$_POST['lastName'];

	$password = md5($password);
	$query1 = "INSERT INTO users(email,password,firstName,lastName,moneyAmount) Values('$email','$password','$firstName','$lastName',0)";
	if($conn->query($query1))
	{
		echo "<script type='text/javascript'>alert('Succesfully SignedUp');window.location.href = '../index.html';</script>";
	}
	else
	{
		echo "<script type='text/javascript'>alert('Sorry Something went wrong');window.location.href = '../index.html';</script>";
	}
}
?>