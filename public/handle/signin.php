<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH. 'sys/core/init.inc.php';
if($loggedin == false && isset($_POST["pwd"]))
{
        $pwd = $_POST["pwd"];
        $user = new User;
        $user->signin($pwd);

        $_SESSION['pwd'] = $pwd;
        $loggedin = true;
}
session_write_close();
?>

