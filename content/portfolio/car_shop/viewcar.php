<!DOCTYPE html>
<html>
<head>
<title>0x0F's Used Cars</title>
</head>

<body background="bg.jpg">

<h1>0x0F's Used Cars</h1>
<?php require 'db.php';
$vin = $_GET['VIN'];
$query = "SELECT * FROM inventory WHERE VIN='$vin'";
/* Try to query the database */
if ($result = $mysqli->query($query)) {
   // Don't do anything if successful.
}
else
{
    echo "Sorry, a vehicle with VIN of $vin cannot be found " . mysql_error()."<br>";
}
// Loop through all the rows returned by the query, creating a table row for each
while ($result_ar = mysqli_fetch_assoc($result)) {
    $year = $result_ar['YEAR'];
	$make = $result_ar['Make'];
    $model = $result_ar['Model'];
    $trim = $result_ar['TRIM'];
    $color = $result_ar['EXT_COLOR'];
    $interior = $result_ar['INT_COLOR'];
    $mileage = $result_ar['MILEAGE'];
    $transmission = $result_ar['TRANSMISSION'];
    $price = $result_ar['ASKING_PRICE'];
    //$image = $result_ar['primary_image'];
}
echo "$year $make $model </p>";
echo "<p>Asking Price: $price </p>";
echo "<p>Exterior Color: $color </p>";
echo "<p>Interior Color: $interior </p>";
//echo "<img src='images/$image'";

$query = "SELECT image_file FROM images WHERE VIN='$vin'";
$result = $mysqli->query($query);
while ($result_ar = mysqli_fetch_assoc($result)) {
    $image = $result_ar['image_file'];
    echo "<img src='images/$image' >";
}
//echo "$year $make $model </p>";


$mysqli->close();

?>

</body>

</html>
