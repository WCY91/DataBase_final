<?php
	include_once "db_conn.php";
			$HotelName = $_POST['hotelName'];			
			$StarNum=$_POST['starNum'];	
			$Count=$_POST['count'];		
			$query = ("update hotel set StarNum=?, Count=? where HotelName=?");
			$stmt = $db->prepare($query);
			$result=$stmt->execute(array($StarNum,$Count,$HotelName));

    echo print_r($result);
?>