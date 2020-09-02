<?php

require 'login.php';

$res = auth_user();

if ($res == "ERROR") {
  //echo "ACCESS DENIED";
} else if ($res == "OK") {
  require 'graphs.php';
}
