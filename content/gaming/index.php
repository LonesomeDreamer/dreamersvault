<!doctype html>
<html>

  <?php
    $title = "Gaming | 0x0F's Personal Page";
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
        <h1>Games</h1>
        <br/>
        <div id="content">
          <a class="contentEntry" href="./brutal-age" >
            <h2>Brutal Age</h2>
            <img class="entryPreviewImage" alt="Brutal Age preview" src="./_images/brutal_age.jpg"/>
          </a>

          <a class="contentEntry" href="./valorant" >
            <h2>VALORANT</h2>
            <img class="entryPreviewImage" alt="VALORANT preview" src="./_images/valorant.jpeg"/>
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
