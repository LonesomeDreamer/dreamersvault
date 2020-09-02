<!DOCTYPE html>
<html>
  <head>
    <title>Car Saved</title>
  </head>
  <body style="background-color: #FFFFFF; color: #000000;">

  <?php

  $VIN =  trim($_POST['VIN']) ;
  $Make = trim($_POST['Make']) ;
  $Model = trim($_POST['Model']) ;
  $Price =  $_POST['Price'] ;
  echo "HERE IS PRICE:" . $Price . "<br>";

  //Build a SQL Query using the values from above

  $query = "UPDATE inventory
  SET VIN='$VIN', Make='$Make', Model='$Model', ASKING_PRICE='$Price'
  WHERE VIN='$VIN'";

  // Print the query to the browser so you can see it

  require 'db.php';

  echo 'Connected successfully to mySQL. <BR>';

  //select a database to work with
  $mysqli->select_db("Cars");
  echo("Selected the Cars database. <br>");

  /* Try to insert the new car into the database */
  if ($result = $mysqli->query($query)) {
    echo "<p>You have successfully upated $Make $Model in the database.</P>";
  } else {
    echo "Error updating $VIN in database: " . $mysqli->error."<br>";
  }

  $mysqli->close();
  require 'footer.php'
  ?>
  </body>
</html>
