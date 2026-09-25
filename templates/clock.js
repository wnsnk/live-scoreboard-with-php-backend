'use strict';

const minutes = document.querySelector('#minutes');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');
let isRunning = false;
let timeInMinutes = 0;
let timeInSeconds;

async function getData() {
  const url = "/api/get_settings.php";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    timeInMinutes = result['timeInMinutes'];
    timeInSeconds = Number(timeInMinutes) * 60;
    minutes.textContent = addZeroToTime(timeInMinutes)
    
    
  } catch (error) {
    console.error(error.message);
  }

    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = 'Pause';
            startTimer();
        } else {
            isRunning = false;
            startBtn.textContent = 'Start';
        }})

    pauseBtn.addEventListener('click', function() {
        isRunning = false;})

    stopBtn.addEventListener('click', function() {
        isRunning = false;
        timeInSeconds = Number(timeInMinutes) * 60;
        minutes.textContent = addZeroToTime(timeInMinutes)
        document.querySelector('#seconds').textContent = '00';
    })


    

  }


getData();




const addZeroToTime = function(num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}



function startTimer() {
    let minutes, seconds;
    const interval = setInterval(function () {
        if (isRunning) {
        minutes = parseInt(timeInSeconds / 60, 10);
        seconds = parseInt(timeInSeconds % 60, 10);
        

        minutes = addZeroToTime(minutes);
        seconds = addZeroToTime(seconds);

        const displayMinutes = document.querySelector('#minutes');
        const displaySeconds = document.querySelector('#seconds');
        displayMinutes.textContent = minutes;
        displaySeconds.textContent = seconds;

        if (--timeInSeconds < 0) {
            timeInSeconds = 0;
        }
    } else {
            clearInterval(interval);
        }
}, 1000);


}

const reverseBool = function(value) {
    if (value) {
        return false;
    } else {
        return true;
    }

}