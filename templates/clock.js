'use strict';

import { addZeroToTime } from '../modules/small_functions.js';

const minutes = document.querySelector('#minutes');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
let isRunning = false;
let timeInMinutes = 0;
let timeInSeconds;

async function getData() {
    const url = '/api/GET/settings.php';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        timeInMinutes = result['timeInMinutes'];
        timeInSeconds = Number(timeInMinutes) * 60;
        minutes.textContent = addZeroToTime(timeInMinutes);
    } catch (error) {
        console.error(error.message);
    }

    startBtn.addEventListener('click', function () {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = 'Pause';
            startTimer();
        } else {
            isRunning = false;
            startBtn.textContent = 'Start';
        }
    });

    stopBtn.addEventListener('click', function () {
        isRunning = false;
        startBtn.textContent = 'Start';
        timeInSeconds = Number(timeInMinutes) * 60;
        minutes.textContent = addZeroToTime(timeInMinutes);
        document.querySelector('#seconds').textContent = '00';
    });
}

getData();

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
