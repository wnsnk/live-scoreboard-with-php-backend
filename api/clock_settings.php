<?php

header('Content-Type: application/json');

$timeInMinutes = json_decode(file_get_contents('php://input'), true);
$dataJson = file_get_contents('data.json');
$json_array = json_decode($dataJson, true);
foreach ($json_array as $key => $value) {
    if ($key == 'timeInMinutes') {
        $json_array[$key] = $timeInMinutes;
    }
}

file_put_contents('data.json', json_encode($json_array));
