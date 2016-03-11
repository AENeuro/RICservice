<?php
include_once 'handle/header.php';
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


        </head>
        <body>
                <nav class = "navbar navbar-default navbar-fixed-top" style = "opacity: 0.9" role = "navigation" id = "navTop">
                </nav>
                <div class="modal fade" id="myModalSign"   tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                </div>
                <div class="modal fade" id="modalPic"   tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                </div>
<script>
var width = screen.width;
if (width > 800)
        document.write("<div class = 'band-pc'>");
else
        document.write("<div class = 'band'>");
</script>
                        <div class = "container-fluid">
                                <h1 style = "margin-top: 90px; color: #ffffff">租房信息发布平台</h1>
                                <ul id = "ulHousingList" class = "nav nav-tabs" role = "tablist" style = "opacity: 0.7;">
                                </ul>

                                <div class = "tab-content">
	<div class = "panel panel-default" id = "panelHousingDetail">
	</div>
                                </div>
                        </div>
                </div>
                <script style = "text/javascript" src = "./assets/js/modal.js"></script>
                <script style = "text/javascript" src = "./assets/js/htmlAccount.js"></script>
                <script style = "text/javascript" src = "./assets/js/htmlGadget.js?v=1"></script>
                <script style = "text/javascript" src = "./assets/js/housingDetail.js?v=3"></script>
                <script style = "text/javascript" src = "./assets/js/betaComment.js?v=1"></script>
                <script style = "text/javascript" src = "./assets/js/housing.js"></script>
<script>
wx.config({
        debug: false,
                appId: '<?php echo $signPackage["appId"];?>',
                timestamp: '<?php echo $signPackage["timestamp"];?>',
                nonceStr: '<?php echo $signPackage["nonceStr"];?>',
                signature: '<?php echo $signPackage["signature"];?>',
                url: '<?php echo $signPackage["url"];?>',
                desc: '<?php echo $signPackage["desc"];?>',
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
});
wx.ready(function(){
        var url = 'http://ricservice-ricservice.stor.sinaapp.com/RIC.png';
        wx.onMenuShareTimeline({
                title: '<?php echo $signPackage["title"];?>',//'租房信息',
                        imgUrl: '<?php echo $signPackage["pic"];?>'
        });
        wx.onMenuShareAppMessage({
                title: '<?php echo $signPackage["title"];?>',//'租房信息',
                        desc: '<?php echo $signPackage["desc"];?>',
                        url: '<?php echo $signPackage["url"];?>',
                        imgUrl: '<?php echo $signPackage["pic"];?>'
        });
});
</script>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"1","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
         </body>
</html>

