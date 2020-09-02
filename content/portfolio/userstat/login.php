<?php

function auth_user() {
  $login = "root";
  $password = "root";
  if (isset($_POST["login"]) && isset($_POST["password"])) {
    if (($_POST["login"] == $login) && ($_POST["password"] == $password)) {
      //header('Location: ./stat.php');
      return "OK";
    } else {
      echo "<div>ACCESS DENIED</div>";
      return "ERROR";
    }
  } else {
    echo '<!DOCTYPE html>
    <html>

      <head>
        <meta charset="utf-8">
        <title>Login</title>
        <link rel="icon" type="image/png" href="/favicon.png">
        <link rel="stylesheet" type="text/css" href="./styles.css"/>
        <script type="text/javascript" src="scripts.js" defer></script>
      </head>

      <body>
        <main>
          <form action="./stat.php" method="post">
            <fieldset>
            <div><label for="login">Логин:</label>
            <input type="text" name="login" id="login" required></div>
            <div><label for="login">Пароль:</label>
            <input type="text" name="password" id="password" required></div>
            <div><input type="submit" value="Проверить" name="submit"></div>
          </fieldset>
          </form>
        </main>
      </body>

    </html>';
    return "FORM";
  }
}
 ?>
