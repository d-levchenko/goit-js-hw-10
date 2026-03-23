import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('.data-button');
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);

    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        icon: 'bi bi-x-octagon',
        iconColor: '#fff',
      });
      startButton.classList.remove('data-button-active');
      startButton.disabled = true;
    } else {
      startButton.classList.add('data-button-active');
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

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

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const inputField = document.getElementById('datetime-picker');

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  inputField.disabled = true;

  const startCount = setInterval(() => {
    const difference = userSelectedDate - Date.now();

    if (difference <= 0) {
      clearInterval(startCount);
      startButton.classList.add('data-button-active');
      startButton.disabled = false;
      inputField.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
    startButton.classList.remove('data-button-active');
  }, 1000);
});
