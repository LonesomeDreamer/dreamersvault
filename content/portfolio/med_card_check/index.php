<!doctype html>
<html>

  <?php
    $title = "Medical Card Check | Portfolio | 0x0F's Personal Page";
    $stylesheets = array( "/css/styles.css", "./css/styles.css" );
    $scripts = array( "/js/scripts.js", "./js/inputFilter.js" );
    require($_SERVER['DOCUMENT_ROOT'] . "/php/headTag.php");
  ?>

<body>

  <?php
    require($_SERVER['DOCUMENT_ROOT'] . "/php/header.php");
  ?>
  <div id = "medCardWrapper">
    <div id="medCardWindow">
      <p id="medCardWindowTitle">
        Проверка услуг медицинского страхования
      </p>
      <div id="insuranceTypeContainer">
        <button class="insuranceType" id="OMS">ОМС</button>
        <button class="insuranceType" id="DMS">ДМС</button>
      </div>
      <div id="insuranceData">
        <input class="userInput" id="insuranceID" type="text" name="insuranceID" placeholder="Введите номер полиса">
        <div id="insuranceCompanyWrapper">
          <input class="userInput" id="insuranceCompany" type="text" name="insuranceCompany" placeholder="Выберите страховую компанию">
        </div>
        <div id="services">Выберите медицинские услуги</div>
        <div id="servicesWrapper">
          <input class="userInput" id="services" type="text" name="insuranceService" placeholder="Введите запрашиваемую услугу для пациента">
        </div>
        <table id="servicesTable">
          <tr class="tableRow">
            <td class="check"><img></td>
            <td class="service"></td>
            <td class="check"><img></td>
            <td class="service"></td>
          </tr>
          <tr class="tableRow">
            <td class="check"><img></td>
            <td class="service"></td>
            <td class="check"><img></td>
            <td class="service"></td>
          </tr>
          <tr class="tableRow">
            <td class="check"><img></td>
            <td class="service"></td>
            <td class="check"><img></td>
            <td class="service"></td>
          </tr>
          <tr class="tableRow">
            <td class="check"><img></td>
            <td class="service"></td>
            <td class="check"><img></td>
            <td class="service"></td>
          </tr>
          <tr class="tableRow">
            <td class="check"><img></td>
            <td class="service"></td>
            <td class="check"><img></td>
            <td class="service"></td>
          </tr>
        </table>
        <button id="submitButton" name="submitButton">Проверить</button>
      </div>
    </div>
  </div>

  <?php
    require($_SERVER['DOCUMENT_ROOT'] . "/php/footer.php");
  ?>

</body>

</html>
