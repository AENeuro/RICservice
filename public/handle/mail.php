<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

$flags = $_POST["flag"];

if($flags == "signUp"){
        $addr = $_POST["email"]."@hku.hk";
        echo sendConfirm($addr);
}

session_write_close();

?>