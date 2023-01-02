<?php    
	include "db_conn.php";
	
	$query = ("select * from sights ");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute();
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	$sights = array();
	for($i=0; $i<count($result); $i++){
		$sights[$i]=array("SightName" => $result[$i]['SightName'],"Description" => $result[$i]['Description'],
		"Address"=>$result[$i]['Address'],"Zone"=>$result[$i]['Zone'],"Category"=>$result[$i]['Category'],
		"PhotoURL"=>$result[$i]['PhotoURL'],"StarNum"=>$result[$i]['StarNum'],"Count"=>$result[$i]['Count']);	
		
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($sights,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	?>