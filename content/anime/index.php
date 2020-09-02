<!doctype html>
<html>

  <?php
    $title = "Anime | 0x0F's Personal Page";
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
        <h1>Page Under Development</h1>
        <br/>
      </div>
      <div class="sidebar">
      </div>
    </div>

    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
    ?>

  </body>

</html>
