export const extend = (a, b) => Object.assign({}, a, b);

export const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

export const getRandomElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];
