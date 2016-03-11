document.write("<link rel=\"stylesheet\" href=\"http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css\">");
document.write("<script src=\"http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js\"></script>");
document.write(" <script language=\"javascript\" src=\"./assets/js/htmlGadget.js\" > </script>");
//document.write(" <script src=\"assets/dist/js/bootstrap.js\"></script>"); 
document.write(" <script language=\"javascript\" src=\"./assets/js/md5.js\" > </script>");
document.write(" <script language=\"javascript\" src=\"./assets/js/function.js?v=1\" > </script>");

var app = Array(), retUserInfo, signPackage;
function getPageApp(){
        var loc = window.location.href;
        loc = loc.split('#')[0];
        loc = loc.split("&");
        var l = loc.length;
        for(var i = 0; i < l; i ++){
                app[i] = loc[i].split("=")[1];
        }
}


function getUserInfo(){
        retUserInfo = queryUser("userInfo");
        retUserInfo = eval("(" + retUserInfo + ")");
        retUserInfo = retUserInfo.userInfo;
}

getPageApp();

function getPageName(){
        var loc = window.location.pathname;
        loc = loc.split("/");
        loc = loc[loc.length - 1];
        loc = loc.split(".");
        return loc[0];
}

var ses = '', permission = '', sesId = '', noModify;
function checkSession(){
        ret = queryServer("getSession");
        ret = eval("(" + ret + ")");
        if(ret.pwd != "empty"){
                ses = ret.pwd;
                permission = ret.permission;
                noModify = ret.noModify;
        }
        if(ses == ''){
                $('liSignUp').show();
                $('liAccount').hide();
        }
        else{
                $('liSignUp').hide();
                $('liAccount').show();
                getUserInfo();
        }
}

function displayNav(){
        var html = "";
//        var html = "<div class = \"container-fluid\">";
        //display header
        html += "<div class = \"navbar-head\">";
        //-->button
        html += "<button type = \"button\" class = \"navbar-toggle collapsed\" data-toggle = \"collapse\" data-target = \"#detailed-nav\">";
        html += "<span class = \"sr-only\">Toggle navigation</span>";
        for(var i = 0; i < 3; i ++){
                html += "<span class = \"icon-bar\"></span>";
        }
        html += "</button>";
        //-->end button
        html += "<a href = \"index.php?category=index\" class = \"navbar-brand\" style = \"color: #00a885;font-size:20px\">港大 RIC</a>";
        html += "</div>";
        //end nav header
        //display detail
        html += "<div class = \"collapse navbar-collapse\" id = \"detailed-nav\">";
        html += "<ul class = \"nav navbar-nav\">";
        //        html += "<li><a href = \"books.html\">二手书籍</a></li>";
        html += "<li><a href = \"housing.php?category=wantRoommate\">租房信息</a></li>";
        html += "<li><a href = \"course.php?category=CCCH\">选课评价</a></li>";
        html += "<li><a href = \"aboutus.html\">关于我们</a></li>";
        html += "<li><a href = \"log.php\">优化日志</a></li>";
        if(ses == ""){
                html += "<li id = \"liSignUp\"><a data-toggle = \"modal\" href = \"#myModalSign\">登入</a></li>";
        }
        else{
//                html += "<li id = \"liAccount\"><a href = \"account.html?category=userInfo\">个人中心</a></li>";
                html += "<li class = \"dropdown\" role = \"presentation\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">我要发布<span class = \"caret\"></span></a>";
                html += "<ul role=\"menu\" class=\"dropdown-menu\">";
//                html += "<li><a href=\"publishBook.html\" class=\"btn btn-default\" role=\"button\" style = \"border: none\">二手书交易</a></li>";
                html += "<li><a href=\"publishHousing.html\" class=\"btn btn-default\" role=\"button\" style = \"border: none\">房屋招租</a></li>";
                html += "<li><a href=\"publishWarehouse.html\" class=\"btn btn-default\" role=\"button\" style = \"border: none\">假期储物</a></li>";
//                html += "<li><a href=\"publishCourseReview.html\" class=\"btn btn-default\" role=\"button\" style = \"border: none\">课程评价</a></li>";
                html += "</ul></li>";	
                html += "<li id = \"liSignOut\"><a data-toggle = \"modal\">登出</a></li>";
        }
        html += "</ul>";
        //detail ends here
//        html += "</div>";
        document.getElementById("navTop").innerHTML = html;
}

