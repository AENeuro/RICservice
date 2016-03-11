<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once '../../sys/core/init.inc.php';
?>

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>RIC帐号-修改密码</title>
    <link rel = "shortcut icon" type = "image/ico" href = "../assets/img/RIC.png"/>
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="../assets/js/function.js?v=5"></script>
    <script src="../assets/js/md5.js"></script>
  </head>

  <body>
  <?php
    $sqlHost = new SaeMysql();
    $key = $_REQUEST['key'];
    $newpwd = $_REQUEST['pwd'];
    
    $sql = "select * from `pwdReset` where kei = '$key';";
    $result = $sqlHost->getLine($sql);
    if ($result)
    {
      if (time() - $result['tstamp'] <= 86400) // unexpired
      {
        $uid = $result['uid'];
        if (isset($newpwd))
        {
          $sql = "update `user` set pwd = '$newpwd' where id = '$uid';";
          
          if($sqlHost->runSql($sql))
          {
            echo "修改成功！";
            $sql = "delete from `pwdReset` where kei = '$key';";
            $sqlHost->runSql($sql);
          }
          else echo "修改失败_(:з」∠)_ 请使用刷新重试。。。。";
        }
        else
        {  
          $sql = "select * from `user` where id = '$uid';";
          $result = $sqlHost->getLine($sql);
          $eml = $result['email'];
          echo "<script src=\"../assets/js/resetpwd.js\"></script>";
          echo "<script>$(document).ready(function () { eml = '$eml'; key = '$key'; });</script>";
          //echo "<script>$(document).ready(function () { $('#btnSubmit').click(function () { alert(\"woo\"); }); });</script>";
          echo "修改$eml@hku.hk的密码_(:з」∠)_<input type=\"text\" id=\"inputNewPwd\" placeholder=\"新密码\"></input><button type=\"button\" id=\"btnSubmit\">提交</button>";
        }
      }
      else
        echo "Error: 链接好像过期了_(:з」∠)_";
    }
    else
      echo "Error: key($key) invalid _(:з」∠)_";
  ?>
  <hr>
  <a href="../aboutus.html" style="text-align:center;">2014-2015 香港大学内地本科生联合会权益保障组 Rights and Interests Committee, CSSAUD, HKU</a>
  </body>
</html>

