/**
 * If a number is < 10: Returns the number with a zero in front of it.
 * @param {number} num - A number.
 */
export const addZeroToTime = function (num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
};

/**
 * Converts the string from session.getItem() to a boolean if it is 'true' or 'false'
 * @param {string} getItemString - The string returned by session.getItem()
 */
export const convertGetItemStringToBool = function (getItemString) {
    if (getItemString === 'true') {
        return true;
    } else if (getItemString === 'false') {
        return false;
    } else {
        return getItemString;
    }
};

/**
 * Converts milliseconds to an array [minutes, seconds]
 * @param {string} ms - Time in milliseconds
 */
export const convertMsToMinutesAndSeconds = function (ms) {
    const totalSeconds = ms / 1000;
    const minutes = addZeroToTime(Math.floor(totalSeconds / 60));
    const seconds = addZeroToTime(Math.floor(totalSeconds - minutes * 60));
    return [minutes, seconds];
};
