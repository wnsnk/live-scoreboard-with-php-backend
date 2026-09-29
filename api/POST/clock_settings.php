<?php

header('Content-Type: application/json');

$timeInMinutes = json_decode(file_get_contents('php://input'), true);
$dataJson = file_get_contents(__DIR__ . '/../db/data.json');

$timeInMs = $timeInMinutes * 60000;

$todayPlusTimeMs = round(microtime(true) * 1000) + $timeInMs;

$json_array = json_decode($dataJson, true);
foreach ($json_array as $key => $value) {
    if ($key == 'timeInMinutes') {
        $json_array[$key] = $timeInMinutes;
    } elseif ($key == 'timeInMs') {
        $json_array[$key] = $todayPlusTimeMs;
    }
}

file_put_contents(__DIR__ . '/../db/data.json', json_encode($json_array));
echo json_encode($json_array);
