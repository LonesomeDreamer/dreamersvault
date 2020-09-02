<?php
$url = 'https://accounts.zoho.com/oauth/v2/token?code=1000.219d085c05891befac11696ece5edd7a.8161e2b55683dedd1c75e6ced0e7e362&redirect_uri=http%3A%2F%2Fdreamersvault.atwebpages.com%2Fcontent%2Fportfolio%2Froistat_test%2F&client_id=1000.SCGCJVTGWCA4QVA8SAPLHVCYQCYTWH&client_secret=e2743283473858b9a0a9c93660a474e21f4f05ad9c&grant_type=authorization_code';
$data = array();

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

var_dump($result);

?>
