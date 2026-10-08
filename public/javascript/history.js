'use strict';

async function getHistory() {
    const url = '/api/GET/history.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        result.reverse();
        const sectionEl = document.querySelector('#history');
        if (!result[0]) {
            const alertEl = document.createElement('div');
            alertEl.classList = 'alert alert-secondary';
            alertEl.role = 'alert';
            alertEl.textContent = 'There is no history available.';
            sectionEl.appendChild(alertEl);
        } else {
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

                sectionEl.appendChild(divEl);
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}
getHistory();
