<?php
	
	$responseObject = new StdClass();
	
	$area = $_GET["area"];
	$url = "http://pizza.de/" . $area;
	
	$doc = new DOMDocument();
	@$doc->loadHTMLFile($url);
	$xpath = new DOMXpath($doc);


	$events = $xpath->query('//*[@id="slist"]');
	
	$htmlString = $doc->saveHTML($events->item(0));	
	
	$responseObject->data = $htmlString;
	
	echo json_encode($responseObject);
?>