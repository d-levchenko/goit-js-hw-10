import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const shouldResolve =
    document.querySelector('input[name="state"]:checked').value === 'fulfilled';
  const delay = Number(form.elements.delay.value);

  makePromise({ delay, shouldResolve })
    .then(delay =>
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',

        icon: 'bi bi-check2-circle',
        iconColor: '#fff',
      }),
    )
    .catch(delay =>
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',

        icon: 'bi bi-x-octagon',
        iconColor: '#fff',
      }),
    );

  form.reset();
});
