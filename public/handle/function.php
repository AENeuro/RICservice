<?php

function destroySession(){
        $_SESSION = array();
        if(isset($_COOKIE[session_name()]))
                setcookie(session_name(), '', time()-42000, '/');
        session_destroy();
}

function addSession($key, $value){
        $l = count($key);
        for($i = 0; $i < $l; $i ++){
                $_SESSION["$key[$i]"] = $value[$i];
        }
}

function registerSession($pwd){
        $user = new SaeMysql();
        $sql = "select * from user where `pwd` = '$pwd';";
        $ret = $user -> getLine($sql);
        $id = $ret["id"];
        $permission = $ret["permission"];
        $noModify = $ret["noModify"];
        addSession(array('pwd', 'id', 'permission', 'noModify'), array($pwd, $id, $permission, $noModify));
        $user -> closeDb();
}

function packJson($key, $value){
        $size = count($key);
        $dat = array();
        for($i=0; $i<$size; ++$i){
                $dat[$key[$i]] = $value[$i];
        }
        $dat = json_encode($dat);
        echo $dat;
}

function loggedIn(){
        if(isset($_SESSION['pwd']))
                return true;
        return false;
}

function updateSessionPwd($newPwd){
        $_SESSION['pwd'] = $newPwd;
}

// 将图片保存至文件夹
function saveAndGetPicAddress($tmpAddress, $imgType, $domain){
        //for localhost
        /*
        $picDir = "uploadPic/";
        $imgDir = "../../".$picDir;
        $imgType = strchr($imgType, "/");
        $imgType = substr($imgType, 1);
        if(!file_exists($imgDir))
                mkdir($imgDir, 0777);
        if(!is_readable($imgDir))
                chmod($imgDir, 0777);
        $picAddress = $picDir.date("YmdHis").rand().".".$imgType;
        move_uploaded_file($tmpAddress, "../../".$picAddress);
        return $picAddress;
         */

        //for SAE
        $storage = new SaeStorage();
        $imgType = strchr($imgType, "/");
        $imgType = substr($imgType, 1);
        $picName = date("YmdHis").rand().".".$imgType;
        $picAddress = $picDir.$picName;
        $attr = array('encoding' => 'gzip');
        return $storage -> upload($domain, $picName, $tmpAddress, -1);
}

function deletePic($picAddress, $domain){
        $storage = new SaeStorage();
        return $storage->delete("$domain", "$picAddress");
}

function sendConfirm($addr){
        $fp = json_decode(file_get_contents("../../docs/flag.json"));
        if($fp->localOrSae == "Sae"){
                $mail = new SaeMail();
                $title = "你的RIC账号已注册成功！";
                $content = "亲爱的同学，\n\n你好！\n你的账号已经注册成功，你可以使用http://ricservice.sinaapp.com内提供的所有服务。\n非常感谢你对港大RIC的支持！\n\n港大RIC";
                $ret = $mail->quickSend($addr, $title, $content, 'riccssaud@sina.com', 'riccssaud2010');

                if ($ret === false){
                        var_dump($mail->errno(), $mail->errmsg());
                        return 0;
                }

                $mail->clean(); // 重用此对象
                $ret = $mail->quickSend( 'liubb16@hku.hk' , '又有人注册啦！' , $addr.'那边应该也成了' , 'riccssaud@sina.com' , 'riccssaud2010');// , 'smtp.unknown.com' , 25 ); // 指定smtp和端口

                //发送失败时输出错误码和错误信息
                if ($ret === false)
                        var_dump($mail->errno(), $mail->errmsg());
                return 2;
        }
}

function sendRstPwd($addr, $timestamp, $key)
/*
  return values:
    -1 fatal
    0  success
    1  error
*/
{
  $fp = json_decode(file_get_contents("../../docs/flag.json"));
  if($fp->localOrSae == "Sae")
  {
    $mail = new SaeMail();
    $title = "RIC重置密码";
    $content = "亲爱的".$addr."，\n\n你好！\n你在".date("Y年m月d日 H:i:s", $timestamp)."尝试重置RIC帐号的密码，请点击以下链接\nhttp://ricservice.sinaapp.com/public/handle/resetpwd.php?key=".$key."\n(如无法打开，请将其复制到浏览器地址栏后访问)\n该链接有效期为24小时，且点击一次后将失效! 如非本人操作请忽略_(:з」∠)_\n\n非常感谢你对港大RIC的支持！\n\n港大RIC";
    //$content = "亲爱的用户你好，请从app_ricservice.pwdReset中取回你的密码:(";
    $ret = $mail->quickSend($addr, $title, $content, 'riccssaud@sina.com', 'riccssaud2010');

    if ($ret === false)
    {
      var_dump($mail->errno(), $mail->errmsg());
      return -1;
    }

    $mail->clean(); // 重用此对象
    $ret = $mail->quickSend( 'qianzih@hotmail.com' , '有S*忘记密码啦！' , "ta是".$addr.",蛤蛤！" , 'riccssaud@sina.com' , 'riccssaud2010');// , 'smtp.unknown.com' , 25 ); // 指定smtp和端口

    //发送失败时输出错误码和错误信息
    if ($ret === false)
    {
      var_dump($mail->errno(), $mail->errmsg());
      return 1;
    }
    
    return 0;
  }
}

function noticeOwner($ownerAddr, $ownerName, $contact){
        $mail = new SaeMail();
        $title = "你的RIC租房/储物信息有人响应啦！";
        $content = "亲爱的同学";
}
?>

