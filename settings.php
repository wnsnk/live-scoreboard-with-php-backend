<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1 class="center">Settings</h1>
    <!-- ADDING TEAM -->
    <hr>
    <h2 class="center">Add a Team: </h2>
    <div class="center">
        <input type="Text" name="teamName" id="teamName">
        <button id="addTeam">Add</button>
    </div>
    <hr>

    <!-- SHOWING ALL TEAMS -->
    <h2 class="center">Teams:</h2>
    <div class="center">
        <ul class="showTeams">

        </ul>

    </div>
    <div class="center"><button id="save">Save</button></div>
    <hr>


    <script src="settings.js"></script>
</body>

</html>

<?php




class Team
{

    public string $name;
    public int $id;
    public $score = 0;
    public string $color;

    function __construct(string $name, int $id)
    {
        $this->name = $name;
        $this->id = $id;
        $teamColors = ['Red', 'Blue', 'Green', 'Purple', 'Black', 'Fuchsia'];
        $this->color = $teamColors[$id];
    }
}


?>