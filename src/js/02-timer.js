import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const timer = document.querySelectorAll('.timer span.value');
const startBtn = document.querySelector('[data-start]');
let deadline = new Date();
const today = Date.now();
startBtn.disabled = true;
dateInput.disabled = false;

const flatpickr = flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0];
    if (deadline < today) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  dateInput.disabled = true;
  const intervalId = setInterval(() => {
    const today = Date.now();
    const delta = deadline - today;

    if (delta <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      dateInput.disabled = false;
      Notiflix.Notify.success('Time is running out!');
      return;
    }
    const data = getTimeComponents(delta);
    Object.entries(data).forEach(([name, value], index) => {
      timer[index].textContent = pad(value);
    });
  }, 1000);
}

function getTimeComponents(delta) {
  const days = Math.floor(delta / 1000 / 60 / 60 / 24);
  const hours = Math.floor(delta / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(delta / 1000 / 60) % 60;
  const seconds = Math.floor(delta / 1000) % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
