function buildCurrentData() {
  let currDay = new Date().getUTCDay();
  let currHour = new Date().getUTCHours();
  let currMinutes = new Date().getUTCMinutes();
  let currSeconds = new Date().getUTCSeconds();
  return {
    day: currDay,
    hour: currHour,
    minute: currMinutes,
    second: currSeconds
  };
}

function getUpcomingEvents(events, day, blockIndex) {
  let upcomingEventStack = [];
  let currDay = day;
  for (let j = blockIndex; j < 6; j++) {
    upcomingEventStack.push(events.weekday[day].events[j]);
  }
  for (let i = 1; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      upcomingEventStack.push(events.weekday[(day + i) % 7].events[j]);
    }
  }
  for (let j = 0; j < blockIndex; j++) {
    upcomingEventStack.push(events.weekday[day].events[j]);
  }
  return upcomingEventStack;
}

async function buildEventStack(date) {
  let events = await fetch("./json/events.json");
  events = await events.json();
  let blockIndex = 0;
  if (date.hour < 4) {
    blockIndex = 0;
  } else if (date.hour < 8) {
    blockIndex = 1;
  } else if (date.hour < 12) {
    blockIndex = 2;
  } else if (date.hour < 16) {
    blockIndex = 3;
  } else if (date.hour < 20) {
    blockIndex = 4;
  } else if (date.hour < 24) {
    blockIndex = 5;
  }
  let upcomingEvents = getUpcomingEvents(events, date.day, blockIndex);
  return upcomingEvents;
}

async function buildEventStack2(date) {
  let events = await fetch("./json/events-test.json");
  events = await events.json();
  let blockIndex = 0;
  if (date.hour < 4) {
    blockIndex = 0;
  } else if (date.hour < 8) {
    blockIndex = 1;
  } else if (date.hour < 12) {
    blockIndex = 2;
  } else if (date.hour < 16) {
    blockIndex = 3;
  } else if (date.hour < 20) {
    blockIndex = 4;
  } else if (date.hour < 24) {
    blockIndex = 5;
  }
  let upcomingEvents = getUpcomingEvents(events, date.day, blockIndex);
  return upcomingEvents;
}

function applyEventStyles(block) {
  if (block.textContent == "Barbarian War") {
    block.className = "eventName barbarianWar";
  } else if (block.textContent == "Clean Up") {
    block.className = "eventName cleanUp";
  } else if (block.textContent == "Fullspeed Build") {
    block.className = "eventName fullspeedBuild";
  } else if (block.textContent == "Fast Training") {
    block.className = "eventName fastTraining";
  } else if (block.textContent == "Power Up") {
    block.className = "eventName powerUp";
  } else if (block.textContent == "Research Master") {
    block.className = "eventName researchMaster";
  } else if (block.textContent == "Whispering Of Runes") {
    block.className = "eventName whisperingOfRunes";
  } else if (block.textContent == "Wish Tree") {
    block.className = "eventName wishTree";
  } else if (block.textContent == "Wolves") {
    block.className = "eventName wolves";
  }
}

function getTimeLeft(currentData, currentEvent) {
  let seconds;
  let minutes;
  let hours;
  seconds = (60 - currentData.second) % 60;
  if (seconds == 0) {
    minutes = (60 - currentData.minute) % 60;
  } else {
    minutes = 59 - currentData.minute;
  }
  if (minutes == 0 && seconds == 0) {
    currentEvent.endTime - currentData.hour >= 0
      ? (hours = currentEvent.endTime - currentData.hour)
      : (hours = currentEvent.endTime - currentData.hour + 24);
  } else {
    currentEvent.endTime - currentData.hour - 1 >= 0
      ? (hours = currentEvent.endTime - currentData.hour - 1)
      : (hours = currentEvent.endTime - currentData.hour + 23);
  }
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function setTimer(hours, minutes, seconds, timeStamp, eventStack, i) {
  let daysDiv = "";
  if (i == 0) {
    daysDiv = "0 d";
  } else {
    daysDiv = String(Math.floor((hours + (i - 1) * 4) / 24)) + " d";
  }
  let hoursDiv = "";
  if (i == 0) {
    hoursDiv = String(hours).padStart(2, "0") + " h";
  } else {
    hoursDiv = String((hours + (i - 1) * 4) % 24).padStart(2, "0") + " h";
  }
  let minutesDiv = String(minutes).padStart(2, "0") + " m";
  let secondsDiv = String(seconds).padStart(2, "0") + " s";
  timeStamp.querySelector(".timeDiv").textContent = String(
    daysDiv + " : " + hoursDiv + " : " + minutesDiv + " : " + secondsDiv
  );
}

function showEventBlocks() {
  let currentData = buildCurrentData();
  let eventStack = [];
  buildEventStack(currentData).then(stack => {
    eventStack = stack;
    let timeLeft = getTimeLeft(currentData, eventStack[0]);
    for (let i = 0; i < eventStack.length; i++) {
      let block = document.createElement("div");
      block.className = "eventBlock";
      if (i == 0) {
        block.className += " currentBlock";
      }
      let timeWindow = document.createElement("div");
      timeWindow.className = "timeWindow";
      timeWindow.innerHTML =
        "Time Window: <br>" +
        eventStack[i].startTime +
        ":00 - " +
        eventStack[i].endTime +
        ":00";
      block.append(timeWindow);

      let eventName = document.createElement("div");
      eventName.className = "eventName";
      eventName.textContent = eventStack[i].name;
      applyEventStyles(eventName);
      block.append(eventName);

      let timeStamp = document.createElement("div");
      timeStamp.className = "timeStamp";
      let timeInfo = document.createElement("div");
      timeInfo.className = "timeInfo";
      let timeDiv = document.createElement("div");
      timeDiv.className = "timeDiv";
      if (i == 0) {
        timeInfo.textContent = "Event ends in:";
      } else {
        timeInfo.textContent = "Event starts in:";
      }
      timeStamp.append(timeInfo);
      timeStamp.append(timeDiv);
      setTimer(
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds,
        timeStamp,
        eventStack,
        i
      );
      block.append(timeStamp);
      document.getElementById("schedule").append(block);
    }

    let timeStamps = Array.from(
      document.querySelectorAll("#schedule .timeStamp")
    );
    let eventTimer = setInterval(() => {
      currentData = buildCurrentData();
      timeLeft = getTimeLeft(currentData, eventStack[0]);
      for (let i = 0; i < eventStack.length; i++) {
        setTimer(
          timeLeft.hours,
          timeLeft.minutes,
          timeLeft.seconds,
          timeStamps[i],
          eventStack,
          i
        );
      }
      if (
        timeLeft.hours == 0 &&
        timeLeft.minutes == 0 &&
        timeLeft.seconds == 0
      ) {
        setTimeout(() => {
          buildEventStack(currentData).then(stack => {
            eventStack = stack;
            let events = document.querySelectorAll(".eventBlock");
            for (let i = 0; i < eventStack.length; i++) {
              events[i].querySelector(".timeWindow").innerHTML =
                "Time Window: <br>" +
                eventStack[i].startTime +
                ":00 - " +
                eventStack[i].endTime +
                ":00";
              events[i].querySelector(".eventName").textContent =
                eventStack[i].name;
              applyEventStyles(events[i].querySelector(".eventName"));
            }
          });
        }, 1000);
      }
    }, 1000);
  });
}

showEventBlocks();
