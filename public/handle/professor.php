<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

$flag = $_POST["flag"];

// Sign Up
if($flag == "teachCourse"){
        $prof = new Professor();
        $courseProf = $prof->courseProf($_POST["courseCode"]);
        // $courseProf里的每个元素是一个array，通过key="name"取值：e.g. $courseProf[0]["name"]
        return packJson(array("courseProf"), array($courseProf));
}

if($flag == "inFaculty"){
        $prof = new Professor();
        $facultyProf = $prof->facultyProf($_POST["faculty"]);
        // $facultyProf里的每个元素是一个array，通过key="name"取值：e.g. $facultyProf[0]["name"]
        return packJson(array("facultyProf"), array($facultyProf));
}

session_write_close();
?>

