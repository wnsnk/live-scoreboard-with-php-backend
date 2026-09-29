import {
    addZeroToTime,
    convertGetItemStringToBool,
    convertMsToMinutesAndSeconds,
} from '../modules/small_functions.js';

('use strict');

const displayMinutes = document.querySelector('#minutes');
const displaySeconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
let isRunning = false;

let timeInMinutes = 0;
let timeInMs, timeInSeconds;

// TODO: RELOADING PAGE REMOVES AROUND 1.5 MINUTES FROM CLOCK?

async function getData() {
    const url = '/api/GET/settings.php';

    try {
        // GETTING SETTINGS FROM DATA.JSON
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        // SET DISPLAY TIME
        if (sessionStorage.getItem('msLeft')) {
            timeInMs = Number(sessionStorage.getItem('msLeft'));
            let timeLeftArray = convertMsToMinutesAndSeconds(timeInMs);

            displayMinutes.textContent = addZeroToTime(timeLeftArray[0]);
            displaySeconds.textContent = addZeroToTime(timeLeftArray[1]);
        } else {
            timeInMs = Number(result['timeInMs']);
            timeInMinutes = Number(result['timeInMinutes']);
            displayMinutes.textContent = addZeroToTime(timeInMinutes);
        }
        // CHECK IF CLOCK IS SUPPOSED TO BE RUNNING
        if (
            sessionStorage.getItem('now') &&
            convertGetItemStringToBool(sessionStorage.getItem('isRunning'))
        ) {
            const now = new Date(Number(sessionStorage.getItem('now')));
            let countDownDate = now.getTime() + timeInMs;
            countDownDate = new Date(countDownDate);
            startBtn.textContent = 'Pause';
            startCountDown(countDownDate);
        }
    } catch (error) {
        console.error(error.message);
    }
    // START/PAUSE AND STOP BUTTONS
    startBtn.addEventListener('click', function () {
        if (!convertGetItemStringToBool(sessionStorage.getItem('isRunning'))) {
            // IF SESSION-ITEM NOW DOES NOT EXIST. CREATE IT.
            if (!sessionStorage.getItem('now')) {
                sessionStorage.setItem('now', new Date().getTime());
            }
            const now = new Date(Number(sessionStorage.getItem('now')));

            // CALCULATE COUNTDOWN DATE
            let countDownDate = now.getTime() + timeInMs;
            countDownDate = new Date(countDownDate);

            sessionStorage.setItem('isRunning', true);
            startCountDown(countDownDate);

            startBtn.textContent = 'Pause';
        } else {
            sessionStorage.setItem('isRunning', false);
            startBtn.textContent = 'Start';
            // TO DO FIX PAUSING TIMER
        }
    });

    stopBtn.addEventListener('click', function () {
        // RESET SESSION STORAGE
        sessionStorage.removeItem('now');
        sessionStorage.removeItem('msLeft');
        sessionStorage.setItem('isRunning', false);

        // RESET DISPLAY AND BUTTON
        startBtn.textContent = 'Start';
        displayMinutes.textContent = addZeroToTime(timeInMinutes);
        displaySeconds.textContent = '00';
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

            displayMinutes.textContent = minutes;
            displaySeconds.textContent = seconds;

            const msLeft = countDownDate - now;
            sessionStorage.setItem('msLeft', msLeft);
        } else {
            clearInterval(countDown);
        }
    }, 1000);
};
