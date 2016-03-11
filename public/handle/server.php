<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

$flag = $_POST["flag"];

if($flag == "getSession"){
        $pwd = "empty";
        $permission = "NULL";
        $noModify;
        if(isset($_SESSION['pwd'])){
                $pwd = $_SESSION['pwd'];
                $permission = $_SESSION['permission'];
                $noModify = $_SESSION['noModify'];
        }
        $key = array(0=>'pwd', 1=>'permission', 2=>'noModify');
        $value = array(0=>$pwd, 1=>$permission, 2=>$noModify);
        echo packJson($key, $value);
}

if($flag == "destroySession"){
        destroySession();
}

session_write_close();

?>

