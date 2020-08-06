import {getLevel} from '../utils.js';

export default function (filmsFromServer) {
  return ({
    img: {
      src: filmsFromServer.preview_image,
      posterSrc: filmsFromServer.poster_image,
      bgSrc: filmsFromServer.background_image
    },
    brief: {
      title: filmsFromServer.name,
      genre: filmsFromServer.genre,
      year: filmsFromServer.released,
      score: filmsFromServer.rating,
      level: getLevel(filmsFromServer.rating),
      filmLink: filmsFromServer.video_link,
      previewLink: filmsFromServer.preview_video_link,
      scoresCount: filmsFromServer.scores_count,
      description: filmsFromServer.description,
      director: filmsFromServer.director,
      starring: filmsFromServer.starring,
    },
    runTime: filmsFromServer.run_time,
    link: `movie-page.html`,
    key: `${filmsFromServer.id}`,
    backgroundColor: filmsFromServer.background_color,
    isFavorite: filmsFromServer.is_favorite
  });
}
