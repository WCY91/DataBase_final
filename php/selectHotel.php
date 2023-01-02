<?php    
	include "db_conn.php";
	
	$HotelName = "年年motel";
	$query = ("select * from hotel where HotelName = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($HotelName));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	if(count($result)==0){   
        echo "no Hotel";   
    }
    else{
        for($i=0; $i<count($result); $i++){
           
            $HotelObject =  array( 'HotelName'  =>  $result[$i]['HotelName'], 'Description'  =>  $result[$i]['Description'],
                                     'Address'  =>  $result[$i]['Address'], 'Zone'  =>  $result[$i]['Zone'],
                                     'StarNum'  =>  $result[$i]['StarNum'], 'Count'  =>  $result[$i]['Count'],'PhotoURL'=>$result[$i]['PhotoURL']);
            $HotelArray[] = $HotelObject;
        }
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($HotelArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	?>