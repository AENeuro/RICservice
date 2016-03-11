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
                <meta name = "viewport" content = "width = device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
                <link rel = "stylesheet" href = "assets/css/body.css">
                <script style = "text/javascript" src = "./assets/js/weixin/jweixin-1.0.0.js"></script>

                <link rel = "stylesheet" href = "assets/css/enroll.css">
        </head>
        <body>
                <nav class = "navbar navbar-default navbar-fixed-top" style = "opacity: 0.9" role = "navigation" id = "navTop">
                </nav>
                <!-- Modal -->
                <div class="modal fade" id="myModalSign"   tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                </div>
                <div class="modal fade" id="modalFilterHouse" tabindex="-1" role="dialog" aria-labelledby="modalWikiLabel" aria-hidden="true" >
                </div>
                <!-- modal结束-->
<script>
var width = screen.width;
if (width > 800)
        document.write("<div class = 'band-pc'>");
else
        document.write("<div class = 'band'>");
</script>
                        <div class = "container-fluid">
                                <h1 style = "margin-top: 80px; color: #ffffff">租房信息发布平台</h1>
                                <ul id = "ulHousingList" class = "nav nav-tabs" role = "tablist" style = "opacity: 0.7;">
                                </ul>
                        	<div class = "panel panel-default" id = "panelForA">
                        	</div>
                        </div>
                </div>
        </body>
                <!-- timePicker -->
                <link rel="stylesheet" type="text/css" href="./assets/css/timePicker/jquery.timepicker.css" />
                <link rel="stylesheet" type="text/css" href="./assets/css/timePicker/bootstrap-datepicker.css" />
                <script type="text/javascript" src="./assets/js/timePicker/jquery.timepicker.js"></script>
                <script type="text/javascript" src="./assets/js/timePicker/bootstrap-datepicker.js"></script>
                <!-- end timePicker -->
                <script style = "text/javascript" src = "./assets/js/modal.js"></script>
                <script style = "text/javascript" src = "./assets/js/betaComment.js"></script>
                <script style = "text/javascript" src = "./assets/js/htmlAccount.js?v=1"></script>
                <script style = "text/javascript" src = "./assets/js/warehouse.js"></script>
                <script style = "text/javascript" src = "./assets/js/housing.js?v=1"></script>
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
</html>

