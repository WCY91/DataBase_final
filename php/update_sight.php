<?php
	include_once "db_conn.php";
			$SightName = $_POST['sightName'];			
			$StarNum=$_POST['starNum'];	
			$Count=$_POST['count'];		
			$query = ("update sights set StarNum=?, Count=? where SightName=?");
			$stmt = $db->prepare($query);
			$result=$stmt->execute(array($StarNum,$Count,$SightName));

    echo print_r($result);
?>