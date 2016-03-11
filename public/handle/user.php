<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

if (isset($_POST["flag"])){
        $user = new SaeMysql();
        $flag = $_POST["flag"];

        // Sign Up
        if($flag == "signUp"){
                if (isset($_POST["email"]) && isset($_POST["pwd"]))
                {
                        $faculty = $_POST["faculty"];
                        if(empty($faculty)){
                                echo "empty";
                        }
                        else{
                                $email = $_POST["email"];
                                $faculty = $_POST["faculty"];
                                $contact = $_POST["contact"];
                                $pwd = $_POST["pwd"];
                                $year = $_POST["year"];
                                $sql = "select * from `user` where `email` = '$email';";
                                $result = $user->getData($sql);
                                if (count($result) > 0){ // >0 即邮箱已被注册
                                        echo false;
                                }
                                else{
	$dat = date('Y-m-d');
                                        $sql = "insert into `user` (`faculty`, `contact`, `pwd`, `year`, `email`, `lastLogIn`) values ('$faculty', '$contact', '$pwd', '$year', '$email', '$dat');";
                                        $user -> runSql($sql);
                                        echo packJson(array("signin"), array(registerSession($pwd)));
                                }
                                
                        }
                }
        }

        // Sign In
        if($flag == "signIn"){
                if(isset($_POST["pwd"]))
                {
                        $pwd = $_POST["pwd"];
                        $sql = "select * from `user` where `pwd` = '$pwd';";
                        $result = $user->getLine($sql);
                        if($result){
                                $dat = date('Y-m-d');
                                if($result["lastLogIn"] != $dat){
	$sql = "update user set `lastLogIn` = '$dat' where `pwd` = '$pwd';";
	$user -> runSql($sql);
	$sql = "update user set `noModify` = '0' where `pwd` = '$pwd';";
	$user -> runSql($sql);
                                }
                                registerSession($pwd);
                                echo true;
                        }
                        else
                                echo false;
                }
        }

        // Reset Password
        if ($flag == "rstPwd")
        /* return values:
             -1 fatal
             0 success
             1 error
        */
        {
          $eml = $_POST["user"];
          $sql = "select * from `user` where email = '$eml';";
          $result = $user->getLine($sql);
          
          if ($result)
          {
            $timestamp = time();
            $id = $result['id'];
            $ver = strval(rand(100000,999999));
            $key = md5($eml."@".$timestamp."@".$ver);
            $sql = "insert into pwdReset (uid, tstamp, kei) values ('$id', '$timestamp', '$key');";
            
            $user->runSql($sql);
            echo sendRstPwd($eml."@hku.hk", $timestamp, $key);
          }
          else echo -1;
        }
        
        if($flag == "updateModify"){
                $pwd = $_POST["pwd"];
                $sql = "update user set `noModify` = (`noModify` + 1) where `pwd` = '$pwd';";
                $user -> runSql($sql);
                $_SESSION["noModify"] ++;
        }

        if($flag == "updateLikeReview"){
                $pwd = $_POST["pwd"];
                $likeReview = $_POST["likeReview"];
                $sql = "update user set `likeReview` = '$likeReview' where `pwd` = '$pwd';";
                $user -> runSql($sql);
        }

        if($flag == "contact"){
                $id = $_POST["id"];
                $sql = "select `contact` from `user` where `id` = '$id';";
                $info = $user -> getData($sql);
                echo packJson(Array("contact"), Array($info));
        }

        if($flag == "userInfo"){
                if(isset($_POST["id"]))
                        $id = $_POST["id"];
                else
                        $id = $_SESSION["id"];
                $sql = "select * from `user` where `id` = '$id';";
                $info = $user -> getLine($sql);
                echo packJson(array('userInfo'), array(0=>$info));
        }

        if($flag == "buyBook"){
                if(loggedIn()){
                        $owner = $_POST["owner"];
                        $sql = "select `contact` from `user` where `id` = '$owner';";
                        $info = $user -> getLine($sql);
                        $key = array(0=>"contact");
                        $value = array(0=>$info["contact"]);
                        echo packJson($key, $value);
                }
        }

        if($flag == "updatePwd" || $flag == "updateContact"){ // 修改：删去了echo
                if(loggedIn()){
                        $id = $_SESSION['id'];
                        $newInfo = $_POST["updateInfo"];
                        if($flag == "updatePwd"){
                                $sql = "update user set `pwd`='$newInfo' where `id`='$id';";
                                $user -> runSql($sql);
                                updateSessionPwd($newInfo);
                        }
                        else{
                                $sql = "update user set `contact`='$newInfo' where `id`='$id';";
                                $user -> runSql($sql);
                        }
                }
        }

        if($flag == "markBook"){
                $id = $_SESSION["id"];
                $bookId = $_POST["bookId"];
                $category = $_POST["category"];
                $sql = "select `markBook` from user where `id` = '$id';";
                $row = $user->getLine($sql);
                if($row){
                        $row = $row["markBook"];
                        //split each mark
                        $exp = explode(";", $row);
                        $l = count($exp);
                        for($i = 0; $i < $l; $i ++){
                                $x = $exp[$i];
                                $x = explode("|", $x);
                                if($x[0] == $category && $x[1] == $bookId)
                                        return true;
                        }
                        $newMarkBook = $row.$category."|".$bookId.";";
                        $sql = "update `user` set `markBook` = '$newMarkBook' where `id`='$id';";
                        $user -> runSql($sql);
                }
        }

        if($flag == "markCourse"){
                $id = $_SESSION["id"];
                $category = $_POST["category"];
                $courseCode = $_POST["courseCode"];
                $sql = "select `markCourse` from `user` where `id` = '$id';";
                $row = $user -> getLine($sql);
                $ret = $row["markCourse"];
                $newMarkCourse = $ret.$category."|".$courseCode.";";
                $sql = "update `user` set `markCourse` = '$newMarkCourse' where `id` = '$id';";
                $user -> runSql($sql);
        }

        if($flag == "unmarkCourse"){
                $uid = $_SESSION["id"];
                $category = $_POST["category"];
                $courseCode = $_POST["courseCode"];
                $sql = "select `markCourse` from `user` where `id` = '$uid';";
                $row = $user -> getLine($sql);
                $ret = $row["markCourse"];
                $ret = explode(";", $ret);
                $toBeUnmarkded = $category."|".$courseCode;
                $l = count($ret);
                $newMarkCourse = "";
                for($i = 0; $i < $l - 1; $i ++){
                        $tmp = $ret[$i];
                        if($tmp == $toBeUnmarkded || $tmp == "")
                                continue;
                        $newMarkCourse = $newMarkCourse.$tmp.";";
                }
                $sql = "update user set `markCourse` = '$newMarkCourse' where `id` = '$uid';";
                $user -> runSql($sql);
                echo packJson(Array("unmarkCourse"), Array($newMarkCourse));
        }

        if($flag == "insertWantHousing"){
                $id = $_SESSION["id"];
                $housingId = $_POST["id"];
                $sql = "select * from `user` where `id`='$id';";
                $row = $user -> getLine($sql);
                if($row){
                        $newHousings = $row["wantHousings"].$housingId.";";
                        $sql = "update user set `wantHousings`='$newHousings' where `id`='$id';";
                        $user -> runSql($sql);
                }
        }

        if($flag == "updateWantWarehouses" || $flag == "insertWantWarehouses"){
                $uid = $_SESSION["id"];
                $id = $_POST["id"];
                $sql = "select `wantWarehouses` from `user` where `id`='$uid';";
                $row = $user -> getLine($sql);
                $wantWarehouses = $row["wantWarehouses"].$id.";";
                $sql = "update user set `wantWarehouses` = '$wantWarehouses' where `id` = '$uid';";
                $user -> runSql($sql);
        }
        $user -> closeDb();
}

session_write_close();
?>

