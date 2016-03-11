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

var eml, key, pwd, data;

$(document).ready(function () { $('#btnSubmit').click(function () {
  pwd = $('#inputNewPwd').val();
  var result = checkPwd(pwd);
  //alert(pwd);
  if (result == "true")
  {
    pwd = hex_md5(eml + "@" + pwd);
    data = new FormData();
    data.append('key', key);
    data.append('pwd', pwd);
    
    document.write(myAjaxSyn(data, '../../public/handle/resetpwd.php'));
  }
  else alert(result);
}); });
