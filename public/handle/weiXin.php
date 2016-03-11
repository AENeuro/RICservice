<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

if(!isset($_POST["flag"]))
        return;
$flag = $_POST["flag"];
if($flag == "accessToken"){
        echo accessToken();
}
if($flag == "jsapiTicket"){
        echo jsapiTicket($_SESSION["access_token"]);
}
?>

