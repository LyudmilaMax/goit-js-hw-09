import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = formEl.querySelector('[name="delay"]');
const stepEl = formEl.querySelector('[name="step"]');
const amountEl = formEl.querySelector('[name="amount"]');

let keyDelay = 'PROMISE_DELAY';
let keyStep = 'PROMISE_STEP';
let keyAmount = 'PROMISE_AMOUNT';

delayEl.value = Number(localStorage.getItem(keyDelay));
stepEl.value = Number(localStorage.getItem(keyStep));
amountEl.value = Number(localStorage.getItem(keyAmount));

delayEl.addEventListener('input', evt => {
  localStorage.setItem(keyDelay, evt.target.value);
});
stepEl.addEventListener('input', evt => {
  localStorage.setItem(keyStep, evt.target.value);
});

amountEl.addEventListener('input', evt => {
  localStorage.setItem(keyAmount, evt.target.value);
});

formEl.addEventListener('submit', onSubmitCreatePromise);

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
