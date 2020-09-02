onmessage = function(e) {
  let timeLeft = e.data[0];
  let interval = 1000;
  let expected = e.data[1] + interval;
  setTimeout(controlTimer, interval);
  function controlTimer() {
    let newDate = Date.now();
    let lag = newDate - expected;
    console.log("LAGGING BY", lag);
    timeLeft -= 1;
    expected += interval;
    let spans = [];
    spans.push(Math.floor(timeLeft/600).toString());
    spans.push(Math.floor(timeLeft/60%10).toString());
    spans.push(Math.floor(timeLeft%60/10).toString());
    spans.push(Math.floor(timeLeft%10).toString());
    postMessage([timeLeft, newDate, spans]);
    setTimeout(controlTimer, interval-lag);
  }
}
