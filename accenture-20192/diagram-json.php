<?php
	$url = 'https://cybermap.kaspersky.com/data/events/default/0.json';
	$obj = file_get_contents($url);
	echo $obj;
?>