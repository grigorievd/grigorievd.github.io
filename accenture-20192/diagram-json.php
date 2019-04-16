<?php
	$url = 'https://cybermap.kaspersky.com' . htmlspecialchars($_GET["url"]);
	$obj = file_get_contents($url);
	echo $obj;
?>