import {
    addZeroToTime,
    convertGetItemStringToBool,
    convertMsToMinutesAndSeconds,
} from '../modules/small_functions.js';

('use strict');

const displayTime = document.querySelector('#time');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

let timeInMinutes = 0;
let timeInMs;

async function getData() {
    const url = '/api/GET/settings.php';

    try {
        // GETTING SETTINGS FROM DATA.JSON
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        timeInMinutes = Number(result['timeInMinutes']);
        // SET DISPLAY TIME
        if (sessionStorage.getItem('msLeft')) {
            timeInMs = Number(sessionStorage.getItem('msLeft'));
            let timeLeftArray = convertMsToMinutesAndSeconds(timeInMs);

            displayTime.textContent = `${timeLeftArray[0]}:${timeLeftArray[1]}`;
        } else {
            timeInMs = Number(result['timeInMs']);

            displayTime.textContent = `${addZeroToTime(timeInMinutes)}:00`;
        }
        // CHECK IF CLOCK IS SUPPOSED TO BE RUNNING
        if (convertGetItemStringToBool(sessionStorage.getItem('isRunning'))) {
            const now = new Date().getTime();

            const countDownDateMs = now + timeInMs;
            startBtn.textContent = 'Pause';
            startCountDown(countDownDateMs);
        }
    } catch (error) {
        console.error(error.message);
    }
    // START/PAUSE AND STOP BUTTONS
    startBtn.addEventListener('click', function () {
        if (!convertGetItemStringToBool(sessionStorage.getItem('isRunning'))) {
            const now = new Date().getTime();

            // CALCULATE COUNTDOWN DATE
            if (sessionStorage.getItem('msLeft')) {
                timeInMs = Number(sessionStorage.getItem('msLeft'));
            }
            let countDownDateMs = now + timeInMs;

            sessionStorage.setItem('isRunning', true);
            startCountDown(countDownDateMs);

            startBtn.textContent = 'Pause';
        } else {
            sessionStorage.setItem('isRunning', false);
            startBtn.textContent = 'Start';
        }
    });

    stopBtn.addEventListener('click', function () {
        // RESET SESSION STORAGE
        sessionStorage.removeItem('now');
        sessionStorage.removeItem('msLeft');
        sessionStorage.setItem('isRunning', false);

        // RESET DISPLAY AND BUTTON
        startBtn.textContent = 'Start';
        displayTime.textContent = `${addZeroToTime(timeInMinutes)}:00`;
    });
}

getData();

const startCountDown = function (countDownDate) {
    let minutes, seconds;
    const countDown = setInterval(function () {
        if (convertGetItemStringToBool(sessionStorage.getItem('isRunning'))) {
            const now = new Date().getTime();

            let distance = countDownDate - now;

            minutes = addZeroToTime(
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            );
            seconds = addZeroToTime(
                Math.floor((distance % (1000 * 60)) / 1000),
            );
            displayTime.textContent = `${minutes}:${seconds}`;

            sessionStorage.setItem('msLeft', distance);

            if (distance < 0) {
                displayTime.textContent = '00:00';
                const audio = new Audio('dragon-studio-bell-ring.mp3');
                audio.play();
                clearInterval(countDown);
            }
        } else {
            clearInterval(countDown);
        }
    }, 1000);
};
