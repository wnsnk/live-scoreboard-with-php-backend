<?php

header('Content-Type: application/json');

$updatedData = json_decode(file_get_contents('php://input'), true);
$teamsAndScoresJson = json_decode(file_get_contents(__DIR__ . '/../db/teamsAndScores.json'), true);

$teamsAndScoresJson[$updatedData['id']]['score'] = $updatedData['score'];

file_put_contents(__DIR__ . '/../db/teamsAndScores.json', json_encode($teamsAndScoresJson));
