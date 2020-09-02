<!DOCTYPE html>
<html>

  <?php
    $title = "Portfolio | 0x0F's Personal Page";
    $stylesheets = array( "/css/styles.css", "./_css/portfolio-styles.css" );
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
        <h1>My portfolio</h1>
        <br/>
        <div id="portfolio">
          <a class="portfolioEntry" href="//woocommercestoreexample.atwebpages.com" >
            <h2>WooCommerce online store</h2>
            <img class="workPreviewImage" alt="WooCommerce online store preview" src="./_images/woocommercestoreexample.png"/>
            <div class="portfolioEntryDescription">
            <p class="plainText"><span class="italicAndBold">Last updated:</span> 08.10.2020</p>
            <p class="plainText"><span class="italicAndBold">Technologies used:</span>
              HTML, CSS, JavaScript, PHP, WordPress, WooCommerce
            </p>
            <p class="plainText"><span class="italicAndBold">Description:</span>
              An example of Web store (online store) I can create using WordPress and it's plugin WooCommerce.
              Store supports a purchase cart and products' option selection. Payments are turned off, as it's
              just an example of the store.
            </p>
            </div>
          </a>

          <a class="portfolioEntry" href="./hackernews_search" >
            <h2>Hackernews Search</h2>
            <img class="workPreviewImage" alt="Hackernews search preview" src="./_images/hackernewsSearch.png"/>
            <div class="portfolioEntryDescription">
            <p class="plainText"><span class="italicAndBold">Last updated:</span> 07.25.2020</p>
            <p class="plainText"><span class="italicAndBold">Technologies used:</span>
              HTML, CSS, JavaScript, React
            </p>
            <p class="plainText"><span class="italicAndBold">Description:</span>
              A search engine that uses news aggregator "Hackernews"' API to find information based on a search query
            </p>
            </div>
          </a>

          <a class="portfolioEntry" href="./med_card_check" >
            <h2>Medical Card Check (RU)</h2>
            <img class="workPreviewImage" alt="Medical card check preview" src="./_images/medCardCheck.png"/>
            <div class="portfolioEntryDescription">
            <p class="plainText"><span class="italicAndBold">Last updated:</span> 07.20.2020</p>
            <p class="plainText"><span class="italicAndBold">Technologies used:</span>
              HTML, CSS, JavaScript
            </p>
            <p class="plainText"><span class="italicAndBold">Description:</span>
              A form to check if entered medical card exists and includes entered services.
              Most of this app's functionality is asynchronous so the app can be scaled up
              without being slowed down for users. Russian language only.
            </p>
            </div>
          </a>
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
