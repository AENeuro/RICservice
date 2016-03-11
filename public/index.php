<?php
include_once 'handle/header.php';
$_BASE_PATH="../";
include_once $_BASE_PATH.'sys/core/init.inc.php';
$jssdk = new JSSDK();
$signPackage = $jssdk->getSignPackage();
?>
<!DOCTYPE html>
<html lang = "zh-CN">
        <head>
                <title>RIC杂货铺</title>
                <link rel = "shortcut icon" type = "image/ico" href = "assets/img/RIC.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="keywords" content="RIC, 平台, 网站, 港大" />
                <link rel = "stylesheet" href = "assets/css/body.css">

                <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
                <script style = "text/javascript" src = "./assets/js/weixin/jweixin-1.0.0.js"></script>
        </head>
        <body>
                <nav class = "navbar navbar-default navbar-fixed-top" style = "opacity: 0.9" id = "navTop">
                </nav> 
                <div class="modal fade" id="myModalSign"   tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                </div>
                <div class="modal fade" id="modalRegulation"   tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                </div>

                <script>
                        var width = screen.width;
                        if (width > 800)
                                document.write("<div class = 'band-pc'>");
                        else
                                document.write("<div class = 'band'>");
                </script>
                        <div class = "container-fluid" >
                                <div class = "row">
                                        <div class = "col-md-3 col-md-offset-7 col-xs-8 col-xs-offset-2" style = "margin-top: 200px; text-align: center">
                                                <?php
                                                if(!isset($_SESSION["id"])){
                                                        echo "<img src = \"assets/img/index/logo.png\" class=\"img-responsive\" style = \"width: 100%;\"/>";
                                                        echo "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModalSign\" style = \"opacity: 0.7; width: 95%; background: none; border-color: white; margin-top: 10px; margin-bottom: 200px\">";
                                                        echo "点击即刻登录/注册";
                                                        echo "</button>";	
                                                }
                                                else{
                                                        echo "<img src = \"assets/img/index/logo.png\" class=\"img-responsive\" style = \"width: 100%; margin-bottom: 200px\"/>";
                                                }
                                                ?>
                                        </div>
                                </div>
                        </div>
                </div>
        </body>

        <script>
        wx.config({
                debug: false,
                        appId: '<?php echo $signPackage["appId"];?>',
                        timestamp: '<?php echo $signPackage["timestamp"];?>',
                        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
                        signature: '<?php echo $signPackage["signature"];?>',
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function(){
                var url = window.location.href;
                var imgUrl = 'http://ricservice-ricservice.stor.sinaapp.com/RIC.png';
                wx.onMenuShareTimeline({
                        title: 'RIC杂货铺',
                                imgUrl: imgUrl
                });
                wx.onMenuShareAppMessage({
                        title: 'RIC杂货铺',
                                desc: '<?php echo $signPackage["desc"];?>',
                                imgUrl: imgUrl
                });
        });
        </script>
        <script style = "text/javascript" src = "./assets/js/modal.js?v=1"></script>
        <script style = "text/javascript" src = "./assets/js/betaComment.js"></script>
</html>

