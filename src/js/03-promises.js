import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('button'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const inputAmount = refs.amount.value;
  const inputDelayNumber = Number(refs.delay.value);
  const inputStepNumber = Number(refs.step.value);
  setTimeout(() => {
    for (let i = 0; i < inputAmount; i += 1) {
      let msCount = inputDelayNumber + inputStepNumber * i;
      const position = i + 1;
      createPromise(position, msCount)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, refs.step.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// pomiseCount(5, 1000);
// function pomiseCount(amount, delay) {}
// const amount = refs.amount.textContent;

// setTimeout(() => {
//   for (let i = 1; i < amount; i += 1) {
//     amount = amount + i;
//     return;
//   }

//   console.log(amount);
// }, refs.step.textContent);
