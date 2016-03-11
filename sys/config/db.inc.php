<?php
// 这一行需不需要： mb_internal_encoding('UTF-8');
$Const = array();

$fp = json_decode(file_get_contents($_BASE_PATH."/docs/flag.json"));
if($fp->localOrSae == "local"){
        $Const['DB_HOST'] = 'localhost';
        $Const['DB_USER'] = 'root';
        $Const['DB_PASS'] = '';
        $Const['DB_NAME'] = 'ricservice';
}
else{
        $Const['DB_HOST'] = SAE_MYSQL_HOST_M;
        $Const['DB_USER'] = SAE_MYSQL_USER;
        $Const['DB_PASS'] = SAE_MYSQL_PASS;
        $Const['DB_NAME'] = SAE_MYSQL_DB;
        $Const['DB_PORT'] = SAE_MYSQL_PORT;
}

?>

