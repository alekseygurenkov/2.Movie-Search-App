New project

Эти ссылки пригодятся для работы:

1) https://jsonplaceholder.typicode.com/

2) https://www.omdbapi.com/

3) https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa



https://www.figma.com/file/T8bPlwLaMXUtu5HXUoUToS/Movie-Search-App?type=design&node-id=0%3A1&t=wwBZFhpHw2qkArPW-1



Этот код подключает предварительное соединение (preconnect) с хостом шрифтов Google, расположенным по адресу `fonts.gstatic.com`. Вот что он делает:

1. **Предварительное установление соединения**: Браузер заранее устанавливает соединение с указанным хостом, выполняя необходимые циклы приема и обработки запросов (DNS-поиск, TCP "рукопожатия" и "переговоры" TLS) до того, как они понадобятся.

2. **Уменьшение задержки**: Предварительное соединение уменьшает количество циклов приема и обработки, что может значительно сократить время загрузки страницы, особенно на медленных соединениях или при нестабильном интернете.

3. **Атрибут crossorigin**: Этот атрибут необходим, так как спецификации начертания шрифта требуют, чтобы шрифты загружались в "анонимном режиме".

Таким образом, использование `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` помогает ускорить загрузку веб-шрифтов с Google Fonts и уменьшает задержки, связанные с их загрузкой.

Этот код также устанавливает предварительное соединение с другим важным хостом Google Fonts, расположенным по адресу `fonts.googleapis.com`. Вот основные преимущества и функции этого подключения:

1. **Предварительное установление соединения**: Подобно `fonts.gstatic.com`, этот элемент указывает браузеру заранее установить соединение с `fonts.googleapis.com`, что включает в себя выполнение DNS-поиска и установление TLS-соединения.

2. **Оптимизация загрузки шрифтов**: Google Fonts часто используется для загрузки веб-шрифтов на сайты. Предварительное соединение помогает уменьшить задержки, связанные с загрузкой этих шрифтов, так как браузер начинает процесс подключения до того, как фактически запрашивает ресурсы.

3. **Предотвращение "флеш-оф-анстилед-текст"**: В некоторых браузерах, таких как Mozilla Firefox, может возникнуть "флеш-оф-анстилед-текст" (миг нестилизованного текста), когда шрифт загружается с задержкой. Предварительное соединение помогает минимизировать эти задержки, чтобы текст отображался быстрее.

4. **Универсальность и гибкость**: Google не может предсказать точную структуру каждого сайта, который использует их шрифты. Указание предварительного соединения помогает гарантировать, что браузер начнет процесс подключения независимо от расположения элементов шрифта в HTML-коде.

Таким образом, использование `<link rel="preconnect" href="https://fonts.googleapis.com" />` улучшает взаимодействие с пользователем, ускоряя загрузку необходимых ресурсов и обеспечивая более плавный рендеринг текста на веб-странице.



Разбор кода Алисой


```javascript
// URL и API ключ для взаимодействия с OMDb API
const URL = 'https://www.omdbapi.com';
const OMDb_API_KEY = 'apikey=e810fced';

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
```

### Комментарии к коду:

1. **Константы**:
    ```javascript
    // URL и API ключ для взаимодействия с OMDb API
    const URL = 'https://www.omdbapi.com';
    const OMDb_API_KEY = 'apikey=e810fced';
    ```
    - **URL**: URL-адрес API OMDb, который будет использоваться для запросов.
    - **OMDb_API_KEY**: API ключ, необходимый для легального использования сервиса.

2. **Получение DOM-элементов**:
    ```javascript
    const searchInputNode = document.getElementById('js-name-film');
    const searchBtnNode = document.getElementById('js-search-btn');
    const searchListNode = document.getElementById('js-movie-list');
    ```
    - Эти переменные будут использоваться для взаимодействия с элементами на странице.

3. **Получение данных от пользователя**:
    ```javascript
    const getNameFilmFromUser = () => {
        if (!searchInputNode.value) return null;
        return searchInputNode.value;
    };
    ```
    - Функция получает значение из поля ввода и возвращает его, если оно не пустое.