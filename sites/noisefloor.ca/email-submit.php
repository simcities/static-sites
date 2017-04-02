<?php

header('Access-Control-Allow-Origin: http://noisefloor.ca:8011');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');	
$params = json_decode(file_get_contents('php://input'));
echo 'hello!<hr>';
print_r($_POST);
print_r($params);

?>