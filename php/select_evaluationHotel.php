<?php    
	include "db_conn.php";
	
	$Account = $_GET['account'];
	$query = ("select Account, evaluation.StarNum, hotel.HotelName, Description, Address, Zone, hotel.StarNum, Count, PhotoURL\n" .
			   "from evaluation, hotel\n" .
			   "where evaluation.Place = hotel.HotelName and evaluation.Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	
	// header('Content-Type: application/json; charset=utf-8');
	// echo json_encode($result);
	$evaluationArr = array();
	if(count($result)==0)
	{   
        echo "no hotel evaluation";   
    }
	else
	{
		for($i=0; $i<count($result); $i++){
		
			$evaluationObject =  array( 'Account' => $result[$i]['Account'], 'MyStarNum' => $result[$i]['evaluation.StarNum'],
										'HotelName' => $result[$i]['HotelName'], 'Description' => $result[$i]['Description'],
										'Address' => $result[$i]['Address'], 'Zone' => $result[$i]['Zone'], 'TotalStarNum' => $result[$i]['hotel.StarNum'],
										'Count' => $result[$i]['Count'], 'PhotoURL' => $result[$i]['PhotoURL']);
			$evaluationArr[] = $evaluationObject;		 
		}
	}
	
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($evaluationArr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	
?>


