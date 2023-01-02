<?php
	include_once "db_conn.php";
			$Place = $_POST['place'];
			$Account = $_POST['account'];
			$StarNum=$_POST['starNum'];			
			$query = ("update evaluation set StarNum=? where Place=? and Account=?");
			$stmt = $db->prepare($query);
			$result=$stmt->execute(array($StarNum,$Place,$Account));

    echo print_r($result);
?>