/*
$(document).ready(function(){
        var signPackage = queryWx("config");
        console.log(signPackage);
        signPackage = eval("(" + signPackage + ")");
        wx.config({
                debug: true,
                appId: signPackage.appId,
                timestamp: signPackage.timestamp,
                signature: signPackage.signature,
                jsApiList: ['onMenuShareTimeline']
        });
wx.ready(function(){
        var url = window.location.href;
        alert(url);
        wx.onMenuShareTimeline({
                title: '测试测试啊啊',
                        imgUrl: 'http://ricservice-ricservice.stor.sinaapp.com/RIC.png'
                trigger: function(){
                        alert("fucking");
                }
        });
});
})
*/
