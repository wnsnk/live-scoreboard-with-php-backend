<link rel="stylesheet" href="style.css">
<section class="container">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <!-- clock border -->
            <div class="border rounded row text-center justify-content-center">
                <div class="col">
                    <h2 id='minutes' class="bigText">00</h2>
                </div>
                <div class="col">
                    <h2 class="bigText">:</h2>
                </div>
                <div class="col">
                    <h2 id="seconds" class="bigText">00</h2>
                </div>
            </div>
            <!-- BUTTONS -->
            <div class="row">
                <div class="col">
                    <button id="start" class="btn btn-primary">Start</button>
                </div>
                <div class="col">
                    <button id='stop' class="btn btn-danger">Stop</button>
                </div>
            </div>

        </div>
    </div>

</section>
<script src="templates/clock.js"></script>