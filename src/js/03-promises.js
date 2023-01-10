// Імпорт для відображення повідомлень користувачеві
import Notiflix from 'notiflix';

// Звернутися до розмітки HTML
const formEl = document.querySelector('.form');
const delayEl = formEl.querySelector('[name="delay"]');
const stepEl = formEl.querySelector('[name="step"]');
const amountEl = formEl.querySelector('[name="amount"]');

// Оголошенні змінні ключів веб-сховища LocalStorаge
let keyDelay = 'PROMISE_DELAY';
let keyStep = 'PROMISE_STEP';
let keyAmount = 'PROMISE_AMOUNT';

// Ініціалізація значеннями останнього введеня (збереженними в LocalStorage)
delayEl.value = Number(localStorage.getItem(keyDelay));
stepEl.value = Number(localStorage.getItem(keyStep));
amountEl.value = Number(localStorage.getItem(keyAmount));

// Зберегти значення в LocalStorage
delayEl.addEventListener('input', evt => {
  localStorage.setItem(keyDelay, evt.target.value);
});
stepEl.addEventListener('input', evt => {
  localStorage.setItem(keyStep, evt.target.value);
});

amountEl.addEventListener('input', evt => {
  localStorage.setItem(keyAmount, evt.target.value);
});

//Додати тип події "submit" на кнопку "Create promises"
formEl.addEventListener('submit', onSubmitCreatePromise);

// ФУНКЦІЯ. Створення всіх промісів по введених параметрах
function onSubmitCreatePromise(evt) {
  evt.preventDefault();
  let delayValue = Number(delayEl.value);
  let stepValue = Number(stepEl.value);
  let amountValue = Number(amountEl.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }
}

// ФУНКЦІЯ. Створює Promise.
function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.5;

      const resultObject = { position, delay };

      if (shouldResolve) {
        res(resultObject);
      } else {
        rej(resultObject);
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
