'use strict';

// Adding teamNames:
let teamNames = [];

const teamSubmitBtn = document.querySelector('#addTeam');
const teamNameInput = document.querySelector('#teamName');

teamSubmitBtn.addEventListener('click', function () {
    const teamName = teamNameInput.value;
    teamNames.push(teamName);
    teamNameInput.value = '';
    showTeams();

})

// Showing teams:

const ShowTeamListElement = document.querySelector('.showTeams');
const saveBtn = document.querySelector('#save');

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
saveBtn.addEventListener('click', function() {
    fetch('api/teamnames.php',
        {
            method: 'POST',
            body: JSON.stringify(teamNames),
            headers: {'Content-type': 'application/json'},
        }
    )
    .then((response) => response.json())
    .then((json) => console.log(json));
})