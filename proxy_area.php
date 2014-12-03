<?php
	$query = $_GET["query"];
	$url = "http://pizza.de/_plzsearch/getsuggestions?search=" . $query;
	
	$areas = array();
	
	$doc = new DOMDocument();
	@$doc->loadHTMLFile($url);
	$xpath = new DOMXpath($doc);
	$result = $xpath->query('//body/p');
	
	$htmlString = $doc->saveHTML($result->item(0));
	
	$separator = "\r\n";
	
	$line = strtok($htmlString, $separator);
		
	while ($line !== false) {
		
		$area = new StdClass();
		
		$area->id = "";
		$area->name = "";
		$line = strtok($separator);
		//echo $line;
		$arr = split('	/', $line);
		
		$area->id = $arr[1]; 
		$area->name = utf8_decode($arr[0]); 
		
		array_push($areas, $area);
	}
	
	unset($areas[count($areas)-1]);
	unset($areas[count($areas)-1]);
	
	echo json_encode($areas);
?>