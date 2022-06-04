import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timerInput: document.querySelector('input#datetime-picker'),
  timerStartBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('.value[data-days]'),
  timerHours: document.querySelector('.value[data-hours]'),
  timerMinutes: document.querySelector('.value[data-minutes]'),
  timerSeconds: document.querySelector('.value[data-seconds]'),
};

const currentTime = new Date();
// console.log(currentTime);

// const { days, hours, minutes, seconds } = convertMs(currentTime);
// console.log({ days, hours, minutes, seconds });

refs.timerStartBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      Notify.warning('Please choose a date in the  future');
    } else {
      refs.timerStartBtn.disabled = false;
    }
    // const timeSubtraction = selectedDates[0] - currentTime;
    // const { days, hours, minutes, seconds } = convertMs(timeSubtraction);
    // console.log({ days, hours, minutes, seconds });
  },
};
refs.timerStartBtn.addEventListener('click', onStartBtnClick);
flatpickr(refs.timerInput, options);

let timerId = null;
function onStartBtnClick() {
  const inputDate = new Date(refs.timerInput.value);
  //   console.log(inputDate);
  refs.timerStartBtn.disabled = true;
  //   console.log(convertMs(inputDate));
  //   console.log(convertMs(currentTime));

  timerId = setInterval(() => {
    const timeSubtraction = inputDate - new Date();
    const time = convertMs(timeSubtraction);
    console.log(convertMs(timeSubtraction));
    updateTextComponent(time);
    if (timeSubtraction < 1) {
      clearInterval(timerId);
      Notify.info('Time is up');
    }
  }, 1000);

  //   const subtraction = inputDate - new Date();

  //   console.log(subtraction);
  //   setTimeout(() => {
  //     clearInterval(timerId);
  //     Notify.info('Time is up');
  //   }, subtraction);
}
//   setInterval(() => {
//     const inputDateMs = inputDate.getTime(refs.timerInput.value);
//     // console.log(inputDate);
//     //   const asd = convertMs(inputDate);
//     //   console.log(asd);

//     //   const asd = { days, hours, minutes, seconds };
//     console.log(inputDateMs);
//     console.log(currentTime);
//     const timeSubtraction = inputDateMs - currentTime;
//     const zxc = convertMs(timeSubtraction);
//     console.log(zxc);
//     console.log(timeSubtraction);
//     const { days, hours, minutes, seconds } = convertMs(inputDateMs);
//     console.log({ days, hours, minutes, seconds });
//   }, 3000);
//   refs.timerDays.textContent = days.value;
//   refs.timerStartBtn.disabled = true;

function updateTextComponent({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
}
// const date = new Date();
// console.log(date.toLocaleString());

refs.timerStartBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
