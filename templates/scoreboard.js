'use strict';

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
        for (let team in result) {
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
            scoreH2.className = 'bigText text-center';
            scoreH2.textContent = result[team]['score'];
            scoreH2.id = `scoreTeam${team}`;
            cardBodyDiv.appendChild(scoreH2);

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title text-center';
            cardTitle.textContent = result[team]['name'];
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
                console.log(team);
            });
            btnColDiv.appendChild(decreaseScoreBtn);

            newRowCount++;
        }
    } catch (error) {
        console.error(error.message);
    }
}
getTeamsAndScores();
