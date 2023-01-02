<?php 
	include "db_conn.php";
	$stmt = $db->prepare("delete from evaluation where Place=? and Account=?");
	$Place = $_GET['place'];
    $Account=$_GET['account'];
	$result = $stmt->execute(array($Place,$Account));
    echo print_r($result);
	//使用prepare的寫法
?>