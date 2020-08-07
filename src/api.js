import axios from 'axios';
import {Url, AppRoute} from './const.js';
import history from './history.js';
import {AXIOS_TIMEOUT} from './const.js';


const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: AXIOS_TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      if (response.config.url.includes(Url.POST_FAVORITE)) {
        history.push(AppRoute.LOGIN);
      }
      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }
    const node = document.createElement(`div`);
    node.style.cssText = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; fontSize: 30px;`;
    node.textContent = `При загрузке ${response.config.url} возникла ошибка ${err}`;
    document.querySelector(`#root`).insertAdjacentElement(`afterbegin`, node);

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
