<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>History</title>
    <?php include('templates/bootstrap.html') ?>
</head>

<body data-bs-theme="dark">
    <?php include('templates/header.html') ?>
    <section class="container">
        <h1>History</h1>

        <form action="history.php" method="post">
            <input class="btn btn-danger col-md-2 offset-md-10" type="submit" value="Delete history">
        </form>
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            unlink(__DIR__ . '/api/db/history.json');
        }
        ?>
        <hr>
        <div id="history" class=""></div>

    </section>

    <script src="history.js"></script>
</body>

</html>