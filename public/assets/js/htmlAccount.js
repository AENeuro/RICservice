function gadgetUser(tmp){ //显示在detail页面的卖家/买家信息
        var html = "";
        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-3 control-label\">邮箱</label>";
        html += "<label class=\"col-md-9\">" + tmp.email + "@hku.hk" + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-3 control-label\">联系方式</label>";
        html += "<label class=\"col-md-9\">" + tmp.contact + "</label>";
        html += "</div>";

        // html += "<div class=\"form-group\">";
        // html += "<label class=\"col-md-3 control-label\">专业</label>";
        // html += "<label class=\"col-md-9\">" + tmp.faculty + "</label>";
        // html += "</div>";

        // html += "<div class=\"form-group\">";
        // html += "<label class=\"col-md-3 control-label\">届别</label>";
        // html += "<label class=\"col-md-9\">" + tmp.year + "</label>";
        // html += "</div>";
        return html;
}
function gadgetWarehouse(ret){
        var wid = screen.width;
        var html = "";
        html += "<div class = \"row\">";
        if(wid >= 800){
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">" + ret.timePost + "</label></div>";
        html += "<a class = \"col-md-7\" href = \"housingDetail.php?category=wantWarehouse&id=" + ret.id + "\">";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayType\">" + ret.type + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayLocation\">" + ret.place + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayDelivery\">" + ret.methodDelivering + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayPeriod\">" + ret.timeStart + "-" + ret.timeEnd + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayPeriod\">" + ret.price + " HKD</span>|</label>";
        html += "</a>";
        }
        else{
        html += "<div class = \"col-xs-offset-1 col-xs-11\"><a href = \"housingDetail.php?category=wantWarehouse&id=" + ret.id + "\">";
        html += "<div class = \"row\"><label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayType\">" + ret.type + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayLocation\">" + ret.place + "</span>|</label>";
        html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayDelivery\">" + ret.methodDelivering + "</span>|</label></div>";
        html += "</a>";
        html += "<div class = \"row\"><label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayPeriod\">" + ret.timeStart + "-" + ret.timeEnd + "</span></label></div>";
        html += "<div class = \"row\"><label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayPeriod\">" + ret.price + " HKD</span></label></div>";
        html += "</div>";
        }
        if(app[0] == "housing"){
                if(ret.ownerId == retUserInfo.id){
                        html += "<div class = \"col-md-2\">";
                        html += "<button class=\"btn btn-primary\" name = \"btnDeleteWarehouse\" id = \"btnDeleteWarehouse" + ret.id + "\">删除信息</button>";
                        html += "</div>";
                }
        }
        if(app[0] != "housing"){
                if(wid >= 800){
                html += "<div class = \"col-md-2\">";
                html += "<label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayQuota\">" + ret.quota + "/" + ret.totalQuota + "</span></label>";
                html += "</div>";
                }
                else{
                html += "<div class = \"col-xs-offset-1 col-xs-11\"><div class = \"row\">";
                html += "<label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayQuota\">" + ret.quota + "/" + ret.totalQuota + "</span></label>";
                html += "</div></div>";
                }
        }
        if(ret.quota >= 1 && ses != '' && ret.ownerId != retUserInfo.id){
                var wantWarehouses = retUserInfo.wantWarehouses;
                var i = 0, l = 0;
                if(wantWarehouses){
                        wantWarehouses = wantWarehouses.split(";");
                        l = wantWarehouses.length;
                        for(i = 0; i < l - 1; i ++){
                                if(wantWarehouses[i] == ret.id){
	break;
                                }
                        }
                }
                if(i == l && app[0] != "housing"){
                        html += "<div class = \"col-md-1\">";
                        html += "<button name = \"btnWantWarehouse\" id = \"btnWantWarehouse" + ret.id + "\" type=\"button\" class=\"btn btn-primary\">";
                        html += "报名";
                        html += "</button>";
                        html += "</div>";
                }
        }
        html += "</div>";
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        return html;
}

