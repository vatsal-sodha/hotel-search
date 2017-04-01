<?php
require_once 'config/connection.php';
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

?>