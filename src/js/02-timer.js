import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  addDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else if (selectedDates[0] > new Date()) {
      refs.startBtn.disabled = false;
    }

    refs.startBtn.addEventListener('click', () => {
      timerId = setInterval(() => {
        const timeLeft = selectedDates[0] - new Date();

        if (timeLeft < 1000) {
          clearInterval(timerId);
        }

        const resultTime = convertMs(timeLeft);
        updateClockface(resultTime);
      }, 1000);
    });
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.min.textContent = `${minutes}`;
  refs.sec.textContent = `${seconds}`;
}

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);

// function solution(str, ending) {
//   // TODO: complete

//   //   let ww = toString(str);
//   //   let qq = toString(ending);

//   if (str.includes(ending)) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }

//   //   return str.includes(ending) ? true : false;

//   //   return str.endsWith(ending);
// }

// solution('abcd', 'a');

// console.log(solution);

// function sumTwoSmallestNumbers(numbers) {
//   numbers.sort((previousValue, number) => {
//     if (previousValue < number) {
//       const sum = previousValue + number;
//       console.log(sum);
//     }
//   });
//   //Code here
// }
// sumTwoSmallestNumbers([5, 8, 12, 19, 22]);
// sumTwoSmallestNumbers([15, 28, 4, 2, 43]);
