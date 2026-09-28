<?php

header('Content-Type: application/json');

$teamNames = json_decode(file_get_contents('php://input'), true);
$dataJson = file_get_contents(__DIR__ . '/../db/data.json');
$json_array = json_decode($dataJson, true);
foreach ($json_array as $key => $value) {
    if ($key == 'teamNames') {
        $json_array[$key] = $teamNames;
    }
}

file_put_contents(__DIR__ . '/../db/data.json', json_encode($json_array));
