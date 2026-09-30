'use strict';

import HistoryWriter from './modules/write_history.js';
const writeHistory = new HistoryWriter();

let teamNames = [];

async function getData() {
    const url = '/api/GET/settings.php';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        teamNames = result['teamNames'];
        showTeams();
        clockInput.value = result['timeInMinutes'];
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

getData();

const teamSubmitBtn = document.querySelector('#addTeam');
const teamNameInput = document.querySelector('#teamName');
teamNameInput.focus();

teamSubmitBtn.addEventListener('click', function () {
    addTeam();
});
teamNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTeam();
    }
});

const addTeam = function () {
    const teamName = teamNameInput.value;
    if (!teamName) {
        alert('Please type in team name.');
    } else {
        teamNames.push(teamName);
        writeHistory.documentTeamAdded(teamName);
        teamNameInput.value = '';
        showTeams();
        teamNameInput.focus();
    }
};

// Showing teams:

const ShowTeamListElement = document.querySelector('.showTeams');
const saveBtnTeam = document.querySelector('#saveTeam');

const showTeams = function () {
    ShowTeamListElement.innerHTML = '';
    for (let i = 0; i < teamNames.length; i++) {
        const liElement = document.createElement('li');
        liElement.className = 'row';
        const divElement0 = document.createElement('div');
        divElement0.className = 'col-11';
        const h3Element = document.createElement('h3');
        h3Element.textContent = teamNames[i];
        divElement0.appendChild(h3Element);
        liElement.appendChild(divElement0);
        ShowTeamListElement.appendChild(liElement);

        const divElement1 = document.createElement('div');
        divElement1.className = 'col';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-close btn-sm';
        divElement1.appendChild(deleteBtn);
        liElement.appendChild(divElement1);
        deleteBtn.addEventListener('click', function () {
            writeHistory.documentTeamRemoved(teamNames[i]);
            teamNames.splice(i, 1);
            showTeams();
        });
    }
};

// Saving Teams:
saveBtnTeam.addEventListener('click', function () {
    if (teamNames.length >= 2) {
        writeHistory.documentTeamsSaved();
        fetch('api/POST/teamnames.php', {
            method: 'POST',
            body: JSON.stringify(teamNames),
            headers: { 'Content-type': 'application/json' },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    } else {
        alert('Add at least 2 teams.');
    }
});

// Clock:
const saveBtnClock = document.querySelector('#saveTime');
const clockInput = document.querySelector('#timeInMinutes');
saveBtnClock.addEventListener('click', function () {
    timeInMinutes = clockInput.value;
    writeHistory.documentTimerSaved(timeInMinutes);
    if (!timeInMinutes) {
        alert("This field can't be empty!");
    } else
        fetch('api/POST/clock_settings.php', {
            method: 'POST',
            body: JSON.stringify(timeInMinutes),
            headers: { 'Content-type': 'application/json' },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
});
