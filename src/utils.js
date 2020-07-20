const formatTimeString = function formatTimeString(str) {
  return str.length > 1 ? str : `0${str}`;
};

export const extend = (a, b) => Object.assign({}, a, b);

export const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

export const getRandomElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export const getTimeFromSec = (timeInSec) => {
  let hours = Math.trunc(timeInSec / 3600).toString();
  let minutes = Math.trunc((timeInSec % 3600) / 60).toString();
  let sec = (timeInSec % 60).toString();

  return `${formatTimeString(hours)}:${formatTimeString(minutes)}:${formatTimeString(sec)}`;
};

export const getLevel = (score) => {
  let level = ``;
  if (score < 3) {
    level = `Bad`;
  } else if (score >= 3 && score < 5) {
    level = `Normal`;
  } else if (score >= 5 && score < 8) {
    level = `Good`;
  } else if (score >= 8 && score < 10) {
    level = `Very Good`;
  } else if (score === 10) {
    level = `Awesome`;
  }

  return level;
};
