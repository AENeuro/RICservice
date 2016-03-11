<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

$picAddress = "";

if(isset($_POST['imgLength'])){
        $l = $_POST['imgLength'];
        $picAddress = "";
        for($i = 0; $i < $l; $i ++){
                $key = "img".$i;
        $picAddress = $picAddress.saveAndGetPicAddress($_FILES["$key"]['tmp_name'], $_FILES["$key"]['type'], "housing").";";
        }

        echo packJson(array(0=>"picAddress"), array(0=>$picAddress));
        return ;
}

if(isset($_POST["flag"])){
        $flag = $_POST["flag"];
        $housing = new SaeMysql();
        if($flag == "delete"){ // 删除某条租房信息
                $l = $_POST["l"];
                for($i = 0; $i < $l; $i ++){
                        $key = "ad".$i;
                        $picAddress = $_POST["$key"];
                        echo deletePic($picAddress, "housing");
                        echo "<br>";
                }
                $id = $_POST["id"];
                $housing -> runSql("delete from `housing` where `id` = '$id';");
        }

        if($flag == "wantRoommateInfo"){
                $info = $housing -> getData("select * from `housing`;");
                echo packJson(Array("info"), Array($info));
        }
        if($flag == "publish"){ // 发布新的租房信息
                $timePost = date('Y-m-d');
                $timeMoveIn = $_POST["timeMoveIn"];
                $timeMoveOut = $_POST["timeMoveOut"];
                $place = $_POST["place"];
                $gender = $_POST["gender"];
                $price = $_POST["price"];
                $nameBuilding = $_POST["nameBuilding"];
                $residentInfo = $_POST["residentInfo"];
                $description = $_POST["description"];
                $ownerId = $_SESSION["id"];
                $picAddress = $_POST["picAddress"];
                $agreeSharing = $_POST["agreeSharing"];
                $sql = "insert into housing (`timePost`, `timeMoveIn`, `timeMoveOut`, `place`, `gender`, `price`, `nameBuilding`, `residentInfo`, `description`, `ownerId`, `picAddress`, `agreeSharing`) values ('$timePost', '$timeMoveIn', '$timeMoveOut', '$place', '$gender', '$price', '$nameBuilding', '$residentInfo', '$description', '$ownerId', '$picAddress', '$agreeSharing');";
                echo $housing -> runSql($sql);
        }
        if($flag == "detail"){ // 获得某条租房信息全部内容；用于housDetail的显示
                $id = $_POST["id"];
                $info = $housing -> getLine("select * from housing where `id`='$id';");
                echo packJson(Array("detail"), Array($info));
        }
        if($flag == "myPublish"){ // 获得某用户参与的所有租房信息
                $ownerId = $_SESSION["id"];
                $info = $housing -> getData("select * from housing where `ownerId`='$ownerId';");
                echo packJson(Array("myPublish"), Array($info));
        }
        if($flag == "insertWantUser"){ // 添加新的租房参与人
                $id = $_POST["id"];
                $userId = $_SESSION["id"];
                $sql = "select * from housing where `id`='$id';";
                $row = $housing->getLine($sql);
                if($row){
                        $newUsers = $row["wantUsers"].$userId.";";
                        $sql = "update housing set `wantUsers`='$newUsers' where `id`='$id';";
                        $result = $housing->runSql($sql);
                }
        }
        $housing -> closeDb();
}

session_write_close();
?>

