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

export const Promo = {
  img: getImgSrc(`The Grand Budapest Hotel Poster`),
  brief: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: 2014,
    score: 8,
    level: `not bad`,
    filmLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  link: `movie-page.html`,
  key: doKeyStr(`The Grand Budapest Hotel`),
};


export default function (filmsFromServer) {
  return filmsFromServer.map((film) => {
    return ({
      img: {
        src: film.preview_image,
        posterSrc: film.poster_image,
        bgSrc: film.background_image
      },
      brief: {
        title: film.name,
        genre: film.genre,
        year: film.released,
        score: film.rating,
        level: getLevel(film.rating),
        filmLink: film.video_link,
        previewLink: film.preview_video_link,
        scoresCount: film.scores_count,
        description: film.description,
        director: film.director,
        starring: film.starring,
      },
      runTime: film.run_time,
      link: `movie-page.html`,
      key: film.id,
      backgroundColor: film.background_color,
      isFavorite: film.is_favorite
    });
  });
}