function displayRegulation(){
        var html = "";
        html += "<div class=\"modal-dialog\" id = \"divRegulation\" style = \"display: none;\">";
        html += "<div class=\"modal-content\" style = \"background:none;\">";
        html += "<div class=\"modal-header\" style = \"background: white; opacity: 0.93;\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"myModalLabel\">服务条款</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\" style = \"background: white; opacity: 0.93;\">";	
        html += "<p>欢迎使用由香港大学内地本科生联合会权益保障组运营的港大内地生信息交流平台RIC杂货铺。我们在此提醒您：网上交易存在一定风险，请您在交易前谨慎核实相关信息。本站不提供中介服务。在您使用我们的任何服务前，请仔细阅读以下条款：</p>";
                html += "<p>一、任何人不得在本站发布违反中华人民共和国及中华人民共和国香港特别行政区法令法规之信息。</p>";
                html += "<p>二、任何个人在本站进行交易的产品，都必须保证是通过合法渠道获得，如有违反，卖方承担一切法律责任以及相关的经济赔偿，本站不承担任何责任。</p>";
                html += "<p>三、RIC致力于维护您的合法权益，但对于交易中各种不可预测因素造成的损失，本站不承担任何责任。如果您蒙受损失，我们深表遗憾，并将尽可能避免同类事件再次发生。</p>";
                html += "<p>四、本区谢绝一切商家进行交易。否则管理员会将其作为广告进行处理，删除相应内容，或做出封ID等处罚。</p>";
                html += "<p>五、禁止发布通过外链网站查看交易物品等信息，如发现按照广告处理，一律删除。</p>";
                html += "<p>六、香港大学内地本科生联合会权益保障组在法律允许的范围内保留对本网站一切相关活动的最终解释权。</p>";
        html += "</div>";
        html += "<div class=\"modal-footer\" style = \"background: white; opacity: 0.93;\">";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-offset-6 col-md-6\"><button type=\"button\" class=\"btn btn-default\" id = \"btnChangeSignUp1\">注册新账号</button><button type=\"button\" class=\"btn btn-default\" id = \"btnChangeSignIn1\">已有账号登录</button></div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function displaySignIn(){
        var html = "";
        html += "<div class = \"modal-dialog\" id = \"divSignIn\">";
        html += "<div class=\"modal-content\" style = \"background:none;\">";
        html += "<div class=\"modal-header\" style = \"background: white; opacity: 0.93;\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"myModalLabel\">登录</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";	
        html += "<form role=\"form\" id = \"formSignUp\">";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-envelope\"></span>";
        html += "</div>";
        html += "<input type=\"text\" class=\"form-control\" id=\"inputEmailSignIn\" placeholder=\"输入HKU邮箱\">";
        html += "</input>";
        html += "<div class=\"input-group-addon\">@hku.hk";
        html += "</div>";
        html += "</div>";
        html += "<label id = \"labelEmailSignInError\"></label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span>";
        html += "</div>";
        html += "<input type=\"password\" class=\"form-control\" id=\"inputPwdSignIn\" placeholder=\"输入密码\">";
        html += "</input>";
        html += "</div>";
        html += "<label id = \"labelPwdSignInError\"></label>";
        html += "</div>";
        html += "</form>";
        html += "</div>";
        html += "</div>";
        html += "<div class=\"modal-footer\" style = \"background: white; opacity: 0.93;\">";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-3\"><div class=\"form-group\" style = \"margin-left:-5px\"><p class=\"help-block\" style = \"color: white\"><a id = \"aRegulation1\">服务条款</a></p></div></div>";
        html += "<div class = \"col-md-offset-3 col-md-6\"><button type=\"button\" class=\"btn btn-default\" id=\"btnRstPwd\">忘记密码？</button><button type=\"button\" class=\"btn btn-default\" id = \"btnChangeSignUp2\">注册新账号</button><button type=\"button\" class=\"btn btn-primary\" id = \"btnSubmitSignIn\">登录</button></div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function displaySignUp(){
        var html = "";
        html += "<div class=\"modal-dialog\" id = \"divSignUp\" style = \"display: none;\">";
        html += "<div class=\"modal-content\" style = \"background:none;\">";
        html += "<div class=\"modal-header\" style = \"background: white; opacity: 0.93;\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"myModalLabel\">注册新账号</h4>";
        html += "</div>";
        html += "<!-- Modal 表单-->";
        html += "<div class=\"modal-body\">";	
        html += "<form role=\"form\">";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-envelope\"></span>";
        html += "</div>";
        html += "<input type=\"text\" class=\"form-control\" id=\"inputEmailSignUp\" placeholder=\"输入HKU邮箱\">";
        html += "</input>";
        html += "<div class=\"input-group-addon\">@hku.hk";
        html += "</div>";
        html += "</div>";
        html += "<label class = \"help-block\" style = \"color: white\" id = \"labelEmailSignUpError\" style = \"font-color: white\">请使用HKU邮箱注册喔，我们已经帮你填好了@之后的部分。</label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span>";
        html += "</div>";
        html += "<input type=\"password\" class=\"form-control\" id=\"inputPwd1SignUp\" placeholder=\"输入密码\">";
        html += "</input>";
        html += "</div>";
        html += "<label class = \"help-block\" style = \"color: white\" id = \"labelPwd1SignUpError\"></label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span>";
        html += "</div>";
        html += "<input type=\"password\" class=\"form-control\" id=\"inputPwd2SignUp\" placeholder=\"确认密码\">";
        html += "</input>";
        html += "</div>";
        html += "<label class = \"help-block\" style = \"color: white\" id = \"labelPwd2SignUpError\"></label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<div class=\"input-group\">";
        html += "<div class=\"input-group-addon\"><span class=\"glyphicon glyphicon-phone\"></span>";
        html += "</div>";
        html += "<textarea class=\"form-control\" id=\"textareaContactSignUp\" placeholder=\"如：微信号/手机号。只有需要与你联系的同学才能获得这些信息\"></textarea>";
        html += "</div>";
        html += "<label class = \"help-block\" style = \"color: white\" id = \"labelContactSignUpError\">只有HKU的邮箱可能不能及时联系到你，再留点什么吧？</label>";           
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<div class = \"input-group\">";
        html += "<div class = \"input-group-addon\"><span class =\"glyphicon glyphicon-sort-by-alphabet\"> </span>";
        html += "</div>";
        html += "<select class = \"form-control input-sm\" id = \"selectFacultySignUp\" style =\"font-size: 10pt;\">";
        var arrayId = new Array("none", "Architecture", "Arts", "BusinessEconomics", "Engineering", "Law", "Medicine", "Science", "SocialSciences", "Others");
        var arrayValue = new Array("Faculty", "Architecture", "Arts", "BusinessEconomics", "Engineering", "Law", "Medicine", "Science", "Social Sciences", "Others");
        for(var i = 0; i < 10; i ++){
                html += "<option value = \"" + arrayId[i] + "\">" + arrayValue[i] + "</option>";
        }
        html += "</select>";
        html += "</div>";
        html += "<label class = \"help-block\" style = \"color: white\" id = \"labelFacultySignUpError\"></label>";
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<div class = \"input-group\">";
        html += "<div class = \"input-group-addon\"><span class =\"glyphicon glyphicon-sort-by-order\"> </span>";
        html += "</div>";
        html += "<select class = \"form-control input-sm\" id = \"selectYearSignUp\">";

        var arrayId_ = new Array("none", "postgraduate", "b13up", "b14", "b15", "b16", "b17", "b18");
        var arrayValue_ = new Array("Year", "Postgraduate", "B13 or above", "B14", "B15", "B16", "B17", "B18");
        for(var i = 0; i < 8; i ++){
                html += "<option value = \"" + arrayId_[i] + "\">" + arrayValue_[i] + "</option>";
        }
        html += "</select>";
        html += "</div>";
        html += "<label class = \"help-block\" id = \"labelYearSignUpError\" style = \"color: white\"></label>";
        html += "</div>";
        html += "</form>";
        // 修改：此处添加了“服务条款”相关信息
        html += "<div class = \"form-group\"  style = \"color:white; font-size:16px\"><input type=\"checkbox\" id=\"agreeTerm\" checked = \"checked\" value=\"agreed\"> 我已阅读并同意RIC服务条款</input></div>"
        html += "</div>";
        html += "<div class=\"modal-footer\" style = \"background: white; opacity: 0.93;\">";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-3\"><div class=\"form-group\" style = \"margin-left:-5px\"><p class=\"help-block\" style = \"color: white\"><a id = \"aRegulation2\">服务条款</a></p></div></div>";
        html += "<div class = \"col-md-offset-3 col-md-6\"><button type=\"button\" class=\"btn btn-default\" id = \"btnChangeSignIn2\">已有账号，登录</button><button type=\"button\" class=\"btn btn-primary\" id = \"btnSubmitSignUp\">提交</button></div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function createModal(){
        var html = "";
        html += displaySignUp();
        html += displaySignIn();
        html += displayRegulation();
        document.getElementById("myModalSign").innerHTML = html;
}

