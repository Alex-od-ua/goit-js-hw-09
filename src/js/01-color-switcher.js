const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

let updateBgColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  const newBgColor = getRandomHexColor();
  refs.body.style.backgroundColor = newBgColor;
}

function onStartButtonClick() {
  console.log(onStartButtonClick);
  changeBgColor();

  updateBgColor = setInterval(() => {
    changeBgColor();
  }, 1000);

  refs.startButton.setAttribute('disabled', true);
  refs.stopButton.removeAttribute('disabled', true);
}

function onStopButtonClick() {
  clearInterval(updateBgColor);

  refs.startButton.removeAttribute('disabled', true);
  refs.stopButton.setAttribute('disabled', true);
}
