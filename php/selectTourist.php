<?php    
	include "db_conn.php";
	
	$Account = "Eric";
	$query = ("select * from tourist where Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	$favoriate = array();
	for($i=0; $i<count($result); $i++){
		
		$favoriate[$i]=array("Account" => $result[$i]['Account'],"SightName" => $result[$i]['SightName']);		 
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($favoriate,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	
?>