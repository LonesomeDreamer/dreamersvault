<?php
  require "./utils.php";
?>

<!DOCTYPE html>
<html>

  <?php
    $title = "Roistat task";
    $stylesheets = array( "/css/styles.css", "./_css/styles.css" );
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
        <?php
          require "./form.php";
        ?>
      </main>
      <div class="sidebar">
      </div>
    </div>
    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
    ?>
  </body>

</html>
