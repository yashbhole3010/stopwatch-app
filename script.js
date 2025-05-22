let startTime;
let interval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(interval);
    interval = Date.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  display.textContent = "00:00:00:000";
  startStopBtn.textContent = "Start";
  isRunning = false;
  interval = 0;
});

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const milliseconds = currentTime % 1000;
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / 60000) % 60);
  const hours = Math.floor(currentTime / 3600000);

  display.textContent = \`\${pad(hours)}:\${pad(minutes)}:\${pad(seconds)}:\${padMs(milliseconds)}\`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function padMs(number) {
  return number.toString().padStart(3, '0');
}
