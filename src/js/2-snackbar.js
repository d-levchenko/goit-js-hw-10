import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// `✅ Fulfilled promise in ${delay}ms`;
// `❌ Rejected promise in ${delay}ms`

const valueDelay = document.querySelector('.form-delay-input');

const makePromise = ({ value, valueDelay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, valueDelay);
  });
};

makePromise({ value, delay: valueDelay }).then(value =>
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: '#fff',
    backgroundColor: '#59a10d',
    title: 'OK',
    position: 'topRight',
    icon: 'fa-solid fa-check',
    iconColor: 'rgb(0, 0, 0)',
  }),
);
