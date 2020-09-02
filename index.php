<!DOCTYPE html>
<html>

  <?php
    $title = "0x0F's Personal Page";
    $stylesheets = array( "/css/styles.css" );
    $scripts = array( "/js/scripts.js" );
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
        <h1>Welcome to my website</h1>
        <p class="plainText">My name is Artyom, A.K.A. <span class="italicAndBold">0x0F</strong></p>
        <p class="plainText">I am a self-taught programmer. I've been learning C++ for 2 years,
          but then found a bigger interest in Web development, so I've switched to
          HTML, CSS, JavaScript, PHP and SQL. You can find my  Web developer portfolio <a class="contentLink" href="/content/portfolio">here</a>.</p>
        <p class="plainText">I love Web development (both frontend and backend), PC gaming and anime.
        I want to share my interests with the world. Hope you will find something
        interesting to you on this website.</p>
      </main>
      <div class="sidebar">
      </div>
    </div>

    <?php
      require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
    ?>

  </body>

</html>
