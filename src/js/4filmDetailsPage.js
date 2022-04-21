import 'material-design-icons/iconfont/material-icons.css';
import { selectFilm } from './3navigation';

const monitorButtonStatusText = () => {
  let filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  let filmsWatchedInLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );
  if (!filmsQueueInLocalStorage) {
    filmsQueueInLocalStorage = [];
  }
  const includesFilmQueueLS = filmsQueueInLocalStorage.includes(selectFilm.id);

  if (!filmsWatchedInLocalStorage) {
    filmsWatchedInLocalStorage = [];
  }
  const includesFilmWatchedLS = filmsWatchedInLocalStorage.includes(
    selectFilm.id,
  );

  const buttonQueue = document.querySelector('.details__button-queue');
  const buttonWatched = document.querySelector('.details__button-watched');

  buttonWatched.addEventListener('click', toggleToWatched);
  buttonQueue.addEventListener('click', toggleToQueue);

  if (includesFilmQueueLS) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  }

  if (includesFilmWatchedLS) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
  } else {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  }
};

const toggleToQueue = () => {
  let filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  if (!filmsQueueInLocalStorage) {
    filmsQueueInLocalStorage = [];
  }
  const includesFilmQueueLS = filmsQueueInLocalStorage.includes(selectFilm.id);
  let toQueueArray = filmsQueueInLocalStorage;
  if (!includesFilmQueueLS) {
    toQueueArray.push(selectFilm.id);
  } else {
    toQueueArray = toQueueArray.filter(el => el !== selectFilm.id);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};

const toggleToWatched = () => {
  let filmsWatchedInLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );
  if (!filmsWatchedInLocalStorage) {
    filmsWatchedInLocalStorage = [];
  }
  const includesFilmWatchedLS = filmsWatchedInLocalStorage.includes(
    selectFilm.id,
  );
  let toWatchedArray = filmsWatchedInLocalStorage;
  if (!includesFilmWatchedLS) {
    toWatchedArray.push(selectFilm.id);
  } else {
    toWatchedArray = toWatchedArray.filter(el => el !== selectFilm.id);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};

export { monitorButtonStatusText };
