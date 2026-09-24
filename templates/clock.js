'use strict';

const minutes = document.querySelector('#minutes');

async function getData() {
  const url = "/api/get_settings.php";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    minutes.textContent = addZeroToTime(result['timeInMinutes'])
    
    
  } catch (error) {
    console.error(error.message);
  }
}

getData();



const addZeroToTime = function(num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}
