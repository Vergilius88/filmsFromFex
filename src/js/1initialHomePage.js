'use strict';
import filmsListTpl from '../templates/films-list-tpl.hbs';

const currentPageRef = document.querySelector('.current-page');
const filmsListRef = document.querySelector('.js-films-list');

filmsListRef.classList.add('films-list');
filmsListRef.classList.add('flex-container');

let renderFilms = [];
let genres;
const pageNumberObj = {
  pageNumber: 1,
  totalPages: 0,
  inputValue: '',
};
const apiKey = 'fa9fa54083c479003851c965e04509d5';

function createCardFunc(imgPath, filmTitle, movieId) {
  renderFilms = [
    {
      backdrop_path: imgPath,
      title: filmTitle,
      id: movieId,
    },
  ];
  filmsListRef.insertAdjacentHTML('beforeend', filmsListTpl(renderFilms));
}

const fetchPopularMoviesList = (page = 1) => {
  const urlForPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${page}`;
  return fetch(urlForPopularMovies)
    .then(res => res.json())
    .then(data => {
      pageNumberObj.totalPages = data.total_pages;

      data.results.forEach(element => {
        const date1 = new Date(`${element.release_date} 00:00:00`);
        createCardFunc(
          element.backdrop_path,
          `${element.title} (${date1.getFullYear()})`,
          element.id,
        );
      });

      currentPageRef.setAttribute('placeholder', pageNumberObj.pageNumber);

      return data;
    })
    .catch(error => console.log(error));
};

const fetchGenres = () => {
  const urlForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&results=20`;
  fetch(urlForGenres)
    .then(res => res.json())
    .then(data => {
      genres = data.genres;
    })
    .catch(error => console.log(error));
};

fetchPopularMoviesList(pageNumberObj.pageNumber);

fetchGenres();

export {
  filmsListRef,
  renderFilms,
  genres,
  pageNumberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
  fetchGenres,
  currentPageRef,
};
