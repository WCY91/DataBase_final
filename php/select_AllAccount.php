<?php    
	include "db_conn.php";
	
	
	$query = ("select * from account");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array());
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」

    $AccountArray = array();
	if(count($result)==0){   
        echo"error";   
    }
    else{
        for($i=0; $i<count($result); $i++){
           
            $AccountObject =  array( 'Account'  =>  $result[$i]['Account'] , 'Password'  =>  $result[$i]['Password']);
            $AccountArray[] = $AccountObject;
        }
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($AccountArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>