let startTime, updatedTime, difference, tInterval, running = false;
const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    startStopBtn.innerHTML = "Pause";
    running = true;
    resetBtn.disabled = true;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(tInterval);
    updatedTime = new Date().getTime();
    difference += updatedTime - startTime;
    startStopBtn.innerHTML = "Resume";
    running = false;
    resetBtn.disabled = false;
}

function resetStopwatch() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    timeDisplay.innerHTML = "00:00:00.00";
    lapsList.innerHTML = "";
}

function getShowTime() {
    let now = new Date().getTime();
    let elapsed = difference + (now - startTime);
    
    let hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsed % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    
    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function addLap() {
    let lapItem = document.createElement('li');
    lapItem.textContent = timeDisplay.innerHTML;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', function() {
    if (!running) {
        if (startStopBtn.innerHTML === "Start" || startStopBtn.innerHTML === "Resume") {
            startStopwatch();
        }
    } else {
        pauseStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);

resetStopwatch();