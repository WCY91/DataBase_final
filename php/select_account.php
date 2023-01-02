<?php    
	include "db_conn.php";
	
	$Account = $_GET['account'];
	$query = ("select * from account where Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	$users = array();
	for($i=0; $i<count($result); $i++){
		$users[$i]=array("Account" => $result[$i]['Account'],"Password" => $result[$i]['Password']);	
		
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($users,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	?>