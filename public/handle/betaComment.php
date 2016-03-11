<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

if(isset($_POST["flag"])){
        $flag = $_POST["flag"];
        $betaComment = new SaeMysql();

        if($flag == "showComment"){
                $page = $_POST["page"];
                $sql = "select * from `betaComment` where `page`='$page';";
                $comments = $betaComment -> getData($sql);
                echo packJson(array('comments'), array($comments));
        }
        if($flag == "showLogs"){
                $sql = "select * from `betaComment` where `page`='log';";
                $logs = $betaComment -> getData($sql);
                echo packJson(array('logs'), array($logs));
        }
        if($flag == "post"){
                $page = $_POST["page"];
                $comment = $_POST["comment"];
                $stat = $_POST["stat"];
                $timePost = date('Y-m-d');
                $sql = "insert into `betaComment` (`comment`, `page`, `stat`, `timePost`) values ('$comment', '$page', '$stat', '$timePost');";
                $betaComment -> runSql($sql);
        }
        if($flag == "delete"){
                $id = $_POST["id"];
                $sql = "delete from betaComment where `id`='$id';";
                $betaComment -> runSql($sql);
        }
        if($flag == "approve"){
                $id = $_POST["id"];
                $sql = "update betaComment set `stat` = 'approved' where `id`='$id';";
                $betaComment -> runSql($sql);
                $timePost = date('Y-m-d');
                $sql = "update betaComment set `timePost` = '$timePost' where `id`='$id';";
                $betaComment -> runSql($sql);
        }

        $betaComment -> closeDb();
}
session_write_close();
?>
