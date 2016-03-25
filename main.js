$(document).ready(function() {
  var timeLength = $('#session').text();
  var breakLength = $('#break').text();
  var timer = 1;
  var paused = 0;
  var minutes, seconds, interval, breakValue, sessionValue, time, pausedTime;

  $('#b-minus').click(function() {
    breakValue = document.getElementById('break').innerHTML;
    if (breakValue > 1) {
      breakValue--;
      $('#break').text(breakValue);
    }
  });
  $('#b-plus').click(function() {
    breakValue = document.getElementById('break').innerHTML;
    breakValue++;
    $('#break').text(breakValue);
  });
  $('#s-minus').click(function() {
    sessionValue = document.getElementById('session').innerHTML;
    if (sessionValue > 1) {
      sessionValue--;
      $('#session').text(sessionValue);
      $('#pomodoro').text(sessionValue);
    }
  });
  $('#s-plus').click(function() {
    sessionValue = document.getElementById('session').innerHTML;
    sessionValue++;
    $('#session').text(sessionValue);
    $('#pomodoro').text(sessionValue);
  });

  $('#start').click(function() {
    if (paused === 1){
      startInterval(pausedTime, timer);
    } else{
      if (timer === 0) {
        startInterval('#break', 0);
      } else {
        startInterval('#session', 1);
      }
    }
  })

  $('#reset').click(function() {
    clearInterval(interval);
    timeLength = $('#session').text();
    $('#pomodoro').text(timeLength);
    $('#title').text("It's go time!");
    paused = undefined;
  })

  function startInterval(timerID, timerVal) {
    timer = timerVal;
    if (timer === 0) {
      $('#title').text("Break time!");
    } else {
      $('#title').text("Beast Mode");
    }

    if (paused === 1){
      time = timerID;
    } else{
      time = parseInt($(timerID).text(), 10) * 60;
    }

    interval = setInterval(function() {
      if (time === 0) {
        clearInterval(interval);
        if (timer === 1) {
          alert("Go to Break!");
          startInterval('#break', 0);
        } else {
          alert("Time to rock!")
          startInterval('session', 1);
        }
      } else {
        time--;
        minutes = Math.floor(time / 60);
        seconds = Math.floor(time % 60);
        if (seconds < 10) {
          $('#pomodoro').html(minutes + ":" + "0" + seconds);
        } else {
          $('#pomodoro').html(minutes + ":" + seconds);
        }
      }
    }, 1000)
    $('#stop').click(function() {
      clearInterval(interval);
      paused = 1;
      pausedTime = $('#pomodoro').text().split(":");
      var m = parseInt(pausedTime[0], 10) * 60;
      var s = parseInt(pausedTime[1], 10);
      pausedTime = m + s;
    });

  }

});