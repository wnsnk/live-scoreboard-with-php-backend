<section>
    <div id='appendRow' class="container">
        <div id="appendTeams" class="row">

        </div>
        <br>
    </div>
</section>
<script type="module" src="templates/scoreboard.js"></script>

<?php
$data = file_get_contents('api/db/data.json');
$data_decoded = json_decode($data, true);
$teamList = $data_decoded['teamNames'];
$teamsAndScores = [];
$index = 0;

if (!file_exists('api/db/teamsAndScores.json')) {
    foreach ($teamList as $team) {
        $teamsAndScores[] = array(
            'name' => $team,
            'id' => $index,
            'score' => 0
        );
        $index++;
    }

    file_put_contents('api/db/teamsAndScores.json', json_encode($teamsAndScores, true));
}
