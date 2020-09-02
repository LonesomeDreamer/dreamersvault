<?php

function parseURL() {
  //some links to test regex
  $str = "https://www.somehost.com/test/index.html?param1=4&param2=3&param3=2&param4=1&param5=3";
  $str1 = "https://www.somehost.com/test/?param1=4&param2=3&param3=2&param4=1&param5=3";
  $str2 = "https://www.somehost.com/?param1=4&param2=3&param3=2&param4=1&param5=3";
  $str3 = "https://www.somehost.com?param1=4&param2=3&param3=2&param4=1&param5=3";
  $str4 = "somehost.com?param1=4&param2=3&param3=2&param4=1&param5=3";
  $str5 = "somehost.com";

  // parse inital URL
  preg_match_all("/([^\.]+\.[^\/\?]+\/?)([^\?]*)?\??(.*)/", $str, $matches, PREG_PATTERN_ORDER);
  $webroot = $matches[1][0];
  $webdir = $matches[2][0];
  $params = $matches[3][0];

  // get array of params
  if (!empty($params)) {
    $params_array = preg_split("/&/", $params);
    $new_params_array = array();

    // delete params with value equal to 3
    foreach($params_array as $param) {
      preg_match_all("/(.*)=(.*)/", $param, $matches, PREG_PATTERN_ORDER);
      if (!empty($matches[1][0]) && ($matches[2][0] != "3")) {
        $new_params_array[$matches[1][0]] = $matches[2][0];
      }
    }

    // sort params by their value
    asort($new_params_array);
    $new_params = "?";
    foreach($new_params_array as $key => $value) {
      $new_params .= $key . "=" . $value . "&";
    }
    //delete trailing '&'
    $new_params = substr($new_params, 0, -1);
  }

  // add url param
  if (!empty ($webdir)) {
    $url_param = "&url=" . rawurlencode("/" . $webdir);
  }
  $complete_url = $webroot.$new_params.$url_param;

  return $complete_url;
}
?>
