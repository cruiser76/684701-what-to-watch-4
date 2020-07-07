const getRandomNumber = (min, max) => {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

const getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const GENRES_LIST = [
  `Comedie`, `Crime`, `Documentary`, `Drama`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thriller`
];

const MOVIES = [
  `Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`,
  `Revenant`, `Johnny, English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`,
  `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`];

MOVIES.length = 8;

const doKeyStr = (el) => {
  return el.replace(/[^а-яёa-z\s]/giu, ``)
    .toLowerCase()
    .split(` `)
    .join(`-`);
};

const getImgSrc = (str) => {
  const newStr = doKeyStr(str);
  return {
    src: `${newStr}.jpg`,
    posterSrc: `${newStr}.jpg`,
    bgSrc: `${newStr}.jpg`
  };
};

const getLevel = (score) => {
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

const FILM_LINK = [
  `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
];

export default MOVIES.map((movie) => {
  const score = getRandomNumber(1, 10);
  const level = getLevel(score);
  const genre = getRandomElement(GENRES_LIST);
  const year = getRandomNumber(1950, 2020);
  const filmLink = getRandomElement(FILM_LINK);

  return (
    {
      img: getImgSrc(movie),
      brief: {
        title: movie,
        genre,
        year,
        score,
        level,
        filmLink
      },
      link: `movie-page.html`,
      key: doKeyStr(movie),
    }
  );
});
