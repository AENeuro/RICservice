function displayAccountAmount(){
        var retOnShelf, retTrading, retDone;
        retOnShelf = queryBooks("userOnShelf");
        retTrading = queryBooks("userTrading");
        retDone = queryBooks("userDone");
        retOnShelf = eval("(" + retOnShelf + ")").statusInfo;
        retTrading = eval("(" + retTrading + ")").statusInfo;
        retDone = eval("(" + retDone + ")").statusInfo;
        $('#badgeBooks').text(retOnShelf.length + retTrading.length + retDone.length);
}
function displayUlAccount(category){
        var html = "";
        if(category == "userInfo")
                html += "<li role = \"presentation\" class = \"active\"><a href=\"account.html?category=userInfo\">我的个人资料</a></li>";
        else
                html += "<li role = \"presentation\"><a href=\"account.html?category=userInfo\">我的个人资料</a></li>";
        if(category == "book")
                html += "<li role = \"presentation\" class = \"active\"><a href=\"account.html?category=book\">我的二手书交易 <span class=\"badge\" id = \"badgeBooks\"></span> </a></li>";
        //        else
        //                html += "<li role = \"presentation\"><a href=\"account.html?category=book\">我的二手书交易 <span class=\"badge\" id = \"badgeBooks\"></span> </a></li>";
        if(category == "housing")
                html += "<li role = \"presentation\" class = \"active\"><a href=\"account.html?category=housing\">我的租房信息 <span class=\"badgeHousing\"></span> </a></li>";
        else
                html += "<li role = \"presentation\"><a href=\"account.html?category=housing\">我的租房信息 <span class=\"badgeHousing\"></span> </a></li>";
        /*
           if(category == "mark")
           html += "<li role = \"presentation\" class = \"active\"><a href=\"account.html?category=mark\">我的收藏 <span class=\"badge\"></span> </a></li>";
           else
           html += "<li role = \"presentation\"><a href=\"account.html?category=mark\">我的收藏 <span class=\"badge\"></span> </a></li>";
           */
        $('#ulAccount')[0].innerHTML = html;
//        displayAccountAmount();
}

function jsUserInfo(){
        var ret = retUserInfo;
        console.log(ret);
        var contact = ret.contact;
        var email = ret.email;
        var pwd = ret.pwd;

        var boolCheck = Array();
        for(var i = 0; i < 20; i ++){
                boolCheck[i] = false;
        }

        //put Email
        document.getElementById("textareaContact").placeholder = contact;
        $('#h5Email').text(email + "@hku.hk");
        $('#h5Year').text(ret.year);
        $('#h5Faculty').text(ret.faculty);

        $('#btnSubmitChange').click(function(){
                var inputNewPassword = $('#inputNewPassword').val();
                var inputNewPassword2 = $('#inputNewPassword2').val();
                var textareaContact = $('#textareaContact').val();
                var cPwd = false, cContact = false;
                var flag = true;
                if(inputNewPassword != "" || inputNewPassword2 != ""){
                        var retCheckPwd = checkPwd(inputNewPassword);
                        if(retCheckPwd == "true")
                $('#labelNewPasswordError').text('');
                        else{
                                $('#labelNewPasswordError').text(retCheckPwd);
                                flag = false;
                        }
        if(inputNewPassword != inputNewPassword2){
                $('#labelNewPassword2Error').text('Oops！和之前输入的密码不相符。再试一次吧？');
                flag = false;
        }
        cPwd = true;
                }
                if(textareaContact != ""){
                        cContact = true;
                }
                if(!flag){
                        alert("请输入信息");
                }
                else{
                        if(cPwd)
                                queryUser("updatePwd", inputNewPassword);
                        if(cContact)
                                queryUser("updateContact", textareaContact);
                }
        });
}

function jsAccountBooks(){
        //trading
        var ret = queryBooks("userTrading");
        $('#divTrading')[0].innerHTML = htmlDivBooks("trading", ret);
        /*
           var btnObj = document.getElementsByName("btnTradingDone");
           var l = btnObj.length;
           for(var i = 0; i < l; i ++){
           var id = btnObj[i].id;
           $("#" + id).bind('click', function(){
           var obj = this;
           var objId = obj.id.substr(14);
           objId = objId.split("-");
           var cat = objId[0].split("_")[1];
           var bookId = objId[1].split("_")[1];
           queryBooks("changeStatus", Array(cat, bookId, "Done"));
           });
           }
           */
        //onShelf
        ret = queryBooks("userOnShelf");
        $("#divOnShelf")[0].innerHTML = htmlDivBooks("onShelf", ret);
        //call function.js
        /*
           var btnObj = document.getElementsByName("btnChangeBookInfo");
           var l = btnObj.length;
           for(var i = 0; i < l; i ++){
           var id = btnObj[i].id;
           $('#' + id).bind('click', function(){
           var obj = this;
           var objId = obj.id.substr(17);
           objId = objId.split("-");
           var cat = objId[0].split("_")[1];
           var bookId = objId[1].split("_")[1];
           window.open("bookDetail.html?category=" + cat + "&bookId=" + bookId + "&contact=false&changeable=true");
           });
           }
           }
           */
        ret = queryBooks("userDone");
        $("#divDone")[0].innerHTML = htmlDivBooks("done", ret);
        }
