<?php

  /**
  * perform SQL query to get names of
  * users with specific IDs
  *
  * @param string $user_ids IDs of users to search for
  * @return array $data associative array as ID => name
  */
  function load_users_data($user_ids) {
    $user_ids = explode(',', $user_ids);
    foreach ($user_ids as $user_id) {
      $servername = 'localhost';
      $username = 'root';
      $password = 'mysql';
      $dbname = 'sweet_smoke';

      $conn = new mysqli($servername, $username, $password, $dbname);

      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $sql = "SELECT name FROM users WHERE id=?";
      if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = array();
        $result = array_fill(0, 1, "");
        $stmt->bind_result(...$result);
        while ($stmt->fetch()) {
          $data[$user_id] = $result[0];
        }
        $stmt->close();
      }
      $conn->close();
    }
    return $data;
  }

  if (isset($_GET['user_ids'])) {
    if (!preg_match('/[^0-9,]/', $_GET['user_ids']))
    {
      $data = load_users_data($_GET['user_ids']);
      if ($data) {
        foreach ($data as $user_id=>$name) {
          echo "<a href=\"/show_user.php?id=$user_id\">$name</a><br/>";
        }
      } else {
        echo "No such users <br/>";
      }
    } else {
      echo "Invalid symbols in 'user_ids' <br/>";
    }
  } else {
    echo "No parameters <br />";
  }

?>