function gadgetHousing(ret){
        var wid = screen.width;
        var html = "";
        html += "<div class = \"row\">";
        
        if(wid >= 800){
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">" + ret.timePost + "</label></div>";
                html += "<a class = \"col-md-7\" href = \"housingDetail.php?category=wantRoommate&id=" + ret.id + "\">";
                html += "<div class = \"row\"><label class = \"col-md-12 control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayTagFree\">" + ret.description + "</span></label></div>";
                html += "<div class = \"row\"><div class = \"col-md-12\"><label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayTagArea\">" + ret.place + "</span>|</label>";
                html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayTagTime\">" + ret.timeMoveIn + " 到 " + ret.timeMoveOut + "</span>|</label>";
                html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayTagGender\">" + ret.gender + "</span>|</label></div></div>";
                html += "</a>";
                html += "<div class = \"col-md-2\">";
                html += "<label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayPrice\">" + ret.price + " HKD/month</label>";
                html += "</div>";
        }
        else{
        
                html += "<div class = \"col-xs-offset-1 col-xs-11\">";

                html += "<div class = \"row\"><a href = \"housingDetail.php?category=wantRoommate&id=" + ret.id + "\"><label class = \"col-xs-12 control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayTagFree\">" + ret.description + "</span></label></a></div>";
                html += "<div class = \"row\"><div class = \"col-xs-12\"><label class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayTagArea\">" + ret.place + "</span>|</label>";
                html += "<label class = \"control-label\" style= \"font-size: 15px\">|<span class = \"text\" id = \"displayTagGender\">" + ret.gender + "</span></label></div></div>";
                html += "<div class = \"row\"><label class = \"col-xs-12 control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayTagTime\">" + ret.timeMoveIn + " 到 " + ret.timeMoveOut + "</span></label></div>";
                html += "<div class = \"row\"><label class = \"col-xs-12 control-label\" style= \"font-size: 15px\">" + ret.price + " HKD/month</label></div>";

                html += "</div>";
       }
        if(app[0] == "housing"){
                if(ret.ownerId == retUserInfo[0]){
                        html += "<div class = \"col-md-2\">";
                        html += "<button class=\"btn btn-primary\" name = \"btnDeleteHousing\" id = \"btnDeleteHousing" + ret[0] + "\">删除信息</button>";
                        html += "</div>";
                }
        }
        html += "</div>";
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        return html;
}

function gadgetBook(flag, ret, category){
        var html = "";
        html += "<div class = \"col-md-6\">";
        html += "<br>";
        html += "<a class = \"col-md-5 col-md-offset-1\" href = \"bookDetail.html?category=" + category + "&bookId=" + ret.id + "&contact=true\">";
        html += "<img  width = \"125px\" height = \"200px\" src = \"../" + ret.picAddress + "\"/>";
        html += "</a>";
        html += "<div class = \"col-md-6\">";
        html += "<h4 class = \"media-heading\" style = \"word-break:break-all\"><a href = \"bookDetail.html?category=" + category + "&bookId=" + ret.id + "&contact=true\">" + ret.bookTitle + "</a></h4>";
        if(flag == 'trading'){
                html += "<button class=\"btn btn-default\" name = \"btnTradingDone\" id = \"btnTradingDoneCategory_" + category + "-bookId_" + ret.id + "\">交易完成</button>";
        }
        if(flag == 'onShelf'){
                html += "<button class=\"btn btn-default\" name = \"btnChangeBookInfo\" id = \"btnChangeBookInfoCategory_" + category + "-bookId_" + ret.id + "\">修改书籍信息</button>";
        }
        html += "</div>";
        html += "<br>";
        html += "</div>";
        return html;
}

function htmlDivBooks(flag, ret){
        var html = "<div class = \"row\">";
        ret = eval("(" + ret + ")");
        ret = ret.statusInfo;
        var l = ret.length;
        for(var i = 0; i < l; i ++){
                if(i % 2 == 0){
                        if(i != 0){
                                html += "</div>";
                        }
                        html += "<div class = \"row\">";
                }
                html += gadgetBook(flag, ret[i]);
        }
        html += "</div>";
        return html;
}

