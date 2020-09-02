<!DOCTYPE html>
<html>

  <?php
    $title = "0x0F's Personal Page";
    $stylesheets = array( "/css/styles.css", "./_css/pomodoroStyles.css" );
    $scripts = array( "/js/scripts.js", "./_js/pomodoroScripts.js" );
    require($_SERVER['DOCUMENT_ROOT'] . "/php/headTag.php");
  ?>

  <body>
    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/header.php");
    ?>

    <div id="mainBlock">
      <div class="sidebar">
      </div>
      <main id="mainWindow">
        <div id="pomodoroWrapper">
          <p id="pomodoroStatus" class="pomodoroWork">
            Work
          </p>
          <p id="pomodoroTimer">
            <span>2</span>
            <span>5</span>
            <span>:</span>
            <span>0</span>
            <span>0</span>
          </p>
          <div id="pomodoroMenu">
            <button id="pomodoroStart25" class="pomodoroButton" type="">Start 25 min cycle</button>
            <button id="pomodoroStart5" class="pomodoroButton" type="button">Start 5 min cycle</button>
            <button id="pomodoroStop" class="pomodoroButton" type="button">Stop</button>
            <button id="pomodoroSet" class="pomodoroButton" type="button">Set timer</button>
          </div>
          <div id="pomodoroForm">
            <div id="pomodoroCycleType">
              <div id="pomodoroCycleWork">Work</div>
              <div id="pomodoroCycleBreak">Break</div>
            </div>
            <div id="pomodoroTimerMenu">
              <div class="pomodoroTimerDigit">
              </div>
              <div class="pomodoroTimerDigit">
              </div>
              <div class="pomodoroTimerDigit">
              </div>
              <div class="pomodoroTimerDigit">
              </div>
              <button id="pomodoroSubmit">Accept</button>
            </div>
          </div>
        </div>
      </main>
      <div class="sidebar">
      </div>
    </div>

    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
    ?>

  </body>

</html>
