'use strict';

// Adding teamNames:
let teamNames = [];

const teamSubmitBtn = document.querySelector('#addTeam');
const teamNameInput = document.querySelector('#teamName');

teamSubmitBtn.addEventListener('click', function () {
    const teamName = teamNameInput.value;
    if (!teamName) {
        alert('Please type in team name.')
    } else {
        teamNames.push(teamName);
        teamNameInput.value = '';
        showTeams();
        teamNameInput.focus();
    }


})

// Showing teams:

const ShowTeamListElement = document.querySelector('.showTeams');
const saveBtnTeam = document.querySelector('#saveTeam');

const showTeams  = function() {
    ShowTeamListElement.innerHTML = '';
    for (let i = 0; i < teamNames.length; i++) {
        const liElement = document.createElement('li');
        liElement.textContent = teamNames[i];
        liElement.className = 'teamNameLi'
        ShowTeamListElement.appendChild(liElement);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        liElement.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', function() {
            teamNames.splice(i, 1);
            showTeams();


        })
    }
}

// Saving Teams:
saveBtnTeam.addEventListener('click', function() {
    if (teamNames.length >= 2) {
        fetch('api/teamnames.php',
            {
                method: 'POST',
                body: JSON.stringify(teamNames),
                headers: {'Content-type': 'application/json'},
            }
        )
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
        alert('Add at least 2 teams.')
    }
})

// Clock:
const saveBtnClock = document.querySelector('#saveTime');
const clockInput = document.querySelector('#timeInMinutes');
saveBtnClock.addEventListener('click', function() {
    timeInMinutes = clockInput.value;
    if (!timeInMinutes) {
        alert('This field can\'t be empty!')
    } else 
        fetch('api/clock.php',
            {
                method: 'POST',
                body: JSON.stringify(timeInMinutes),
                headers: {'Content-type': 'application/json'},
            }
        )
        .then((response) => response.json())
        .then((json) => console.log(json));
})
