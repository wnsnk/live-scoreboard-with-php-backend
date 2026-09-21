<?php

header('Content-Type: application/json');

$teamNames = json_decode(file_get_contents('php://input'), true);

echo json_encode(['succes' => true, 'teamNames' => $teamNames]);
