<!DOCTYPE html>

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
        echo "<p>Modify info about car with VIN of " . $vin . "</p>";
        $query = "SELECT * FROM INVENTORY WHERE VIN='$vin'";

        if ($result = $mysqli->query($query)) {
          echo "<p>The vehicle with VIN $vin exists.</p>";
        }
        else
        {
          echo "<p>Sorry, a vehicle with VIN of $vin cannot be found: " . mysql_error()."</p><br>";
        }

        $result_ar = mysqli_fetch_assoc($result);

        echo "<form action=\"./modify_car.php\" method=\"post\">
  	     VIN: <input name=\"VIN\" type=\"text\" value=" . $result_ar['VIN'] .  "><br>
  	      <br>
  	       Make: <input name=\"Make\" type=\"text\" value=" . $result_ar['Make'] .  "><br>
  	        <br>
  	         Model: <input name=\"Model\" type=\"text\" value=" . $result_ar['Model'] .  "><br>
  	          <br>
  	           Price: <input name=\"Price\" type=\"text\" value=" . $result_ar['Asking_Price'] .  "><br>
  	            <br>
  	             <input name=\"Submit1\" type=\"submit\" value=\"submit\"><br>
  	              &nbsp;</form>";
          $mysqli->close();
        } else {
          echo "<p>No VIN specified.</p>";
        }
    ?>

  </body>

</html>
