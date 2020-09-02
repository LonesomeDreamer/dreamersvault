<?php
$timestamp = time();
$dt = new DateTime();
$cur_time = $dt->format('Y-m-d');

$openingHour = 0;
$closingHour = 0;
if (date("N") >= 6) {
  $openingHour = 9;
  $closingHour = 21;
} else if (date("N") != 1) {
  $openingHour = 10;
  if ((date("n") == 7) || (date("n") == 8)) {
    $closingHour = 19;
  } else {
    $closingHour = 18;
  }
}
echo "Today is " . $cur_time . ". We are open from ", $openingHour, " to ", $closingHour . " GMT.";
?>
