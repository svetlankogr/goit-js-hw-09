const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyBackground = document.body;
btnStart.disabled = false;
btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  const currentColor = getRandomHexColor();
  bodyBackground.style.backgroundColor = currentColor;
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    const currentColor = getRandomHexColor();
    bodyBackground.style.backgroundColor = currentColor;
  }, 1000);
}

function onBtnStopClick() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
