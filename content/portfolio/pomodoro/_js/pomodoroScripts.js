let pomodoroStatus = document.querySelector("#pomodoroStatus");
let pomodoroTimer = document.querySelector("#pomodoroTimer");
let pomodoroMenu = document.querySelector("#pomodoroMenu");
let pomodoroStart25 = document.querySelector("#pomodoroStart25");
let pomodoroSet = document.querySelector("#pomodoroSet");
let spans = pomodoroTimer.querySelectorAll("span");

let timerWorker = new Worker("./_js/timerWorker.js");

timerWorker.addEventListener("message", (event) => {
  console.log("GOT");
  spans[0].textContent = event.data[2][0];
  spans[1].textContent = event.data[2][1];
  spans[3].textContent = event.data[2][2];
  spans[4].textContent = event.data[2][3];
  //event.currentTarget.postMessage([event.data[0], event.data[1]]);
});

//let runTimer = (timeLeft, lastDate) => {
let runTimer = (myArr) => {
  timerWorker.postMessage(myArr);
  //let newDate = Date.now();
  //setTimeout(runTimer, 1000, timeLeft, newDate);
}

pomodoroStart25.addEventListener("click", (event) => {
  pomodoroStatus.style.color = "#34e03f";
  pomodoroStatus.textContent = "Work";
  let spans = pomodoroTimer.querySelectorAll("span");
  spans[0].textContent = "2";
  spans[1].textContent = "5";
  spans[3].textContent = "0";
  spans[4].textContent = "0";
  runTimer([25*60, Date.now()]);
});

pomodoroSet.addEventListener("click", (event) => {
  pomodoroMenu.style.display = "none";
});
