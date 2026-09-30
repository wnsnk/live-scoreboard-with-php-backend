<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <?php include('templates/bootstrap.html') ?>
    <!-- <link rel="stylesheet" href="style.css"> -->

</head>

<body data-bs-theme="dark">
    <?php include('templates/header.html') ?>
    <div class="container">
        <h1 class="center">Settings</h1>
    </div>

    <hr>
    <!-- ADDING TEAM -->
    <section class="container">
        <h2 class="center">Add a Team: </h2>
        <div class="row">
            <div class="col-11">
                <input class="form-control" type="Text" name="teamName" id="teamName" placeholder="Team 1">
            </div>
            <div class="col">
                <button class="btn btn-primary col" id="addTeam">Add</button>
            </div>
        </div>
    </section>
    <hr>

    <!-- SHOWING ALL TEAMS -->
    <section class="container">
        <h2>Teams:</h2>
        <div>
            <ul class="showTeams">
                <!-- list made in js -->
            </ul>
        </div>
        <div>
            <button class="btn btn-primary" id="saveTeam">Save</button>
        </div>
    </section>
    <hr>

    <!-- CLOCK -->
    <section class="container">
        <h2>Clock</h2>
        <div class="row">
            <div class="col-11">
                <input class="form-control" type="number" name="timeInMinutes" id="timeInMinutes" placeholder="Minutes" min='1'>
            </div>
            <div class="col">
                <button class="btn btn-primary" id="saveTime">Save</button>
            </div>
        </div>
    </section>
    <script type="module" src="settings.js"></script>
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