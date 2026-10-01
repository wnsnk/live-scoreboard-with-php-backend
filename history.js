'use strict';

// import HistoryWriter from './modules/write_history.js';
// writeHistory = new HistoryWriter();

async function getHistory() {
    const url = '/api/GET/history.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        for (const history in result) {
            const divEl = document.createElement('div');
            divEl.classList = 'border rounded col';
            const h2El = document.createElement('h2');

            h2El.textContent = `${result[history]['message']}`;
            divEl.appendChild(h2El);
            const pEl = document.createElement('p');
            pEl.textContent = result[history]['message'];
            const time = new Date(Number(result[history]['time']));
            const dateTime = time.toString().split('GMT');
            pEl.textContent = `${dateTime[0]}`;
            divEl.appendChild(pEl);

            const sectionEl = document.querySelector('#history');
            sectionEl.appendChild(divEl);
        }
    } catch (error) {
        console.error(error.message);
    }
}
getHistory();
