import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputFp = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
inputFp.classList.add('input-disabled');
startButton.classList.add('button-disabled');
startButton.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
    console.log(userSelectedDate);
  },
};
flatpickr(inputFp, options);

const addLeadingZero = value => value.toString().padStart(2, '0');

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function startCountDown(targetDate) {
  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      alert('Time is up!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      document.querySelector('[data-days]').textContent = days;
      document.querySelector('[data-hours]').textContent = hours;
      document.querySelector('[data-minutes]').textContent = minutes;
      document.querySelector('[data-seconds]').textContent = seconds;
    }
  }, 1000);
}

startButton.addEventListener('click', () => {
  startCountDown(userSelectedDate);
  startButton.disabled = true;
});
