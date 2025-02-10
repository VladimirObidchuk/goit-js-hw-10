import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputFp = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

class MessageAlert {
  constructor(title, message, position, timeout, transitionIn, transitionOut) {
    this.title = title;
    this.message = message;
    this.position = position;
    this.timeout = timeout;
    this.transitionIn = transitionIn;
    this.transitionOut = transitionOut;
  }
  info() {
    iziToast.info({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
  success() {
    iziToast.success({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
  error() {
    iziToast.error({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
}
class ErrorAlert extends MessageAlert {
  constructor(message) {
    super('Error', message, 'topRight', 5000, 'fadeInDown', 'fadeOutUp');
  }
}
class SuccessAlert extends MessageAlert {
  constructor(message) {
    super('success', message, 'topRight', 5000, 'fadeInDown', 'fadeOutUp');
  }
}
class InfoAlert extends MessageAlert {
  constructor(message) {
    super('info', message, 'topRight', 5000, 'blue', 'fadeInDown', 'fadeOutUp');
  }
}

startButton.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const errorAlertInstance = new ErrorAlert(
      'Please choose a date in the future!'
    );
    if (userSelectedDate <= new Date()) {
      errorAlertInstance.error();
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
    const InfoAlertInstans = new InfoAlert('Time is up!!');
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);

      InfoAlertInstans.info();
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
