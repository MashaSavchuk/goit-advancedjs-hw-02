import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import "../css/1-timer.css"

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

let usrSelectedDate = null;
let showTimerId = -1;
// users data input and button
const startButton = document.querySelector("button");
const inputField = document.querySelector("input#datetime-picker");
// show timer fileds
const timerDays = document.querySelector("span.value[data-days]");
const timerHours = document.querySelector("span.value[data-hours]");
const timerMins = document.querySelector("span.value[data-minutes]");
const timerSecs = document.querySelector("span.value[data-seconds]");

function showTimer() {
    const leftMs = usrSelectedDate - Date.now();
    if (leftMs <= 400) {
        // clear timer
        clearInterval(showTimerId);

        // user selected date reached
        timerDays.textContent  = '00';
        timerHours.textContent = '00';
        timerMins.textContent  = '00';
        timerSecs.textContent  = '00';

        inputField.disabled = false;
        return;
    }

    const data = convertMs(leftMs);
   
    function formatData(val) { 
        return String(val).padStart(2, '0');
    }
    timerDays.textContent  = formatData(data.days);
    timerHours.textContent = formatData(data.hours);
    timerMins.textContent  = formatData(data.minutes);
    timerSecs.textContent  = formatData(data.seconds);
}  

function isDateInFuture(date) { 
    if (date == null || date <= Date.now()) {
        iziToast.error({
            message: "Please choose a date in the future",
            class: "toast",
            position: "topRight",
            drag: false,
            progressBar: false,
            close: false,
        });
        return false;
    }
    return true;
}

flatpickr(inputField, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (!isDateInFuture(selectedDates[0])) {
            startButton.disabled = true;
            return false;
        }
        // user select the valid date in the future
        usrSelectedDate = selectedDates[0];
        startButton.disabled = false;
    },
});

startButton.onclick = (e) => {
    startButton.disabled = true;
    if (!isDateInFuture(usrSelectedDate)) {
        return;
    }
    
    inputField.disabled = true;
    // Start the timer
    showTimerId = setInterval(showTimer, 1000);
    // And show it immediately
    showTimer();
};

// initial state
startButton.disabled = true;


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
