<?php
require_once '../config/connection.php';
session_start();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$password1 = md5($request->password);
		$sql = "SELECT * FROM users WHERE email = '$request->email' AND password = '$password1'";
		$result = $conn->query($sql);
		if ($result->num_rows == 0)
			echo "-1";
		else
			echo "1";
?>