function setPicClick(){
        var obj = $("img[name='imgPic']");
        $("img[name='imgPic']").click(function(){
                var src = $(this).prop('src');
                $("<img/>")
                .attr("src", src)
                .load(function(){
                        var width, height;
                        width = this.width;
                        width = Math.min(width, $(window).width() - 30);
                        $('#divModalPic').width(width + 30);
                        $('#divBodyPic')[0].innerHTML = "<img style=\"margin: auto; width: " + width + "px\" src=\"" + src + "\">";
                        $('#modalPic').modal('show');
                });
        });
}

function displayWantRoommateDetailShowPic(){
        var id = app[1];
        var ret = queryHousing("detail", id);
        ret = eval("(" + ret + ")");
        ret = ret.detail;
                var picAddress = ret.picAddress.split(";");
                var lPicAddress = picAddress.length - 1;
        $('#divWantRoommatePic')[0].innerHTML = showPic(picAddress, lPicAddress);
                setPicClick();
}
function displayWantRoommateDetail(){
        var width = screen.width;
        var id = app[1];
        var ret = queryHousing("detail", id);
        ret = eval("(" + ret + ")");
        ret = ret.detail;
        var html = "";
        if(ret){
                var picAddress = ret.picAddress.split(";");
                var lPicAddress = picAddress.length - 1;
                html += "<div class = \"form-group\" style = \"margin: 15px\">";
                html += "<div class=\"row\">";

                if (width <= 800){
                        html += "<div class=\"form-group\">";
                        html += "<new-tit class=\"col-md-12\">" + ret.description + "</new-tit>";
                        html += "</div>";
                        html += gadgetShare();
                }

                html += "<div id = \"divWantRoommatePic\" class= \"col-md-4\" style=\"height:320px\">";
                html += "</div>";
                html += "<div class= \"col-md-8\">";

                if (width > 800){
                        html += "<div class=\"form-group\">";
                        html += "<new-tit class=\"col-md-12\">" + ret.description + "</new-tit>";
                        html += "</div>";
                        html += gadgetShare();
                }

                html += "<div class = \"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">发布时间</label>";
                html += "<label class = \"col-md-9\">" + ret.timePost + "</label>";
                html += "</div>";

                html += "<div class = \"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">所在区域</label>";
                html += "<label class = \"col-md-9\">" + ret.place + "</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">小区名称</label>";
                html += "<label class = \"col-md-9\">" + ret.nameBuilding + "</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">开始日期</label>";
                html += "<label class=\"col-md-9\">" + ret.timeMoveIn + "</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">结束日期</label>";
                html += "<label class=\"col-md-9\">" + ret.timeMoveOut + "</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">预计租金</label>";
                html += "<label class=\"col-md-9 control-label\" style= \"font-size: 15px\"><span class = \"text\" id = \"displayRent\" >" + ret.price + "</span>/月</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">舍友性别</label>";
                html += "<label class=\"col-md-9\">" + ret.gender + "</label>";
                html += "</div>";

                html += "<div class=\"form-group\">";
                html += "<label class=\"col-md-3 control-label\" style=\"color:#6E6E6E\">详细信息</label>";
                if (ret.residentInfo == "")
                        html += "<label class=\"col-md-9\">(无)</label>";
                else
                        html += "<label class=\"col-md-9\">" + ret.residentInfo + "</label>";
                html += "</div>";

                if(ses != ""){
                        if(retUserInfo.id != ret.ownerId){
                                var ownerInfo = queryUser("userInfo", ret.ownerId);
                                ownerInfo = eval("(" + ownerInfo + ")");
                                ownerInfo = ownerInfo.userInfo;
                                if(ownerInfo){
	html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线 // 修改
	html += "<div class=\"row\" style=\"font-size: 18px\"><div class = \"col-md-4\">房主:</div></div>"; //修改： 删除col-md-offset-2
	html += gadgetUser(ownerInfo);
                                }
                        }
                        else{
                                html += "<div class=\"form-group\">";
                                html += "<div class=\"col-md-9\">"; //col-md-offset-3
                                html += "<button id = \"btnDeleteHousing\" class=\"btn btn-primary\">删除</button>";
                                html += "</div>";
                                html += "</div>";
                                var wantUsers = ret.wantUsers;
                                if(wantUsers){
	wantUsers = wantUsers.split(";");
	var l = wantUsers.length;
	for(var i = 0; i < l - 1; i ++){
	        var tmp = queryUser("userInfo", wantUsers[i]);
	        tmp = eval("(" + tmp + ")");
	        tmp = tmp.userInfo;
	        html += "<div class = \"row\" style=\"font-size: 18px\"><label class=\" col-md-4\">联系人" + (i + 1) + "</label></div>"; // 修改：删除col-md-offset-2
	        html += gadgetUser(tmp);
	}
                                }
                        }
                }
                else{
                        html += "<div class=\"form-group\">";
                        html += "<div class=\"col-md-9\">"; //col-md-offset-3

                        html += "<label style=\"color:#C0C0C0\">没有找到房主的联系方式？您可以在登录后查看~</label>";
                        html += "</div>";
                        html += "</div>";
                }

                html += "</div>";
                html += "</div>";

                html += "</div>";
        }
        else{
                html += "这条租房信息已过期";
        }
        $('#panelHousingDetail')[0].innerHTML = html;
}

