<?php    
	include "db_conn.php";
	
	$Account = $_GET['account'];
	$query = ("select Account, sights.SightName, Description, Address, Zone, Category, PhotoURL, StarNum, Count\n" .
			   "from tourist, sights\n" .
			   "where tourist.SightName = sights.SightName and tourist.Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	
	// header('Content-Type: application/json; charset=utf-8');
	// echo json_encode($result);
	$favorite = array();
	if(count($result)==0)
	{   
        echo "error";   
    }
	else
	{
		for($i=0; $i<count($result); $i++){
		
			$favoriteObject =  array( 	'Account'  =>  $result[$i]['Account'],     'StarNum'  =>  $result[$i]['StarNum'],       'Count'  =>  $result[$i]['Count'],
										'SightName'  =>  $result[$i]['SightName'], 'Description'  =>  $result[$i]['Description'],
										'Address'  =>  $result[$i]['Address'],     'Zone'  =>  $result[$i]['Zone'],
										'Category'  =>  $result[$i]['Category'],   'PhotoURL'  =>  $result[$i]['PhotoURL']);
			$favorite[] = $favoriteObject;		 
		}
	}
	
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($favorite, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	
?>


