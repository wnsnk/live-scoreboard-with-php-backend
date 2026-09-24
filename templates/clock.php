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
                <div id='seconds' class="col">
                    <h2 class="bigText">00</h2>
                </div>
            </div>
            <!-- BUTTONS -->
            <div class="row border">
                <div class="col">
                    <button class="btn btn-primary">start</button>
                </div>
                <div class="col">
                    <button class="btn btn-secondary">pause</button>
                </div>
                <div class="col">
                    <button class="btn btn-secondary">stop</button>
                </div>
            </div>

        </div>
    </div>

</section>
<script src="templates/clock.js"></script>