<?php
header('Content-Type: application/json');
$fileName = __DIR__ . '/../db/teamsAndScores.json';


if (!file_exists($fileName)) {

    $dataFileName = __DIR__ . '/../db/data.json';
    if (!file_exists($dataFileName)) {
        file_put_contents($fileName, json_encode(["teamNames" => ["Team 1", "Team 2"], "timeInMinutes" => "10"]));
    }
    $dataJson = json_decode(file_get_contents($dataFileName));
    $index = 0;
    $tempList = [];
    foreach ($dataJson[0] as $team) {
        $teamArray = ["name" => $team, "id" => $index, "score" => 0];
        $index++;
        $tempList[] = $teamArray;
    }

    $data = file_put_contents($fileName, json_encode($tempList));
}

$data = file_get_contents($fileName);
echo $data;
