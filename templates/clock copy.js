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
let timeInMs;
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
        timeInMinutes = Number(result['timeInMinutes']);
        // SET DISPLAY TIME
        if (sessionStorage.getItem('msLeft')) {
            timeInMs = Number(sessionStorage.getItem('msLeft'));
            let timeLeftArray = convertMsToMinutesAndSeconds(timeInMs);

            displayMinutes.textContent = addZeroToTime(timeLeftArray[0]);
            displaySeconds.textContent = addZeroToTime(timeLeftArray[1]);
        } else {
            timeInMs = Number(result['timeInMs']);

            displayMinutes.textContent = addZeroToTime(timeInMinutes);
        }
        // CHECK IF CLOCK IS SUPPOSED TO BE RUNNING
        if (
            sessionStorage.getItem('now') &&
            convertGetItemStringToBool(sessionStorage.getItem('isRunning'))
        ) {
            // const oldNow = Number(sessionStorage.getItem('now'));
            const oldNow = new Date().getTime();

            // console.log('oldNow', oldNow);
            // console.log('timeInMs', convertMsToMinutesAndSeconds(timeInMs));
            const countDownDateMs = oldNow + timeInMs;
            // console.log(countDownDateMs / 1000);
            startBtn.textContent = 'Pause';
            startCountDown(countDownDateMs);
        }
    } catch (error) {
        console.error(error.message);
    }
    // START/PAUSE AND STOP BUTTONS
    startBtn.addEventListener('click', function () {
        console.log('click start');
        if (!convertGetItemStringToBool(sessionStorage.getItem('isRunning'))) {
            // IF SESSION-ITEM NOW DOES NOT EXIST. CREATE IT.
            if (!sessionStorage.getItem('now')) {
                sessionStorage.setItem('now', new Date().getTime());
            }
            const oldNowDateMs = Number(sessionStorage.getItem('now'));
            console.log(oldNowDateMs);

            // CALCULATE COUNTDOWN DATE

            if (sessionStorage.getItem('msLeft')) {
                timeInMs = Number(sessionStorage.getItem('msLeft'));
                console.log(timeInMs);
            }
            console.log('timeInMs', timeInMs);
            let countDownDateMs = oldNowDateMs + timeInMs;

            console.log(countDownDateMs);

            sessionStorage.setItem('isRunning', true);
            startCountDown(countDownDateMs);

            startBtn.textContent = 'Pause';
        } else {
            sessionStorage.setItem('isRunning', false);
            // sessionStorage.removeItem('now');
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
        // console.log(timeInMinutes);
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
            // console.log('now:', typeof now, now);
            // console.log('countDownDate:', typeof countDownDate, countDownDate);

            let distance = countDownDate - now;
            // console.log('distance:', convertMsToMinutesAndSeconds(distance));

            minutes = addZeroToTime(
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            );
            seconds = addZeroToTime(
                Math.floor((distance % (1000 * 60)) / 1000),
            );
            // console.log(`${minutes}:${seconds}`);
            displayMinutes.textContent = minutes;
            displaySeconds.textContent = seconds;

            sessionStorage.setItem('msLeft', distance);
            console.log(Number(sessionStorage.getItem('msLeft')) / 1000);
        } else {
            clearInterval(countDown);
        }
    }, 1000);
};
