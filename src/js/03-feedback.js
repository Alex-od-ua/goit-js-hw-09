import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(formInput, 500));

storageTest();

function formInput(event) {
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const allValue = { email, message };

  const dataStorageSave = localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify(allValue)
  );
}

function formSubmit(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const formData = { email, message };

  if (email === '' || message === '') {
    alert('Заполните все поля');
  }

  console.log(formData);
  // console.log(`Email: ${email}, message: ${message}`);
  form.reset();
  localStorage.clear();
}

function storageTest() {
  const storageData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (storageData) {
    Object.entries(storageData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}

//
//
//
//
//
//
//
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище
// объект с полями email и message, в которых сохраняй текущие значения полей формы.
//  Пусть ключом для хранилища будет строка "feedback-form-state".

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные
// данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями
// email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
//  Для этого добавь в проект и используй библиотеку lodash.throttle.
