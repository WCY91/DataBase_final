<?php    
	include "db_conn.php";
	
    $Account = $_POST['account'];	
	$Password = $_POST['password'];
	
	$query = ("insert into account values(?,?)");
	$stmt =  $db->prepare($query);
	
	$result = $stmt->execute(array($Account,$Password))
	//以上寫法是為了防止「sql injection」
	
	
?>