// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

// Отримати розмітку HTML
const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
// Обробник події на клік
btnStart.addEventListener('click', onStartTimer);

// В змінну зберігаємо вибрану дату. ПРи старті, в змінну записуємо поточну дату
let selectedDate = new Date();
// Зберігаємо ID таймера, щоб його можна було по ID зупинити
let idTimer = 0;

// Встановити початкову видимість кнопки "Старт". На цьому етапі, кнопка буде завжди задізейблена
setDisabledBtn();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: selectedDate,
    minuteIncrement: 1,
    onClose(selectedDates) {
        // Записати в змінну вибрану дату
        selectedDate = selectedDates[0];
        // При зміні дати зажди зупиняти таймер
        stopTimer();
        // Якщо кнопка неактивна видати вікно-повідомлення
        if (setDisabledBtn()) {
            //alert('Please, choose a date in the future');
            Notiflix.Notify.failure('Please, choose a date in the future');
        }
    },
};
// Прив'язати до input HTML  задану бібліотеку
flatpickr(dateTimePicker, options);

// ФУКЦІЯ. Управління доступністю кнопки "Старт"
function setDisabledBtn() {
    // Кнопка "старт" неактивна, якщо:
    //    1. вибрана дата <=  поточноЇ дати
    //       або
    //    2. таймер запущений
    btnStart.disabled = selectedDate <= new Date() || idTimer != 0;
    return btnStart.disabled;
}

// ФУКЦІЯ. Запустити таймер по кліку на кнопку "старт"
function onStartTimer(evt) {
    // Запам'ятати запущений таймер, щоб його можна було по ID потім зупинити
    idTimer = setInterval(() => {
        // ============ ЦЯ ЧАСТИНА КОДУ ВИКОНУЄТЬСЯ КОЖНУ СЕКУНДУ =======
        // Рахуємо час в мілісекундах між вибраною датою і поточною датою
        let time = selectedDate - Date.now();
        // Якщо час завершиться, то потрібно зупинити таймер і виходимо з коду
        if (time <= 0) {
            stopTimer();
            return;
        }
        // Записуємо отримані значення в HTML
        setTextContent(time);
        // ==============================================================
    }, 1000);
    // При запуску лічильника кнопка стає неактивною
    setDisabledBtn();
}

// ФУНКЦІЯ. Зупиняє таймер
function stopTimer() {
    if (idTimer > 0) {
        // Зупиняє інтервальне повторення
        clearInterval(idTimer);
        // Записуємо в HTML нулі
        setTextContent(0);
        // Затираємо в idTimer значення, щоб розуміти, щоб таймер зупинений
        idTimer = 0;
    }
}

// ФУКЦІЯ. Повертає двохзначне число, доповнене зліва нулем
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

// ФУКЦІЯ. Відображає мілісекунди конвертовані в секунди, хвилини, години і дні на HTML сторінці
function setTextContent(countMiliseconds) {
    let objDate = convertMs(countMiliseconds);
    dataDays.textContent = addLeadingZero(objDate.days);
    dataHours.textContent = addLeadingZero(objDate.hours);
    dataMinutes.textContent = addLeadingZero(objDate.minutes);
    dataSeconds.textContent = addLeadingZero(objDate.seconds);
}

// ФУКЦІЯ. Вираховує з мілісекунд секунди, хвилини, години і дні
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
