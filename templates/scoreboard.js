'use strict';

import { updateScore } from '../modules/update_score.js';
import HistoryWriter from '../modules/write_history.js';
let columns;
const writeHistory = new HistoryWriter();

async function getTeamsAndScores() {
    const url = '/api/GET/teamsAndScores.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        columns = calcColumns();
        createScoreboards(result);

        window.addEventListener('resize', function () {
            columns = calcColumns();
            const appendRowDiv = document.querySelector('#appendRow');
            appendRowDiv.innerHTML = '';
            createScoreboards(result);
        });
    } catch (error) {
        console.error(error.message);
    }
}
getTeamsAndScores();

const createScoreboards = function (teamsArray) {
    const containerDiv = document.querySelector('#appendRow');
    let rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    containerDiv.appendChild(rowDiv);

    let brElement = document.createElement('br');
    containerDiv.appendChild(brElement);
    let newRowCount = 0;
    for (let teamId in teamsArray) {
        if (newRowCount == columns) {
            newRowCount = 0;
            rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            containerDiv.appendChild(rowDiv);
            brElement = document.createElement('br');
            containerDiv.appendChild(brElement);
        }
        const colDiv = document.createElement('div');
        colDiv.className = 'col';
        rowDiv.appendChild(colDiv);

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style = 'width: 18rem';
        colDiv.appendChild(cardDiv);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        cardDiv.appendChild(cardBodyDiv);

        const scoreH2 = document.createElement('h2');
        scoreH2.className = 'display-1 text-center';
        scoreH2.textContent = teamsArray[teamId]['score'];
        scoreH2.id = `scoreTeam${teamId}`;
        cardBodyDiv.appendChild(scoreH2);

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title text-center';
        cardTitle.textContent = teamsArray[teamId]['name'];
        cardBodyDiv.appendChild(cardTitle);

        const btnDiv = document.createElement('div');
        btnDiv.className = 'row';
        cardBodyDiv.appendChild(btnDiv);

        for (let i = 1; i <= 3; i++) {
            const btnColDiv = document.createElement('div');
            btnColDiv.className = 'col';
            btnDiv.appendChild(btnColDiv);

            const buttonElement = document.createElement('button');
            buttonElement.className = 'btn btn-primary';
            buttonElement.textContent = `+${i}`;
            buttonElement.addEventListener('click', function () {
                scoreH2.textContent = Number(scoreH2.textContent) + i;

                updateScore(Number(teamId), Number(scoreH2.textContent));
                writeHistory.documentScoreChange(
                    teamsArray[teamId]['name'],
                    Number(scoreH2.textContent),
                    i,
                );
            });
            btnColDiv.appendChild(buttonElement);
        }
        const btnColDiv = document.createElement('div');
        btnColDiv.className = 'col';
        btnDiv.appendChild(btnColDiv);

        const decreaseScoreBtn = document.createElement('button');
        decreaseScoreBtn.className = 'btn btn-danger';
        decreaseScoreBtn.textContent = '-1';
        decreaseScoreBtn.addEventListener('click', function () {
            scoreH2.textContent = Number(scoreH2.textContent) - 1;
            updateScore(Number(teamId), Number(scoreH2.textContent));
            writeHistory.documentScoreChange(
                teamsArray[teamId]['name'],
                Number(scoreH2.textContent),
                -1,
            );
        });
        btnColDiv.appendChild(decreaseScoreBtn);

        newRowCount++;
    }
};

const calcColumns = function () {
    if (window.innerWidth > 1400) {
        return 4;
    } else if (window.innerWidth > 1000) {
        return 3;
    } else if (window.innerWidth > 800) {
        return 2;
    } else {
        return 1;
    }
};
