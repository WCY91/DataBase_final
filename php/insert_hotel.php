<?php    
	include "db_conn.php";
	
	
	$HotelName = "棒棒motel";
	$Description = "最讚的";
	$Address = "基隆市中正區觀海街二號";
	$Zone = "中正";
	$StarNum = "5";
	$Count = "";
	
	$query = ("insert into hotel values(?,?,?,?,?,?)");
	$stmt =  $db->prepare($query);
	
	$result = $stmt->execute(array($HotelName, $Description, $Address, $Zone, $StarNum, $Count));
	//以上寫法是為了防止「sql injection」
	
	
	?>
	
	