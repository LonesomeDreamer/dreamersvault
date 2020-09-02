<?php

function insert_query($date, $ip, $city, $device) {

  $servername = 'localhost';
  $username = 'root';
  $password = 'mysql';
  $dbname = 'amopoint_task2';

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `statistics` (date, ip, city, device) VALUES(?, ?, ?, ?)";

  if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ssss", $date, $ip, $city, $device);
    $stmt->execute();
    $stmt->close();
  }
  $conn->close();
}

function select_query($field, $val = 0) {

  $servername = 'localhost';
  $username = 'root';
  $password = 'mysql';
  $dbname = 'amopoint_task2';

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  if ($field == "date") {
    $sql = "SELECT COUNT(DISTINCT `ip`) AS alias FROM `statistics` WHERE HOUR(`date`) = ?";
    if ($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("i", $val);
      $stmt->execute();
      $result = array();
      $result = array_fill(0, 1, "");
      $result_array = array();
      $stmt->bind_result(...$result);
      while ($stmt->fetch()) {
          $result_array = $result[0];
      }
      $stmt->close();
    }
  } else {
    $sql = "SELECT COUNT( DISTINCT `ip`) AS alias, `city` FROM `statistics` GROUP BY `city`";
    if ($stmt = $conn->prepare($sql)) {
      $stmt->execute();
      $result = array();
      $result = array_fill(0, 2, "");
      $result_array = array();
      $stmt->bind_result(...$result);
      $row = array();
      while ($stmt->fetch()) {
        for ($i = 0; $i < 2; $i++) {
          $row[$i] = $result[$i];
        }
      array_push($result_array, $row);
      }
      $stmt->close();
    }
  }
  $conn->close();
  return $result_array;
}

if (isset($_POST["method"])) {
  if ($_POST["method"] == "insert") {
    insert_query($_POST["date"], $_POST["ip"], $_POST["city"], $_POST["device"]);
  }
}

 ?>
