<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1 class="center">Settings</h1>
    <hr>
    <!-- ADDING TEAM -->
    <section>
        <h2 class="center">Add a Team: </h2>
        <div class="center">
            <input type="Text" name="teamName" id="teamName" placeholder="Team 1">
            <button id="addTeam">Add</button>
        </div>
    </section>
    <hr>

    <!-- SHOWING ALL TEAMS -->
    <section>
        <h2 class="center">Teams:</h2>
        <div class="center">
            <ul class="showTeams">

            </ul>

        </div>
        <div class="center"><button id="saveTeam">Save</button></div>
    </section>
    <hr>

    <!-- CLOCK -->
    <section>
        <h2 class="center">Clock</h2>
        <div class="center">

            <input type="number" name="timeInMinutes" id="timeInMinutes" placeholder="Minutes" min='1'>
            <button id="saveTime">Save</button>
        </div>
    </section>
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