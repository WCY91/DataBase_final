<?php    
	include "db_conn.php";
	
	$Account = $_GET['account'];
	$query = ("select Account, evaluation.StarNum, sights.SightName, Description, Address, Zone, Category, PhotoURL, sights.StarNum\n" .
			   "from evaluation, sights\n" .
			   "where evaluation.Place = sights.SightName and evaluation.Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	
	// header('Content-Type: application/json; charset=utf-8');
	// echo json_encode($result);
	$evaluationArr = array();
	if(count($result)==0)
	{   
        echo "no sight evaluation";   
    }
	else
	{
		for($i=0; $i<count($result); $i++){
		
			$evaluationObject =  array( 'Account' => $result[$i]['Account'], 'MyStarNum' => $result[$i]['evaluation.StarNum'],
										'SightName' => $result[$i]['SightName'], 'Description' => $result[$i]['Description'],
										'Address' => $result[$i]['Address'], 'Zone' => $result[$i]['Zone'], 'TotalStarNum' => $result[$i]['sights.StarNum'],
										'Category' => $result[$i]['Category'], 'PhotoURL' => $result[$i]['PhotoURL']);
			$evaluationArr[] = $evaluationObject;		 
		}
	}
	
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($evaluationArr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	
?>


