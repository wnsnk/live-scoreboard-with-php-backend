<?php

header('Content-Type: application/json');

$newHistory = json_decode(file_get_contents('php://input'), true);
$historyPath = __DIR__ . '/../db/history.json';
if (!file_exists($historyPath)) {
    file_put_contents($historyPath, json_encode([]));
}

$historyJson = json_decode(file_get_contents($historyPath), true);
$historyJson[] = $newHistory;



file_put_contents($historyPath, json_encode($historyJson));
