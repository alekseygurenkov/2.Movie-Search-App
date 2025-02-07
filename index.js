// URL и API ключ для взаимодействия с OMDb API
const URL = 'https://www.omdbapi.com';
const OMDb_API_KEY = 'apikey=e810fced'; // Сгенерить свой ключ на сервисе через e-mail регистрацию

// Получение DOM-элементов
const searchInputNode = document.getElementById('js-name-film');
const searchBtnNode = document.getElementById('js-search-btn');
const searchListNode = document.getElementById('js-movie-list');

// Получение данных от пользователя
const getNameFilmFromUser = () => {
    if (!searchInputNode.value) return null;
    return searchInputNode.value;
};

// Функция для добавления элемента "Загрузка" в список
const preloaded = () => {
    searchListNode.innerHTML = '';
    const preloaded = document.createElement('li');
    preloaded.classList.add('preloaded');
    preloaded.textContent = 'Загрузка';
    searchListNode.append(preloaded);
    return preloaded;
};

// Очистка поля ввода
const clearInput = () => {
    searchInputNode.value = '';
};

// Функция для обработки случая, когда фильм не найден
const getFilmUndefined = (filmsArray) => {
    if (filmsArray === undefined) {
        const undefinedItem = document.createElement('li');
        undefinedItem.classList.add('item-undefined');
        undefinedItem.textContent = 'Фильмы не найдены';
        searchListNode.append(undefinedItem);
        return;
    }
};

// Функция для создания HTML-элементов списка фильмов
const getFilmItem = (filmsArray) => {
    let elementListHTML = '';
    filmsArray.forEach(element => {
        elementListHTML += `
        <li class="movie-app__item item">
            <a href="/SD.CODE__Movie-Search-App/film.html?i=${element.imdbID}" class="item__link">
                <img class="item__img" src="${element.Poster}" alt="${element.Title}"/>
                <h2 class="item__title">${element.Title}</h2>
                <p class="item__year">${element.Year}</p>
                <p class="item__type">${element.Type}</p>
            </a>
        </li>
        `;
    });
    return elementListHTML;
};

// Функция для отрисовки списка фильмов
const renderFilmList = (elementListHTML) => {
    searchListNode.innerHTML = elementListHTML;
};

// Функция для выполнения fetch-запроса
const getFetch = async (filmName) => {
    const response = await fetch(`${URL}/?s=${filmName}&${OMDb_API_KEY}`);
    const json = await response.json();
    searchListNode.innerHTML = '';
    const filmsArray = json.Search;
    getFilmUndefined(filmsArray);
    renderFilmList(getFilmItem(filmsArray));
};

// Обработчик нажатия кнопки поиска
const searchFilmsButtonHandler = () => {
    const newResponseFormUser = getNameFilmFromUser();
    if (!newResponseFormUser) return;
    preloaded();
    getFetch(newResponseFormUser);
    clearInput();
};

searchBtnNode.addEventListener('click', searchFilmsButtonHandler);