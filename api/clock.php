<?php

header('Content-Type: application/json');

$timeInMinutes = json_decode(file_get_contents('php://input'), true);

echo json_encode(['succes' => true, 'timeInMinutes' => $timeInMinutes]);
