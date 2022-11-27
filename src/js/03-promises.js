import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  amount: document.querySelector('[name="amount"]'),
  step: document.querySelector('[name="step"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

refs.submitBtn.addEventListener('click', onSubmitBtnClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitBtnClick(event) {
  event.preventDefault();

  let delayValue = refs.delay.valueAsNumber;
  const stepValue = refs.step.valueAsNumber;
  const amountValue = refs.amount.valueAsNumber;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}
