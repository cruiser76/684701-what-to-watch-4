export const PLAYER_DELAY = 1000;
export const NUMBER_FILMS_IN_LIST = 8;
export const AXIOS_TIMEOUT = 5000;

export const AppRoute = {
  MAIN: `/`,
  LOGIN: `/login`,
  PLAYER: `/player/:id`,
  FILMS: `/films/:id`,
  REVIEW: `/films/:id/review`,
  MY_LIST: `/mylist`
};

export const Url = {
  LOGIN: `/login`,
  GET_MOVIES: `/films`,
  GET_PROMO: `/films/promo`,
  GET_FAVORITE: `/favorite`,
  GET_REVIEWS: `/comments`,
  POST_FAVORITE: `/favorite`,
  POST_REVIEW: `/comments`
};

export const Tab = [
  `Overview`,
  `Details`,
  `Reviews`,
];

export const Months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
