import {
  currentPageRef,
  filmsListRef,
  pageNumberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
} from './1initialHomePage.js';

const searchFormRef = document.querySelector('.search-film');
const searchInputRef = document.querySelector('.search-film__input');
const btnPrevPageRef = document.querySelector('.btn-prev');
const btnNextPageRef = document.querySelector('.btn-next');
const paginationRef = document.querySelector('.pagination');
const formPageInputRef = document.querySelector('.page-input');
const serviceData = data => {
  paginationRef.classList.remove('is-hidden');
  data.page === 1
    ? btnPrevPageRef.classList.add('is-hidden')
    : btnPrevPageRef.classList.remove('is-hidden');
  data.page === data.total_pages
    ? btnNextPageRef.classList.add('is-hidden')
    : btnNextPageRef.classList.remove('is-hidden');
};

function createFilmList(data) {
  filmsListRef.innerHTML = '';
  data.results.forEach(element => {
    let poster = element.backdrop_path;
    createCardFunc(poster, element.title, element.id);
  });
  serviceData(data);
}

function fetchPopularMoviesListWithServices(pageNumber) {
  filmsListRef.innerHTML = '';
  fetchPopularMoviesList(pageNumber).then(data => {
    serviceData(data);
  });
}

function plaginationNavigation() {
  if (pageNumberObj.inputValue) {
    fetchFilms().then(data => {
      createFilmList(data);
    });
  } else {
    fetchPopularMoviesListWithServices(pageNumberObj.pageNumber);
  }
}

function fetchFilms() {
  const url = `https://api.themoviedb.org/3/search/movie?query=${pageNumberObj.inputValue}&page=${pageNumberObj.pageNumber}&api_key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      pageNumberObj.totalPages = data.total_pages;
      currentPageRef.setAttribute('placeholder', pageNumberObj.pageNumber);

      return data;
    })
    .catch('Произошла ошибка');
}

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  pageNumberObj.inputValue = searchInputRef.value;
  pageNumberObj.pageNumber = 1;
  filmsListRef.innerHTML = '';

  if (pageNumberObj.inputValue) {
    fetchFilms().then(data => {
      if (data.total_pages > 1) {
        createFilmList(data);
      } else {
        let markup = `<h2 class='no-results'>По вашеме запросу ничего не найдено!</h2>`;
        filmsListRef.insertAdjacentHTML('beforeend', markup);
        paginationRef.classList.add('is-hidden');
      }
    });
  } else {
    fetchPopularMoviesListWithServices(pageNumberObj.pageNumber);
  }
});

formPageInputRef.addEventListener('submit', event => {
  event.preventDefault();
  const inputPageNumber = Math.abs(parseInt(currentPageRef.value));
  inputPageNumber <= pageNumberObj.totalPages
    ? (pageNumberObj.pageNumber = inputPageNumber)
    : (pageNumberObj.pageNumber = pageNumberObj.totalPages);
  currentPageRef.value = '';
  plaginationNavigation();
});

paginationRef.addEventListener('click', event => {
  const { target } = event;
  if (target.id === 'btn-prev') {
    pageNumberObj.pageNumber -= 1;
    plaginationNavigation();
  }

  if (target.id === 'btn-next') {
    pageNumberObj.pageNumber += 1;
    plaginationNavigation();
  }
});

export { serviceData };
