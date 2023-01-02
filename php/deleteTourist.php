<?php 
	include "db_conn.php";
	$stmt = $db->prepare("delete from tourist where SightName=?");
	$SightName = "永豆海大店";
	$result = $stmt->execute(array($SightName));
	//使用prepare的寫法
?>