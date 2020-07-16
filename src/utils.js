const formatTimeString = function formatTimeString(str) {
  return str.length > 1 ? str : `0${str}`;
};

export const extend = (a, b) => Object.assign({}, a, b);

export const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

export const getRandomElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export const getTimeFromSec = (timeInSec) => {
  let hours = Math.trunc(timeInSec / 3600).toString();
  let minutes = Math.trunc((timeInSec % 3600) / 60).toString();
  let sec = (timeInSec % (3600 * 60)).toString();

  return `${formatTimeString(hours)}:${formatTimeString(minutes)}:${formatTimeString(sec)}`;
};
