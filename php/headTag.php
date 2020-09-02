<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <title><?php echo $title ?></title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <?php
    if ($stylesheets) {
        foreach ($stylesheets as $stylesheet) {
            echo '<link rel="stylesheet" type="text/css" href="' . $stylesheet . '"/>';
        }
    }
    if ($scripts) {
        foreach ($scripts as $script) {
            echo '<script type="text/javascript" src="' . $script . '" defer></script>';
        }
    }
    unset($title, $stylesheets, $stylesheet, $scripts, $script);
  ?>
</head>
