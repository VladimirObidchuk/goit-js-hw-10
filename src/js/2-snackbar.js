import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radioChoice = document.querySelectorAll("input[type='radio']");
const delayInitial = document.querySelector("input[type='number']");
const formSubmit = document.querySelector('.form');

formSubmit.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(delayInitial.value);
  const choice = Array.from(radioChoice).find(radio => radio.checked)?.value;

  // Додаткові логи для діагностики
  console.log('Delay value:', delay);
  console.log('Selected choice:', choice);

  if (!delay || !choice) {
    iziToast.warning({
      title: 'Caution',
      iconUrl: './img/caution.svg',
      message: 'Please enter a valid delay and select an option',
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutUp',
    });
    return;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choice === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(result => {
      console.log(result);

      iziToast.success({
        title: 'OK',
        iconUrl: './img/success.svg',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
        timeout: delay,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        iconUrl: './img/error.svg',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
        timeout: delay,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
    });
  formSubmit.reset();
});
// class MessageAlert {
//   constructor(
//     title,
//     iconUrl,
//     message,
//     position,
//     timeout,
//     transitionIn,
//     transitionOut
//   ) {
//     this.title = title;
//     this.iconUrl = iconUrl;
//     this.message = message;
//     this.position = position;
//     this.timeout = timeout;
//     this.transitionIn = transitionIn;
//     this.transitionOut = transitionOut;
//   }
//   info() {
//     iziToast.info({
//       title: this.title,
//       iconUrl: this.iconUrl,
//       message: this.message,
//       position: this.position,
//       timeout: this.timeout,
//       transitionIn: this.transitionIn,
//       transitionOut: this.transitionOut,
//     });
//   }
//   success() {
//     setTimeout(() => {
//       iziToast.success({
//         title: this.title,
//         iconUrl: this.iconUrl,
//         message: this.message,
//         position: this.position,
//         timeout: this.timeout,
//         transitionIn: this.transitionIn,
//         transitionOut: this.transitionOut,
//       });
//     }, delay);
//   }
//   error() {
//     setTimeout(() => {
//       iziToast.error({
//         title: this.title,
//         iconUrl: this.iconUrl,
//         message: this.message,
//         position: this.position,
//         timeout: this.timeout,
//         transitionIn: this.transitionIn,
//         transitionOut: this.transitionOut,
//       });
//     }, delay);
//   }
//   caution() {
//     iziToast.warning({
//       title: this.title,
//       iconUrl: this.iconUrl,
//       message: this.message,
//       position: this.position,
//       timeout: this.timeout,
//       transitionIn: this.transitionIn,
//       transitionOut: this.transitionOut,
//     });
//   }
// }
// class ErrorAlert extends MessageAlert {
//   constructor(message) {
//     super(
//       'Error',
//       './img/error.svg',
//       message,
//       'topRight',
//       delay,
//       'fadeInDown',
//       'fadeOutUp'
//     );
//   }
// }
// class SuccessAlert extends MessageAlert {
//   constructor(message) {
//     super(
//       'OK',
//       './img/success.svg',
//       message,
//       'topRight',
//       delay,
//       'fadeInDown',
//       'fadeOutUp'
//     );
//   }
// }
// class InfoAlert extends MessageAlert {
//   constructor(message) {
//     super(
//       'Hellow',
//       './img/bell.svg',
//       message,
//       'topRight',
//       5000,
//       'fadeInDown',
//       'fadeOutUp'
//     );
//   }
// }
// class cautionAlert extends MessageAlert {
//   constructor(message) {
//     super(
//       'Caution',
//       './img/caution.svg',
//       message,
//       'topRight',
//       5000,
//       'fadeInDown',
//       'fadeOutUp'
//     );
//   }
// }
// const infoAlertMessage = new InfoAlert(`Welcome!`);
// infoAlertMessage.info();

// let radioValue = null;
// let delay = null;
// radioChoice.forEach(radio => {
//   radio.addEventListener('click', e => {
//     radioValue = e.target.value;
//   });
// });
// delayInitial.addEventListener('input', e => {
//   delay = e.target.value;
// });

// formSubmit.addEventListener('click', e => {
//   e.preventDefault();

//   const succesAlertMessage = new SuccessAlert(
//     `✅ Fulfilled promise in ${delay}ms`
//   );
//   const errorAlertMessage = new ErrorAlert(`❌ Rejected promise in ${delay}ms`);
//   const cautionAlertMessage = new cautionAlert(`You forgot important data`);

//   if (!radioValue || !delay) {
//     cautionAlertMessage.caution();
//   } else if (radioValue === 'fulfilled') {
//     succesAlertMessage.success();
//   } else if (radioValue === 'rejected') {
//     errorAlertMessage.error();
//   }
// });
