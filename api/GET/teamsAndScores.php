<?php
header('Content-Type: application/json');
$data = file_get_contents(__DIR__ . '/../db/teamsAndScores.json');


echo $data;