function operateBtnDeleteHousing(){
        var btnObj = document.getElementsByName("btnDeleteHousing");
        var l = btnObj.length;
        for(var i = 0; i < l; i ++){
                var btnId = btnObj[i].id;
                $("#" + btnId).click(function(){
                        var id = this.id;
                        id = id.split("btnDeleteHousing")[1];
                        if(confirm("确认删除此条租房信息？")){
                                console.log(queryHousing("delete", id));
                                alert("删除成功");
                                window.location.reload();
                        }
                });
        }
}

function operateBtnDeleteWarehouse(){
        var btnObj = document.getElementsByName("btnDeleteWarehouse");
        var l = btnObj.length;
        for(var i = 0; i < l; i ++){
                var btnId = btnObj[i].id;
                $("#" + btnId).click(function(){
                        var id = this.id;
                        id = id.split("btnDeleteWarehouse")[1];
                        if(confirm("确认删除此条仓库信息？")){
                                queryWarehouse("delete", id);
                                alert("删除成功");
                                window.location.reload();
                        }
                });
        }
}
function jsAccountHousings(){
        //myHousing
        var ret = queryHousing("myPublish");
        ret = eval("(" + ret + ")");
        ret = ret.myPublish;
        var html = "";
        if(ret && ret.length > 0){
                for(var i = 0; i < ret.length; i ++){
                        html += gadgetHousing(ret[i]);
                }
        }
        else{
                html = "您未发布任何租房信息";
        }
        $('#divMyHousing')[0].innerHTML = html;
        operateBtnDeleteHousing();
        //myContact
        var wantHousings = retUserInfo.wantHousings;
        html = "";
        var cnt = 0;
        if(wantHousings){
                wantHousings = wantHousings.split(";");
                var l = wantHousings.length;
                for(var i = 0; i < l - 1; i ++){
                        var tmp = queryHousing("detail", wantHousings[i]);
                        tmp = eval("(" + tmp + ")");
                        tmp = tmp.detail;
                        if(tmp){
                        html += gadgetHousing(tmp);
                        cnt ++;
                        }
                }
        }
        if(cnt == 0){
                html = "您未联系任何租房";
        }
        $('#divContactHousing')[0].innerHTML = html;
        //warehouse
        var wantWarehouses = retUserInfo.wantWarehouses; 
        html = "";
        var cnt = 0;
        if(wantWarehouses){
                wantWarehouses = wantWarehouses.split(";");
                for(var i = 0; i < wantWarehouses.length - 1; i ++){
                        var tmp = queryWarehouse("detail", wantWarehouses[i]);
                        tmp = eval("(" + tmp + ")");
                        tmp = tmp.detail;
                        if(tmp){
                                cnt ++;
                        html += gadgetWarehouse(tmp);
                        }
                }
        }
        var publishedWarehouses = queryWarehouse("published", retUserInfo.id);
        publishedWarehouses = eval("(" + publishedWarehouses + ")");
        publishedWarehouses = publishedWarehouses.published;
        if(publishedWarehouses){
                var l = publishedWarehouses.length;
                for(var i = 0; i < l; i ++){
                        cnt ++;
                        html += gadgetWarehouse(publishedWarehouses[i]);
                }
        }
        if(cnt == 0)
                html += "您未有任何仓库信息";
        $('#divWantWarehouses')[0].innerHTML = html;
        operateBtnDeleteWarehouse();
}

