<?php
$_BASE_PATH="../../";
include_once $_BASE_PATH. 'sys/core/init.inc.php';
include_once 'header.php';
if(isset($_POST["faculty"]))
{
        $faculty = $_POST["faculty"];
        $contact = $_POST["contact"];
        $pwd = $_POST["pwd"];
        $year = $_POST["year"];
        $user = new User;
        $user->signup($faculty, $contact, $pwd, $year);

        $_SESSION['pwd'] = $pwd;
        $loggedin = true;
}
?>

