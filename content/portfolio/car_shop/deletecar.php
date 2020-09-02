<!DOCTYPE HTML>

<html>
  <head>
    <title>0x0F's Used Cars</title>
  </head>

  <body>

    <h1>0x0F's Used Cars</h1>
    <?php
    if (isset($_GET['VIN'])) {
      $vin = $_GET['VIN'];
    }

    if (!empty($vin)) {
      require 'db.php';
      $query = "DELETE FROM INVENTORY WHERE VIN='$vin'";
      if ($result = $mysqli->query($query)) {
        echo "<p>The vehicle with VIN $vin has been deleted.</p>";
      }
      else
      {
        echo "<p>Sorry, a vehicle with VIN of $vin cannot be found: " . mysql_error()."</p><br>";
      }
      $mysqli->close();
    } else {
      echo "<p>No VIN specified.</p>";
    }
    ?>

  </body>

</html>
