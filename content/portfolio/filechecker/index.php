<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
    <title>Task1</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="stylesheet" type="text/css" href="./styles.css"/>
  </head>

  <body>
    <main>
    <form action="./index.php" method="post" enctype="multipart/form-data">
      <fieldset>
      <div><input type="hidden" name="MAX_FILE_SIZE" value="30000" /></div>
      <div><label for="upfile">Выберите файл:</label>
      <input type="file" name="upfile" id="upfile" required></div>
      <div><label for="delimeter">Разделитель:</label>
      <input type="text" name="delimeter" placeholder="пробел/символ/строка..." id="delimeter" required></div>
      <div><input type="submit" value="Загрузить" name="submit"></div>
    </fieldset>
    </form>
    <div id="status-field">
    <?php
      if (empty($_FILES)) {
      } else {
        require "./upload.php";
      }
    ?>
  </div>
  </main>
  </body>

</html>