function jsAccountMarks(){
        var ret, html;
        ret = retUserInfo;
        html = "";
        //markBook
        /*
           var markBook = ret.markBook;
           if(markBook){
           markBook = markBook.split(";");
           console.log(markBook);
           html = "<div class = \"row\">";
           for(var i = 0; i < markBook.length - 1; i ++){
           var tmp = markBook[i];
           console.log(tmp);
           tmp = tmp.split("|");
           console.log(tmp);
           var category = tmp[0];
           tmp = queryBooks("detail", Array(tmp[0], tmp[1]));
           tmp = eval("(" + tmp + ")");
           if(i % 2 ==0){
           if(i != 0){
           html += "</div>";
           }
           html += "<div class = \"row\">";
           }
           html += gadgetBook("", tmp, category);
           }
           html += "</div>";
           }
           $('#divMarkBook')[0].innerHTML = html;
           */
        //markCourse
        /*
           html = "";
           var markCourse = ret.markCourse;
           if(markCourse){
           markCourse = markCourse.split(";");
           for(var i = 0; i < markCourse.length - 1; i ++){
           var tmp = markCourse[i];
           tmp = tmp.split("|");
           console.log(tmp);
           tmp = queryCourses("courseInfo", Array(tmp[0], tmp[1]));
           console.log(tmp);
           tmp = eval("(" + tmp + ")").courseInfo;
           if(tmp){
           console.log(tmp);
           html += gadgetCourse(tmp, tmp[0]);
           }
           }
           }
           $('#divMarkCourse')[0].innerHTML = html;
           */
        //markHousing
        html = "";
        var markHousing = ret.markHousing;
        if(markHousing){
                markHousing = markHousing.split(";");
                for(var i = 0; i < markHousing.length - 1; i ++){
                        var tmp = queryHousing("detail", markHousing[i]);
                        tmp = eval("(" + tmp + ")");
                        html += gadgetHousing(tmp);
                }
        }
        else{
                html = "您未收藏任何房子";
        }
        $('#divMarkHousing')[0].innerHTML = html;
}

function displayUserInfo(){
        $('#divForA')[0].innerHTML = htmlUserInfo();
        jsUserInfo();
}

function displayAccountBooks(){
        $('#divForA')[0].innerHTML = htmlAccountBooks();
        jsAccountBooks();
}

function displayAccountHousings(){
        $('#divForA')[0].innerHTML = htmlAccountHousings();
        jsAccountHousings();
}

function displayAccountMarks(){
        $('#divForA')[0].innerHTML = htmlAccountMarks();
        jsAccountMarks();
}

$(document).ready(function(){
        var category = app[0];
        displayUlAccount(category);
        if(category == "userInfo"){
                displayUserInfo();
        }
        if(category == "book"){
                displayAccountBooks();
        }
        if(category == "housing"){
                displayAccountHousings();
        }
        if(category == "mark"){
                displayAccountMarks();
        }

        /*

           function displayPanelMarkBook(markBook){
           var books = markBook.split(";");
           var l = courses.length;
           var html = "";
           for(var i = 0; i < l; i ++){
           var book = books[i];
           var category = book.split("&")[0];
           var id = book.split("&")[1];
           var ret = queryBooks("detail", Array(category, id));
           if(i % 2 == 0){
           if(i != 0){
           html += "</div>";
           }
           html += "<div class = \"row\">";
           }
           html += "<div class = \"col-md-6\">";
           html += "<br>";
           html += "<a class = \"col-md-5 col-md-offset-1\" href = \"bookDetail.html?category=" + ret.category + "&bookId=" + ret.id + "&contact=true\">";
           html += "<img  width = \"125px\" height = \"200px\" src = \"../" + ret.picAddress + "\"/>";
           html += "</a>";
           html += "<div class = \"col-md-6\">";
           html += "<h4 class = \"media-heading\" style = \"word-break:break-all\"><a href = \"bookDetail.html?category=" + ret.category + "&bookId=" + ret.id + "&contact=true\">" + ret[i].bookTitle + "</a></h4>";
           html += "</div>";
           html += "<br>";
           html += "</div>";
           }
           html += "</div>";
           document.getElementById("divMarkBook").html = html;
           }
           function displayPanelMarkCourse(markCourse){
           var courses = markCourse.split(";");
           var l = courses.length;
           var html = "";
           for(var i = 0; i < l; i ++){
           var course = courses[i];
           var category = course.split("&")[0];
           var courseCode = course.split("&")[1];
           var ret = queryCourses("courseInfo", Array(category, courseCode));
           ret = eval("(" + ret + ")");
           var courseName = ret.courseName;
           html += "<div class = \"row\">";
           html += "<a style = \"margin-left: 1px;\" href = \"courseReview.html\">";
           html += "<div class = \"col-md-2\">";
           html += "<label class = \"control-label\" style= \"font-size: 15px\">" + courseCode + "</label>";
           html += "</div>";
           html += "<div class = \"col-md-7\">";
           html += "<label class = \"control-label\" style= \"font-size: 15px\">" + courseName + "</label>";
           html += "</div>";
           html += "<div class = \"div_hr col-md-11\" style = \"margin-left:25px\">";
           html += "</div>";
           html += "</a>";
           html += "</div>";
           }
           html += "<div class = \"row\"><div class = \"div_hr\"></div></div>";
           document.getElementById("divMarkCourse").innerHTML = html;
           }
           */

});

