<?php
$dir = './uploads/';
$ext = ".txt";
$path = $dir . sha1_file($_FILES['upfile']['tmp_name']) . $ext;
$finfo = new finfo(FILEINFO_MIME_TYPE);

if ($finfo->file($_FILES['upfile']['tmp_name']) == "text/plain") {
  if ($_FILES["upfile"]["error"] == UPLOAD_ERR_OK) {
    if (!file_exists($path)) {
      if (move_uploaded_file($_FILES['upfile']['tmp_name'], $path)) {
        echo '<div id="upload-status" class="success"></div>';
        echo '<div id="error-msg" class="success">ОК</div>';
      } else {
        echo '<div id="upload-status" class="error"></div>';
        echo '<div id="error-msg" class="error">На данный момент сервер не может загрузить Ваш файл. Повторите попытку позже.</div>';
      }
    } else {
      echo '<div id="upload-status" class="error"></div>';
      echo '<div id="error-msg" class="error">Такой файл уже был загружен.</div>';
    }
  } else {
    echo '<div id="upload-status" class="error"></div>';
    echo '<div id="error-msg" class="error">При загрузке файла произошла ошибка. Повторите попытку загрузки файла.</div>';
  }
} else {
  echo '<div id="upload-status" class="error"></div>';
  echo '<div id="error-msg" class="error">Разрешено загружать только .txt файлы.</div>';
}

/*----------------------------------------------------------------------------*/
// Now parse file content
$content = file_get_contents($path);
$delimeter = $_POST["delimeter"];
$strings = preg_split("/$delimeter/", $content);
echo "<table>";
foreach($strings as $string) {
  if (!empty($string)) {
    echo "<tr><td>$string=";
    preg_match_all("/(\d)/", $string, $matches, PREG_PATTERN_ORDER);
    echo count($matches[1]);
    echo "</td></tr>";
  }
}
echo "</table>";
?>
