<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

if(isset($_POST["flag"])){
        $wareHouse = new SaeMysql();
        $flag = $_POST["flag"];
        if($flag == "delete"){ // 删除一条储物信息
                $id = $_POST["id"];
                echo $wareHouse -> runSql("delete from `warehouse` where `id` = '$id'");
        }
        if($flag == "wantWarehouseBrief"){ // 返回所有储物信息；用于显示列表
                $info = $wareHouse -> getData("select * from `warehouse` where 1;");
                echo packJson(Array('wantWarehouseBrief'), Array($info));
        }

        if($flag == "published"){ // 返回某用户的所有储物信息
                $id = $_SESSION["id"]; // 修改：原为$_POST["id"]
                $sql = "select * from `warehouse` where `ownerId` = '$id';";
                $info = $wareHouse -> getData($sql);
                echo packJson(Array("published"), Array($info));
        }

        if($flag == "detail"){ // 返回某条储物信息的全部内容
                $id = $_POST["id"];
                $sql = "select * from `warehouse` where `id` = '$id';";
                $info = $wareHouse -> getLine($sql);
                echo packJson(Array("detail"), Array($info));
        }

        if($flag == "decreaseQuota"){ // 用于报名后更新剩余quota
                $id = $_POST["id"];
                $sql = "select * from `warehouse` where `id` = '$id';";
                $ret = $wareHouse -> getLine($sql);

                $quota = $ret["quota"];
                $newQuota = $quota - 1;
                $sql = "update `warehouse` set `quota` = '$newQuota' where `id` = '$id';";
                $wareHouse -> runSql($sql);

                $uid = $_SESSION['id'];
                $wantUsers = $ret["wantUsers"].$uid.";";
                $sql = "update `warehouse` set `wantUsers` = '$wantUsers' where `id` = '$id';";
                $wareHouse -> runSql($sql);
        }

        if($flag == "publish"){ // 发布一条新的储物信息
                $timePost = date('Y-m-d');
                $ownerId = $_SESSION["id"];
                $timeStart = $_POST["timeStart"];
                $timeEnd = $_POST["timeEnd"];
                $quota = $_POST["quota"];
                $place = $_POST["place"];
                $methodDelivering = $_POST["methodDelivering"];
                $price = $_POST["price"];
                $type = $_POST["type"];
                $extra = $_POST["extra"];
                $agreeSharing = $_POST["agreeSharing"];
                $sql = "insert into `warehouse` (`timePost`, `ownerId`, `timeStart`, `timeEnd`, `quota`, `totalQuota`, `place`, `methodDelivering`, `price`, `type`, `extra`, `agreeSharing`) values ('$timePost', '$ownerId', '$timeStart', '$timeEnd', '$quota', '$quota', '$place', '$methodDelivering', '$price', '$type', '$extra', '$agreeSharing');";
                echo $wareHouse -> runSql($sql);
        }

        if($flag == "ifRegistered"){ // 在用户操作前判断是否已登录
                if(isset($_SESSION["id"])){
                        $uid = $_SESSION["id"];
                        $id = $_POST["id"];
                        $sql = "select `wantUsers` from `warehouse` where `id` = '$id';";
                        $row = $wareHouse -> getLine($sql);
                        $wantUsers = explode(';', $row["wantUsers"]);
                        $l = sizeof($wantUsers);
                        $flag = "unregistered";
                        for($i = 0; $i < $l - 1; $i ++){
                                if($wantUsers[$i] == $uid){
                                        $flag = "registered";
                                }
                        }
                        echo packJson(Array("ifRegistered"), Array($flag));
                        }
                else{
                        echo packJson(Array("ifRegistered"), Array("unregistered")); // 修改：registered 已改为 unregistered
                }
        }
        $wareHouse->closeDb();
}

session_write_close();
?>
