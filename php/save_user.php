<?php

$headers = getallheaders();
$TOKEN = "1234567890";
$result = array();





		// Now you can use the token for authentication or other purposes

		$rawData = file_get_contents("php://input");

		// Decode the JSON data to an associative array
		$data = json_decode($rawData, true);

		// Now you can access the data from the $data array
		// For example, if your data had a 'username' field, you could access it like this:
		$email = $data['email'];
		$name = $data["name"];
		$surname = $data["surname"];
		$phone = $data["phone"];
		$score = $data["score"];
		$avatar = $data["avatar"];


		$sql="insert into users (name, surname, email, score, avatar, phone) values(";
		$sql.="'".$name."',";
		$sql.="'".$surname."',";
		$sql.="'".$email."',";
		$sql.="'".$score."',";
		$sql.="'".$avatar."',";
		$sql.="'".$phone."')";

		//echo $sql;

		//CODIGO REAL
		
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

		if($email == ''){
			$result[1] = "Email is empty.";
			echo json_encode($result);
			return;
		}


		// Otra manera de enviar el correo
		$message = "The player information<br/>";
		$message .= "<strong>Name</strong>: ".$name."<br/>";
		$message .= "<strong>Surname</strong>: ".$surname."<br/>";
		$message .= "<strong>Email</strong>: ".$email."<br/>";
		$message .= "<strong>Phone</strong>: ".$phone."<br/>";
		$message .= "<strong>Score</strong>: ".$score."<br/>";
		$message .= "<strong>Avatar selection</strong>: ".$avatar."<br/>";
		$message .= "Reminder: This information has been also stored in the database<br/>";
		$headers = array();
		$headers["MIME-Version"] = 'MIME-Version: 1.0';
		$headers["Content-type"] = 'text/html; charset=iso-8859-1';
		$headers["From"] = "hello@appnormals.com";

		$sender = 'hello@appnormals.com';

		$recipient = 'dani.moya@appnormals.com, inaki.diaz@appnormals.com, soymachine@gmail.com, hello@appnormals.com, ariana.galindo@whu.edu';

		$subject = "A new user has completed The Rainforest Quest!";
		//$message = "php test message";
		//$headers = 'From:' . $sender;


		if (mail($recipient, $subject, $message, $headers))
		{
			$result[1] = "Message accepted";
		}
		else
		{
			$result[1] = "Error: Message not accepted";
		}

		
		
		echo json_encode($result);
/*
if (isset($headers['Authorization'])) {
    $authorizationHeader = $headers['Authorization'];
    

    $token = str_replace('Bearer ', '', $authorizationHeader);
    
	if($token == $TOKEN){
		// Now you can use the token for authentication or other purposes

		//*
		$email = $_POST["email"];
		$name = $_POST["name"];
		$surname = $_POST["surname"];
		$phone = $_POST["phone"];
		$score = $_POST["score"];
		$avatar = $_POST["avatar"];

		$sql="insert into users (name, surname, email, score, avatar, phone) values(";
		$sql.="'".$name."',";
		$sql.="'".$surname."',";
		$sql.="'".$email."',";
		$sql.="'".$score."',";
		$sql.="'".$avatar."',";
		$sql.="'".$phone."')";

		//echo $sql;

		//CODIGO REAL
		
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


		// Otra manera de enviar el correo
		$subject = "A bew user has completed The Rainforest Quest!";
		$message = "The player information<br/>";
		$message .= "<strong>Name</strong>: ".$name."<br/>";
		$message .= "<strong>Surname</strong>: ".$surname."<br/>";
		$message .= "<strong>Email</strong>: ".$email."<br/>";
		$message .= "<strong>Phone</strong>: ".$phone."<br/>";
		$message .= "<strong>Score</strong>: ".$score."<br/>";
		$message .= "<strong>Avatar selection</strong>: ".$avatar."<br/>";
		$message .= "Reminder: This information has been also stored in the database<br/>";
		$headers = array();
		$headers["MIME-Version"] = 'MIME-Version: 1.0';
		$headers["Content-type"] = 'text/html; charset=iso-8859-1';
		$headers["From"] = "hello@appnormals.com";

		$sender = 'hello@appnormals.com';
		$recipient = 'dani.moya@appnormals.com, inaki.diaz@appnormals.com, soymachine@gmail.com, hello@appnormals.com';

		$subject = "A bew user has completed The Rainforest Quest!";
		//$message = "php test message";
		//$headers = 'From:' . $sender;

		if (mail($recipient, $subject, $message, $headers))
		{
			echo "Message accepted";
		}
		else
		{
			echo "Error: Message not accepted";
		}

		
		
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
*/
//*/
?>