<?php
header('Content-Type: application/json');
$fileName = __DIR__ . '/../db/history.json';


if (!file_exists($fileName)) {
    $data = file_put_contents($fileName, json_encode([]));
}

$data = file_get_contents($fileName);
echo $data;
