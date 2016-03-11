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
                <link rel = "stylesheet" href = "assets/css/body.css?v=1">
                <script style = "text/javascript" src = "./assets/js/weixin/jweixin-1.0.0.js"></script>

                <link rel = "stylesheet" href = "assets/css/enroll.css">
        </head>
        <body>
                <nav class = "navbar navbar-default navbar-fixed-top" style = "opacity: 0.9" role = "navigation" id = "navTop">
                </nav>
                <!-- Modal -->
                <div class="modal fade" id="myModalSign" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                </div>
                <div class="modal fade" id="modalWiki" tabindex="-1" role="dialog" aria-labelledby="modalWikiLabel" aria-hidden="true" >
                </div>
                <div class="modal fade" id="modalReview" tabindex="-1" role="dialog" aria-labelledby="modalWikiLabel" aria-hidden="true" >
                </div>
                <div class="modal fade" id="modalFilter" tabindex="-1" role="dialog" aria-labelledby="modalWikiLabel" aria-hidden="true" >
                </div>
                <div class="modal fade" id="modalSort" tabindex="-1" role="dialog" aria-labelledby="modalWikiLabel" aria-hidden="true" >
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
<div class = "row" style = "margin-top: 60px; margin-bottom: 20px">
<script>
var width = screen.width;
if (width > 800){
        document.write("<div class = \"col-md-4\"><h1 style = \"color: #ffffff\">Common Core Courses</h1></div>");
        document.write("<div class = \"col-md-6 col-xs-12\" style = \"margin-top: 25px\"><a href = \"https://sweb.hku.hk/ccacad/ccc_appl/enrol_stat.html\" target = \"_blank\"><button class = \"btn btn-default\" style = \"opacity : 0.7\"><span class = \"glyphicon glyphicon-stats\"></span> 选课实时数据</button></a></div>");
}
else{
        document.write("<div class = \"col-xs-12\"><h3 style = \"color: #ffffff\">Common Core Courses</h3></div>");
        document.write("<div class = \"col-md-6 col-xs-12\"><a href = \"https://sweb.hku.hk/ccacad/ccc_appl/enrol_stat.html\" target = \"_blank\"><button class = \"btn btn-default\" style = \"opacity : 0.7\"><span class = \"glyphicon glyphicon-stats\"></span> 选课实时数据</button></a></div>");
}
</script>
</div>
                                <ul id = "ulListCategory" class = "nav nav-tabs" role = "tablist" style = "opacity: 0.7;">
                                </ul>
	<div class = "panel panel-default" style = "padding: 20px">
<div id = "divSort" class = "row"></div>
<div id = "divTabPanel" class = "row"></div>
	</div>
                        </div>
                 </div>
        </body>
                <script style = "text/javascript" src = "./assets/js/modal.js"></script>
                <script style = "text/javascript" src = "./assets/js/betaComment.js"></script>
                <script style = "text/javascript" src = "./assets/js/htmlGadget.js?v=1"></script>
                <script style = "text/javascript" src = "./assets/js/htmlAccount.js"></script>
                <script style = "text/javascript" src = "./assets/js/courseReview.js?v=6"></script>
                <script style = "text/javascript" src = "./assets/js/course.js?v=1"></script>
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

