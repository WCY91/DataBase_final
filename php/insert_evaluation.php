<?php    
	include "db_conn.php";
	
    $Account = $_POST['account'];	
	$Place = $_POST['place'];
    $StarNum = $_POST['starNum'];
	
	$query = ("insert into evaluation values(?,?,?)");
	$stmt =  $db->prepare($query);
	
	$result = $stmt->execute(array($Account,$Place,$StarNum));
	//以上寫法是為了防止「sql injection」
	
	
?>