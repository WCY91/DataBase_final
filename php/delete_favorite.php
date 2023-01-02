<?php 
	include "db_conn.php";
	$stmt = $db->prepare("delete from tourist where SightName=? and Account=?");
	$SightName = $_GET['sightName'];
    $Account=$_GET['account'];
    
	$result = $stmt->execute(array($SightName,$Account));
    echo print_r($result);
	//使用prepare的寫法
?>