function displayWantWarehouseDetail(){
        var id = app[1];
        var ret = queryWarehouse("detail", id);
        ret = eval("(" + ret + ")");
        ret = ret.detail;
        var html = "";
        html += "<br>";
        html += "<div class = \"form-group\" style = \"margin-left:15px\">";

        html += "<div class=\"row\">";

        html += "<div class= \"col-md-offset-1 col-md-10\">";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">发布时间</label>";
        html += "<label class = \"col-md-10\">" + ret.timePost + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">剩余名额</label>";
        html += "<label class = \"col-md-10\">" + ret.quota + "/" + ret.totalQuota + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">开始日期</label>";
        html += "<label class = \"col-md-10\">" + ret.timeStart + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">结束日期</label>";
        html += "<label class=\"col-md-10\">" + ret.timeEnd + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">储物类型</label>";
        html += "<label class=\"col-md-10\">" + ret.type + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">储物地点</label>";
        html += "<label class=\"col-md-10\">" + ret.place + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">运输方式</label>";
        html += "<label class=\"col-md-10\">" + ret.methodDelivering + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">预计价格</label>";
        html += "<label class=\"col-md-10\">" + ret.price + "</label>";
        html += "</div>";

        html += "<div class=\"form-group\">";
        html += "<label class=\"col-md-2 control-label\" style=\"color:#6E6E6E\">备注</label>";
        if(ret.extra){
                html += "<label class=\"col-md-10\">" + ret.extra + "</label>";
        }
        else{
                html += "<label class=\"col-md-10\">(无)</label>";
        }
        html += "</div>";

        if(ses != ""){
                if(retUserInfo.id != ret.ownerId){
                        var wantWarehouses = retUserInfo.wantWarehouses;
                        var l = 0, i = 0;
                        if(wantWarehouses){
                                wantWarehouses = wantWarehouses.split(";");
                                l = wantWarehouses.length;
                                for(i = 0; i < l; i ++){
	if(wantWarehouses[i] == ret.id)
	        break;
                                }
                        }
                        if(i == l){
                                html += "<div class=\"form-group\">";
                                html += "<div class=\"col-md-offset-3 col-md-9\">";
                                html += "<button id = \"btnContact\" class=\"btn btn-primary\">报名</button>";
                                html += "</div>";
                                html += "</div>";
                        }
                        else{
                                var ownerInfo = queryUser("userInfo", ret.ownerId);
                                ownerInfo = eval("(" + ownerInfo + ")");
                                ownerInfo = ownerInfo.userInfo;
                                if(ownerInfo){
	html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线
	html += "<div class=\"row\" style=\"font-size: 18px\"><div class = \"col-md-4\">卖家：</div></div>"; // 修改：col-md-offset-2 
	html += gadgetUser(ownerInfo);
                                }
                        }
                }
                else{
                        var wantUsers = ret.wantUsers;
                        if(wantUsers){
                                wantUsers = wantUsers.split(";");
                                var l = wantUsers.length;
                                for(var i = 0; i < l - 1; i ++){
	var tmp = queryUser("userInfo", wantUsers[i]);
	tmp = eval("(" + tmp + ")");
	tmp = tmp.userInfo;
	html += "<div class = \"row\" style=\"font-size: 18px\"><label class=\"col-md-4\">联系人" + (i + 1) + "</label></div>";// 修改：col-md-offset-2
	html += gadgetUser(tmp);
                                }
                        }
                }
        }
        html += "</div>";
        html += "</div>";

        html += "</div>";
        return html;
}

$(document).ready(function(){
        if(app[0] == "wantRoommate"){
                //for displaying the original image
                $('#modalPic')[0].innerHTML = createModalPic();

                displayWantRoommateDetail();
                $('#btnDeleteHousing').click(function(){
                        queryHousing("delete", app[1]);
                        alert("删除成功");
                        window.location.reload();
                });
        }
        if(app[0] == "wantWarehouse"){
                $('#panelHousingDetail')[0].innerHTML = displayWantWarehouseDetail();
                $('#btnContact').click(function(){
                        if(confirm("确认报名")){
                                queryUser("insertWantWarehouses", app[1]);
                                queryWarehouse("insertWantUsers", app[1]);
                                alert("报名成功");
                                window.location.reload();
                        }
                });
        }
});