function htmlAccountHousings(){
        var html = "";
        html += "<div class = \"tab-pane active\" style = \"background-color: white; border-radius: 3px\" id = \"panelMark\">";
        html += "<div class = \"panel-group\" id = \"accordion\" role = \"tablist\" aria-multiselectable=\"true\">";
        html += "<!--导航按钮-->";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelMyHousing\" aria-expanded=\"true\" aria-controls=\"collapseTrading\">我发布的房子</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelMyHousing\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingTrading\">";
        html += "<div class = \"form-group\" id = \"divMyHousing\" style = \"margin: 10px\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelContactHousing\" aria-expanded=\"true\" aria-controls=\"collapseOnShelf\">我联系的房子</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelContactHousing\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingOnShelf\">";
        html += "<div class = \"form-group\" id = \"divContactHousing\" style = \"margin: 10px\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelWantWarehouses\" aria-expanded=\"true\" aria-controls=\"collapseDone\">我的储物</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelWantWarehouses\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingDone\">";
        html += "<div class = \"form-group\" id = \"divWantWarehouses\" style = \"margin: 10px\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function htmlAccountMarks(){
        var html = "";
        html += "<div class = \"tab-pane active\" style = \"background-color: white; border-radius: 3px\" id = \"panelMark\">";
        html += "<div class = \"panel-group\" id = \"accordion\" role = \"tablist\" aria-multiselectable=\"true\">";
        /*
           html += "<div class = \"panel panel-default\">";
           html += "<div class = \"panel-heading\" role = \"tab\">";
           html += "<h4 class = panel-title>";
           html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelMarkBook\" aria-expanded=\"true\" aria-controls=\"collapseTrading\">我收藏的书</a>";
           html += "</h4>";
           html += "</div>";
           html += "<div id = \"panelMarkBook\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingTrading\">";
           html += "<div class = \"form-group\" id = \"divMarkBook\">";
           html += "</div>";
           html += "</div>";
           html += "</div>";
           */
        /*
           html += "<div class = \"panel panel-default\">";
           html += "<div class = \"panel-heading\" role = \"tab\">";
           html += "<h4 class = panel-title>";
           html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelMarkCourse\" aria-expanded=\"true\" aria-controls=\"collapseOnShelf\">我收藏的课程</a>";
           html += "</h4>";
           html += "</div>";
           html += "<div id = \"panelMarkCourse\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingOnShelf\">";
           html += "<div class = \"form-group\" id = \"divMarkCourse\">";
           html += "</div>";
           html += "</div>";
           html += "</div>";
           */
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelMarkHousing\" aria-expanded=\"true\" aria-controls=\"collapseDone\">我收藏的房子</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelMarkHousing\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingDone\">";
        html += "<div class = \"form-group\" id = \"divMarkHousing\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function htmlAccountBooks(){
        var html = "";
        html += "<div class = \"tab-pane active\" style = \"background-color: white; border-radius: 3px\" id = \"panelMark\">";
        html += "<div class = \"panel-group\" id = \"accordion\" role = \"tablist\" aria-multiselectable=\"true\">";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelTrading\" aria-expanded=\"true\" aria-controls=\"collapseTrading\">交易中的书</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelTrading\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingTrading\">";
        html += "<div class = \"form-group\" id = \"divTrading\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelOnShelf\" aria-expanded=\"true\" aria-controls=\"collapseOnShelf\">还在架上的书</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelOnShelf\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingOnShelf\">";
        html += "<div class = \"form-group\" id = \"divOnShelf\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class = \"panel panel-default\">";
        html += "<div class = \"panel-heading\" role = \"tab\">";
        html += "<h4 class = panel-title>";
        html += "<a data-toggle = \"collapse\" data-parent = \"#accordion\" href = \"#panelDone\" aria-expanded=\"true\" aria-controls=\"collapseDone\">交易完成的书</a>";
        html += "</h4>";
        html += "</div>";
        html += "<div id = \"panelDone\" class = \"panel-collapse collapse\" role = \"tabpanel\" aria-labelledby=\"headingDone\">";
        html += "<div class = \"form-group\" id = \"divDone\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function htmlUserInfo(){
        var html = "";
        html += "<div role = \"tabpanel\" class = \"tab-pane active\" style = \"background-color: white; border-radius: 3px\" id = \"panelUserInfo\">";
        html += "<div class = \"form-horizontal\" style = \"margin: 10px\">";

        html += "<div class=\"form-group\">";
        html += "<label for = \"inputEmail3\" class = \"col-sm-2 control-label\"> 注册邮箱</br>(不可修改)</label>";
        html += "<div class=\"col-sm-10\" id = \"displayHKUEmail\">";
        html += "<label id = \"h5Email\"></label>";
        html += "</div>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class = \"col-sm-2 control-label\"> 届别</br>(不可修改)</label>";
        html += "<div class=\"col-sm-10\" id = \"displayYear\">";
        html += "<label id = \"h5Year\"></label>";
        html += "</div>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class = \"col-sm-2 control-label\"> 专业</br>(不可修改)</label>";
        html += "<div class=\"col-sm-10\" id = \"displayFaculty\">";
        html += "<label id = \"h5Faculty\"></label>";
        html += "</div>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label for=\"inputNewPassword\" class=\"col-sm-2 control-label\">修改密码</label>";
        html += "<div class=\"col-sm-10\">";
        html += "<input type=\"password\" class=\"form-control\" id=\"inputNewPassword\" placeholder=\"请输入新密码\">";
        html += "</div>";
        html += "<label for=\"text\" class=\"col-sm-8 control-label\" style = \"color: red\" id = \"labelNewPasswordError\"></label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<label for=\"inputNewPassword2\" class=\"col-sm-2 control-label\">确认密码</label>";
        html += "<div class=\"col-sm-10\">";
        html += "<input type=\"password\" class=\"form-control\" id=\"inputNewPassword2\" placeholder=\"请再次输入新密码\">";
        html += "";
        html += "</div>";
        html += "<label id = \"labelNewPassword2Error\"for=\"text\" class=\"col-sm-8 control-label\" style = \"color: red\"></label>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<label for=\"inputContact\" class=\"col-sm-2 control-label\">联系方式</label>";
        html += "<div class=\"col-sm-10\">";
        html += "<textarea class = \"form-control\" id = \"textareaContact\"></textarea>";
        html += "</div>";
        html += "</div>";
        html += "<div class=\"form-group\">";
        html += "<div class=\"col-sm-offset-2 col-sm-10\">";
        html += "<button type = \"button\" class=\"btn btn-primary\" id = \"btnSubmitChange\">提交修改</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

