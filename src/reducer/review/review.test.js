import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './review.js';

const api = createAPI(() => {});

const reviews = [
  {
    "id": 1,
    "user": {
      "id": 4,
      "name": `Kate Muir`
    },
    "rating": 8.9,
    "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    "date": `2019-05-08T14:13:56.569Z`
  }
];

it(`Reducer without add parameters return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    isSavingReview: false,
    currentReviews: [],
    isLoadingReviews: true,
    isErrorPost: false
  });
});

it(`Reducer should update current reviews`, () => {
  expect(reducer({
    currentReviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  })).toEqual({
    currentReviews: reviews,
  });
});

it(`Reducer should change isSavingReview`, () => {
  expect(reducer({
    isSavingReview: false,
  }, {
    type: ActionType.POST_REVIEW,
    payload: true,
  })).toEqual({
    isSavingReview: true,
  });
});

it(`Reducer should change isErrorPost`, () => {
  expect(reducer({
    isErrorPost: false,
  }, {
    type: ActionType.IS_ERROR_POST,
    payload: true,
  })).toEqual({
    isErrorPost: true,
  });
});

it(`Reducer should change isLoadingReview`, () => {
  expect(reducer({
    isLoadingReviews: false,
  }, {
    type: ActionType.IS_LOADING_REVIEWS,
    payload: true,
  })).toEqual({
    isLoadingReviews: true,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to post /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsPost = Operation.postReview({rating: 2, comment: ``}, 1);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsPost(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.IS_ERROR_POST,
          payload: false,
        });
      });
  });
});
