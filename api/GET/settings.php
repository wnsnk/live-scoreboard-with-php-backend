<?php
header('Content-Type: application/json');
$fileName = __DIR__ . '/../db/data.json';


if (!file_exists($fileName)) {
    $data = file_put_contents($fileName, json_encode(["teamNames" => ["Team 1", "Team 2"], "timeInMinutes" => "10"]));
}

$data = file_get_contents($fileName);
echo $data;
