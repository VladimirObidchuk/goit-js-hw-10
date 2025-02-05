const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.form');

const formInput = document.getElementById('email');
const formTextarea = document.getElementById('textarea');
const formBtn = document.querySelector('.form__btn');

const emailInput = form.elements.email;
const message = form.elements.message;
const emailErrorSpan = addErrorSpan(emailInput);
const messageErrorSpan = addErrorSpan(message);

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

formBtn.addEventListener('click', e => {
  e.preventDefault();
  const login = emailInput.value.trim();
  const message = formTextarea.value.trim();
  let isValid = true;

  if (!login) {
    alert('Fill please all fields');
    emailErrorSpan.textContent = 'Email is required';
    isValid = false;
  } else {
    emailErrorSpan.textContent = '';
  }
  if (!message) {
    messageErrorSpan.textContent = 'Password is required';
    isValid = false;
  } else {
    messageErrorSpan.textContent = '';
  }

  if (login && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
    emailErrorSpan.textContent = 'Invalid email format';
    isValid = false;
  }
  if (message && message.length < 8) {
    messageErrorSpan.textContent = 'Message must be at least 8 characters long';
    isValid = false;
  }
  if (!isValid) {
    return;
  }

  formData.email = email.value;
  formData.message = message;
  console.log(formData);
  form.reset();
  localStorage.removeItem('feedback-form-state');
});

function addErrorSpan(inputElement) {
  const errorSpan = document.createElement('span');
  errorSpan.className = 'error-message';
  errorSpan.style.color = 'red';
  errorSpan.style.fontSize = '12px';
  errorSpan.style.position = 'absolute';
  errorSpan.style.bottom = '-16px';

  inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
  return errorSpan;
}
window.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    emailInput.value = formData.email;
    formTextarea.value = formData.message;
  }
});
