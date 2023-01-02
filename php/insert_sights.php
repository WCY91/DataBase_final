<?php    
	include "db_conn.php";
	
	$SightName = "永豆海大店";
	$Description = "我學校的豆漿店";
	$Address = "基隆市中正區北寧路870號";
	$Zone = "中正";
	$Category = "餐廳";
	$PhotoURL = "https://lh3.googleusercontent.com/p/AF1QipMiwoHMnFHKLIcf8pC7SLLlyCJ1zrkiSe7BkNCA=s1360-w1360-h1020";
	
	$query = ("insert into sights values(?,?,?,?,?,?)");
	$stmt =  $db->prepare($query);
	
	$result = $stmt->execute(array($SightName, $Description ,$Address, $Zone, $Category, $PhotoURL))
	//以上寫法是為了防止「sql injection」
	
?>