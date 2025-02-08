// URL и API ключ для взаимодействия с OMDb API
const URL = 'https://www.omdbapi.com/';
const OMDb_API_KEY = 'apikey=e810fced';

// Извлечение параметров из URL
const params = new URLSearchParams(location.search);
const id = params.get('i');

// DOM-элемент для отображения информации о фильме
const filmInnerNode = document.getElementById('js-film-inner');

// Функция для добавления элемента "Загрузка"
const preloaded = () => {
    const preloaded = document.createElement('p');
    preloaded.classList.add('preloaded');
    preloaded.textContent = 'Загрузка';
    filmInnerNode.append(preloaded);

    return preloaded;
};

// Функция для создания заголовка страницы
const createPageTitle = name => {
    const pageTitle = document.querySelector('title');
    pageTitle.innerText = name;

    return pageTitle;
};

// Функция для рендеринга информации о фильме
const getDataFilm = dataFilm => {
    createPageTitle(dataFilm.Title);

    filmInnerNode.innerHTML = `
    <img
        class="film__img"
        src="${dataFilm.Poster}"
        alt="${dataFilm.Title}"
    />

    <div class="film__box">
        <h2 class="film__title">${dataFilm.Title}</h2>
        <p class="film__desc">
            Год: <span class="film__desc-span">${dataFilm.Year}</span>
        </p>
        <p class="film__desc">
            Рейтинг:
            <span class="film__desc-span">${dataFilm.Rated}</span>
        </p>
        <p class="film__desc">
            Дата выхода:
            <span class="film__desc-span">${dataFilm.Released}</span>
        </p>
        <p class="film__desc">
            Продолжительность:
            <span class="film__desc-span">${dataFilm.Runtime}</span>
        </p>
        <p class="film__desc">
            Жанр: <span class="film__desc-span">${dataFilm.Genre}</span>
        </p>
        <p class="film__desc">
            Режиссер:
            <span class="film__desc-span">${dataFilm.Director}</span>
        </p>
        <p class="film__desc">
            Сценарий:
            <span class="film__desc-span">${dataFilm.Writer}</span>
        </p>
        <p class="film__desc">
            Актеры:
            <span class="film__desc-span">${dataFilm.Actors}</span>
        </p>
    </div>
    <p class="film__about">${dataFilm.Plot}</p>
    `;
};

// Функция для выполнения fetch-запроса за данными фильма
const getFilmFetch = async () => {
    const filmFetch = await fetch(`${URL}?i=${id}&${OMDb_API_KEY}`)
        .then(response => response.json())
        .then(json => getDataFilm(json));

    return filmFetch;
};

// Функция для создания страницы для фильма
const createPageForFilm = () => {
    preloaded();
    getFilmFetch();
};

// Инициализация создания страницы для фильма
createPageForFilm();