function checkPwd(pwd){
        var pattern = new RegExp(/^[a-zA-Z0-9_]{6,20}$/);
        var lenPwd = pwd.length;
        if(lenPwd > 30 || lenPwd < 8){
                return "密码太简单很容易被他人猜到。请再试一次，并至少使用8个字符，至多使用30个字符";
        }
        else if(!pattern.test(pwd)){
                return "密码可包含：字母大小写、数字、下划线(_)";
        }
        return "true";
}

function displayFooter(){
        var html = "<div class=\"container-fluid\">";
        html += "<div class = \"row\" style = \"margin: 10px; text-align: center\">";
        html += "<a href = \"aboutus.html\">2014-2015 香港大学内地本科生联合会权益保障组 Rights and Interests Committee, CSSAUD, HKU</a>";
        html += "</div></div>";
        $('body').append(html);
}


$(document).ready(function(){
        displayFooter();
        checkSession();
        displayNav();
        createModal();

        $('#btnChangeSignUp1').click(function(){
                $('#divSignIn').fadeOut();
                $('#divRegulation').fadeOut();
                $('#divSignUp').fadeIn();
        });
        $('#btnChangeSignUp2').click(function(){
                $('#divSignIn').fadeOut();
                $('#divRegulation').fadeOut();
                $('#divSignUp').fadeIn();
        });
        $('#btnChangeSignIn1').click(function(){
                $('#divSignUp').fadeOut();
                $('#divRegulation').fadeOut();
                $('#divSignIn').fadeIn();
        });
        $('#btnChangeSignIn2').click(function(){
                $('#divSignUp').fadeOut();
                $('#divRegulation').fadeOut();
                $('#divSignIn').fadeIn();
        });
        $('#aRegulation1').click(function(){
                $('#divSignUp').fadeOut();
                $('#divSignIn').fadeOut();
                $('#divRegulation').fadeIn();
        });
        $('#aRegulation2').click(function(){
                $('#divSignUp').fadeOut();
                $('#divSignIn').fadeOut();
                $('#divRegulation').fadeIn();
        });

        //check
        var boolCheck = new Array();
        for(var i = 0; i < 20; i ++){
                boolCheck[i] = false;
        }

        function checkEmail(email){
                var lenEmail = email.length;
                var pattern2 = new RegExp(/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/);
                var pattern3 = new RegExp(/^"(\\\\"|[^"])+"$/);
                if (email[0] == '.' || email[lenEmail - 1] == '.' || lenEmail == 0 || !pattern2.test(email)){
                        return false;
                }
                return true;
        }

        function checkValid(end){
                for(var i = 0; i < end; i ++){
                        if(boolCheck[i] == false)
                                return false;
                }
                return true;
        }

        //check signIn
        $('#inputEmailSignIn').blur(function(){		//0: emailSignIn
                boolCheck[0] = checkEmail($('#inputEmailSignIn').val());
                if(boolCheck[0] == false){
                        $('#labelEmailSignInError').text('请填写正确格式的邮箱');
                }
                else{
                        $('#labelEmailSignInError').text('');
                }
        });

        $('#inputPwdSignIn').blur(function(){		//1: pwd
                var pwd = $('#inputPwdSignIn').val();
                var ret = checkPwd(pwd);
                if(ret == "true"){
                        boolCheck[1] = true;
                        $('#labelPwdSignInError').text('');
                }
                else{
                        boolCheck[1] = false;
                        $('#labelPwdSignInError').text(ret);
                }
        });

        $('#btnSubmitSignIn').click(function(){
                var email = $('#inputEmailSignIn').val();
                var pwd = $('#inputPwdSignIn').val();
                if(!checkEmail(email)){
                        $('#labelEmailSignInError').text('请输入正确的邮箱');
                        return ;
                }
                if(pwd == ''){
                        $('#labelPwdSignInError').text('请输入密码');
                        return ;
                }
                var pwd = email + '@' + $('#inputPwdSignIn').val();
                pwd = hex_md5(pwd);
                var ret = queryUser("signIn", pwd);
                if(ret == false)
                        alert("邮箱或密码错误");
                else{
                        getUserInfo();
                        window.location.reload();
                }
        });

        //check signUp
        $('#inputEmailSignUp').blur(function(){	//0: email
                var email = $('#inputEmailSignUp').val();
                boolCheck[0] = checkEmail(email);
                if(boolCheck[0] == false){
                        $('#labelEmailSignUpError').text('请填写正确格式的邮箱');
                }
                else{
                        $('#labelEmailSignUpError').text('');
                }
        });

        $('#inputPwd1SignUp').blur(function(){	//1: pwd1
                var pwd = $('#inputPwd1SignUp').val();
                var ret = checkPwd(pwd);
                if(ret == "true"){
                        boolCheck[1] = true;
                        $('#labelPwd1SignUpError').text('');
                }
                else{
                        boolCheck[1] = false;
                        $('#labelPwd1SignUpError').text(ret);
                }
        });

        $('#inputPwd2SignUp').blur(function(){	//2: pwd2
                var pwd1 = $('#inputPwd1SignUp').val();
                var pwd2 = $('#inputPwd2SignUp').val();
                if(pwd1 != pwd2){
                        $('#labelPwd2SignUpError').text('Oops！和之前输入的密码不相符。再试一次吧？');
                        boolCheck[2] = false;
                }
                else{
                        boolCheck[2] = true;
                        $('#labelPwd2SignUpError').text('');
                }
        });

        $('#selectFacultySignUp').blur(function(){	//3: faculty
                var faculty = $('#selectFacultySignUp').val();
                if(faculty == "none"){
                        $('#labelFacultySignUpError').text('Oops!我们不能识别你所选择的学院。');
                        boolCheck[3] = false;
                }
                else{
                        boolCheck[3] = true;
                        $('#labelFacultySignUpError').text('');
                }
        });

        $('#selectYearSignUp').blur(function(){	//4: year
                var year = $('#selectYearSignUp').val();
                if(year == "none"){
                        $('#labelYearSignUpError').text('Oops!我们不能识别你所选择的届别。');
                        boolCheck[4] = false;
                }
                else{
                        boolCheck[4] = true;
                        $('#labelYearSignUpError').text('');
                }
        });

        $('#textareaContactSignUp').blur(function(){	//5: contact
                var text = $('#textareaContactSignUp').val();
                if(text == ""){
                        $('#labelContactSignUpError').text('只有HKU的邮箱可能不能及时联系到你，再留点什么吧？当有小伙伴选择与你联系时，你们将可以看到对方的联系信息');
                        boolCheck[5] = false;
                }
                else{
                        boolCheck[5] = true;
                        $('#labelContactSignUpError').text('');
                }
        });


        $('#btnSubmitSignUp').click(function(){
                if(!checkValid(6)){
                        alert("请输入正确信息");
                }
                else if (! $('#agreeTerm')[0].checked){
                        alert("请先同意RIC服务条款");//修改
                }
                else{
                        var email = $('#inputEmailSignUp').val();
                        var pwd = email + '@' + $('#inputPwd1SignUp').val();
                        pwd = hex_md5(pwd);
                        var contact = $('#textareaContactSignUp').val();
                        var faculty = $('#selectFacultySignUp').val();
                        var year = $('#selectYearSignUp').val();
                        var dataSignUp = new Array(email, pwd, contact, faculty, year);
                        if (queryUser("signUp", dataSignUp) == false){
                                alert("抱歉，这个邮箱已被注册");
                        }
                        else{
                                getUserInfo();
                                alert("您已成功注册");
                        }
                }
        });

        $('#btnSubmitSignUp').click(function(){
                if(!checkValid(6)){
                        alert("请输入正确信息");
                }
                else if (! $('#agreeTerm')[0].checked){
                        alert("请先同意RIC服务条款");//修改
                }
                else{
                        var email = $('#inputEmailSignUp').val();
                        var pwd = email + '@' + $('#inputPwd1SignUp').val();
                        pwd = hex_md5(pwd);
                        var contact = $('#textareaContactSignUp').val();
                        var faculty = $('#selectFacultySignUp').val();
                        var year = $('#selectYearSignUp').val();
                        var dataSignUp = new Array(email, pwd, contact, faculty, year);
                        if (queryUser("signUp", dataSignUp) == false){
                                alert("抱歉，这个邮箱已被注册");
                        }
                        else{
                                getUserInfo();
                                alert("您已成功注册");
                        }
                }
        });


        $('#btnRstPwd').click(function () {
                var email = $('#inputEmailSignIn').val();
                if (!checkEmail(email))
                {
                  $('#labelEmailSignInError').text('请输入正确邮箱以取回密码');
                  return;
                }
                var ret = queryUser('rstPwd', email);
                if (ret == -1)
                  alert("邮箱不正确_(:з」∠)_");
                else
                  alert("验证邮件已发送至HKU邮箱，若未收到请检查一下垃圾邮件_(:з」∠)_");
        });


        //sign out
        $('#liSignOut').click(function(){
                queryServer("destroySession");
                window.location.href = "index.php?category=index";
        });
});

