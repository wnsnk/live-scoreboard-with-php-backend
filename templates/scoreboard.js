'use strict';

import { updateScore } from '../modules/update_score.js';
import HistoryWriter from '../modules/write_history.js';

const writeHistory = new HistoryWriter();

async function getTeamsAndScores() {
    const url = '/api/GET/teamsAndScores.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        const containerDiv = document.querySelector('#appendRow');
        let rowDiv = document.querySelector('#appendTeams');
        let newRowCount = 0;
        for (let teamId in result) {
            if (newRowCount == 4) {
                newRowCount = 0;
                rowDiv = document.createElement('div');
                rowDiv.className = 'row';
                // TODO FIX ROWS
                containerDiv.appendChild(rowDiv);
                const brElement = document.createElement('br');
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
            scoreH2.textContent = result[teamId]['score'];
            scoreH2.id = `scoreTeam${teamId}`;
            cardBodyDiv.appendChild(scoreH2);

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title text-center';
            cardTitle.textContent = result[teamId]['name'];
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
                        result[teamId]['name'],
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
                    result[teamId]['name'],
                    Number(scoreH2.textContent),
                    -1,
                );
            });
            btnColDiv.appendChild(decreaseScoreBtn);

            newRowCount++;
        }
    } catch (error) {
        console.error(error.message);
    }
}
getTeamsAndScores();
