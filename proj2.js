let timer;
let isRunning = false;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

lapButton.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        lapCounter++;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00:000';
    startStopButton.textContent = 'Start';
    isRunning = false;
    lapsContainer.innerHTML = '';
    lapCounter = 1;
});

function updateTime() {
    elapsedTime += 10;
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    if (number < 10) {
        return '00' + number;
    } else if (number < 100) {
        return '0' + number;
    } else {
        return number;
    }
}
