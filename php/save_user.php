<?php

$headers = getallheaders();
$TOKEN = "1234567890";
$result = array();

if (isset($headers['Authorization'])) {
    $authorizationHeader = $headers['Authorization'];
    

    $token = str_replace('Bearer ', '', $authorizationHeader);
    
	if($token == $TOKEN){
		// Now you can use the token for authentication or other purposes

		//*
		$email = $_POST["email"];
		$name = "dani"; //$_POST["name"];
		$score = 90; // $_POST["score"];
		$avatar = "1-1-1-1"; // $_POST["avatar"];

		$sql="insert into users (name, email, score, avatar) values(";
		$sql.="'".$name."',";
		$sql.="'".$email."',";
		$sql.="'".$score."',";
		$sql.="'".$avatar."')";

		//echo $sql;

		//CODIGO REAL
		/*
		include "CMySqlData.php";
		$db = new CMySqlData();
		$db->Connect();
		*/
		$resultID = "failed";
		$connection = mysqli_connect("mysql.appnormals.com", "appnormals", "pascalmotal", "german_school");
		if($connection){
			try {
				$result = mysqli_query($connection, $sql);
				$resultID = "success";
			} catch (Exception $e) {
				$resultID = "error";
			}    
		}

		$result = array();
		$result[0] = $resultID;
		echo json_encode($result);
	}else{
		$resultID = "failed";
		$result[0] = $resultID;
		$result[1] = "Authorization header not found.";
		echo json_encode($result);
	}
	
} else {
    $resultID = "failed";
	$result[0] = $resultID;
	$result[1] = "Authorization header not found.";
	echo json_encode($result);
}

//*/
?>