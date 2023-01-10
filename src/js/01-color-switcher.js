// Звернутися до розмітки HTML
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const documentBodyStyle = document.body.style;

// Прив'язати слухача події на кнопки 'start', 'stop'
btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

//Змінна, в якій зберігаємо id інтервального повторення
let idInterval = null;

//Зробити кнопку 'start'  активною, а кнопку 'stop' неактивною
setDisabledAndEnabledBtn(false);

// Обробник кліка на кнопку 'start'
function onBtnStart(evt) {
    // Закрити кнопку 'start' і відкрити кнопку 'stop'
    setDisabledAndEnabledBtn(true);

    // Виконати інтервальне повторення зміни кольору фону кожну секунду
    // Результат записати в idInterval, щоб потім його можна було по id відключити
    idInterval = setInterval(() => {
        documentBodyStyle.backgroundColor = getRandomHexColor();
    }, 1000);
}

// Oбробник кліка на кнопку 'stop'
function onBtnStop(evt) {
    //Закрити кнопку 'stop' і відкрити кнопку 'start'
    setDisabledAndEnabledBtn(false);
    //Відключити інтервальне повторення зміни кольору по id
    clearInterval(idInterval);
}

/**
 * Управління доступністю та недоступністю кнопок 'start' та 'stop'
 * @param {boolean} setDisabledStartBtn При True, зробити недоступною кнопку 'start', і доступною кнопку 'stop'. При false - навпаки.
 */
function setDisabledAndEnabledBtn(setDisabledStartBtn) {
    btnStart.disabled = setDisabledStartBtn;
    btnStop.disabled = !setDisabledStartBtn;
}

//Генерує рандомний колір
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
