<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';
//include_once $_BASE_PATH.'sys/class/class.JSSDK.inc.php';

if(isset($_POST["flag"])){
        $flag = $_POST["flag"];
        if($flag == "getSignPackage"){
                $jssdk = new JSSDK();
                $signPackage = $jssdk->GetSignPackage();
                echo json_encode($signPackage);
        }
}

session_write_close();
?>
