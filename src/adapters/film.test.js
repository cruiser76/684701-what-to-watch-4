import film from './film.js';
import {getLevel} from '../utils.js';

const filmFromServer = {
  'id': `1`,
  'name': `The Grand Budapest Hotel`,
  'poster_image': `img/the-grand-budapest-hotel-poster.jpg`,
  'preview_image': `img/the-grand-budapest-hotel.jpg`,
  'background_image': `img/the-grand-budapest-hotel-bg.jpg`,
  'background_color': `#ffffff`,
  'video_link': `https://some-link`,
  'preview_video_link': `https://some-link`,
  'description': `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  'rating': 8.9,
  'scores_count': 240,
  'director': `Wes Andreson`,
  'starring': [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  'run_time': 99,
  'genre': `Comedy`,
  'released': 2014,
  'is_favorite': false
};

it(`Film adapter work correctly`, () => {
  expect(film(filmFromServer)).toEqual({
    img: {
      src: filmFromServer.preview_image,
      posterSrc: filmFromServer.poster_image,
      bgSrc: filmFromServer.background_image
    },
    brief: {
      title: filmFromServer.name,
      genre: filmFromServer.genre,
      year: filmFromServer.released,
      score: filmFromServer.rating,
      level: getLevel(filmFromServer.rating),
      filmLink: filmFromServer.video_link,
      previewLink: filmFromServer.preview_video_link,
      scoresCount: filmFromServer.scores_count,
      description: filmFromServer.description,
      director: filmFromServer.director,
      starring: filmFromServer.starring,
    },
    runTime: filmFromServer.run_time,
    link: `movie-page.html`,
    key: filmFromServer.id,
    backgroundColor: filmFromServer.background_color,
    isFavorite: filmFromServer.is_favorite
  });
});
