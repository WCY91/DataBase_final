<?php    
	include "db_conn.php";
	
	$Account = "jacky1";
	$SightName = "海大";
	
	$query = ("insert into tourist values(?,?)");
	$stmt =  $db->prepare($query);
	
	$result = $stmt->execute(array($Account,$SightName))
	//以上寫法是為了防止「sql injection」
	
	
?>
