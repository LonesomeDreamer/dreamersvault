<!doctype html>
<html>

  <?php
    $title = "Brutal Age | Gaming | 0x0F's Personal Page";
    $stylesheets = array( "/css/styles.css", "/content/_css/content-styles.css" );
    $scripts = array( "/js/scripts.js", "/content/_js/content-scripts.js" );
    require($_SERVER['DOCUMENT_ROOT'] . "/php/headTag.php");
  ?>

  <body>
    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/header.php");
    ?>

    <div id="mainBlock">
      <div class="sidebar">
      </div>
      <div id="mainWindow">
        <h1>Content</h1>
        <br/>
        <div id="content">
          <a class="contentEntry" href="./events-schedule/" >
            <h2>Events Schedule</h2>
            <img class="entryPreviewImage" alt="Events Schedule Preview Image" src="./_images/events_schedule.png"/>
          </a>

        </div>
      </div>
      <div class="sidebar">
      </div>
    </div>

    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
    ?>

  </body>

</html>
