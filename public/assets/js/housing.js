var category;

function compareTimePost(a, b){
        return b.id - a.id;
}

function displayHousing(ret, html) {
        var lRet = ret.length;

        for(var i = 0; i < lRet; i ++){
                html += gadgetHousing(ret[i]);
        }
        return html;
}

function addFilter(ret){
        $('#btnFilterHouseConfirm').click(function () {
                var l = ret.length;
                var retCourse = Array();
                var TimePostStart, TimePostEnd, TimeMoveIn, TimeMoveOut, Gender, PriceLB, PriceHB;

                // Set default boundaries
                if ($('#inputTimePostStart').val() != "") TimePostStart = new Date($('#inputTimePostStart').val()); else TimePostStart = new Date(0);
                if ($('#inputTimePostEnd').val() != "") TimePostEnd = new Date($('#inputTimePostEnd').val()); else TimePostEnd = new Date(2147483647000);
                if ($('#inputTimeMoveIn').val() != "") TimeMoveIn = new Date($('#inputTimeMoveIn').val()); else TimeMoveIn = new Date(0);
                if ($('#inputTimeMoveOut').val() != "") TimeMoveOut = new Date($('#inputTimeMoveOut').val()); else TimeMoveOut = new Date(2147483647000);
                Gender = $('#selectGender').val();
                if ($('#inputPriceLB').val() != "") PriceLB = Number($('#inputPriceLB').val()); else PriceLB = 0;
                if ($('#inputPriceHB').val() != "") PriceHB = Number($("#inputPriceHB").val()); else PriceHB = 2147483647;

                // Verification
                if (isNaN(PriceLB) || isNaN(PriceHB) || PriceHB < PriceLB) {alert ('价格(单位：HKD/月) is invalid :('); return;}
                if (TimeMoveIn > TimeMoveOut) {alert ('租房时间 is invalid :('); return;}
                if (TimePostStart > TimePostEnd) {alert ('发布日期 is invalid :('); return;}

                for(var i = 0; i < l; i ++){
                        var Price = Number(ret[i].price);
                        var TimePost = new Date(ret[i].timePost);
                        var MoveIn = new Date(ret[i].timeMoveIn);
                        var MoveOut = new Date(ret[i].timeMoveOut);

                        if(Gender != ret[i].gender) continue;
                        if(Price > PriceHB || Price < PriceLB) continue;
                        if(TimeMoveIn > MoveIn || MoveOut > TimeMoveOut) continue; // (MoveIn[i], MoveOut[i]) belongs to (TimeMoveIn, TimeMoveOut)
                        if(TimePost < TimePostStart || TimePost > TimePostEnd) continue;
                        retCourse.push(ret[i]);
                }
                console.log(retCourse);
                document.getElementById("spanTabPanel").innerHTML = displayHousing(retCourse, "");
        });
}

function modalFilterHouse(){
        var html = "";
        html += "<div class=\"modal-dialog\">";
        html += "<div class=\"modal-content\" style = \"background:white; opacity: 0.9;\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"modalWikiTitle\">筛选条件</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-12 col-xs-12\" style = \"text-align:center;\"><label>租房时间</label></div>";
        html += "</div>";
        html += "<form class = \"form-inline\" role = \"form\">";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputTimeMoveIn\"><h5>起</h5></label>";
        html += "<input id = \"inputTimeMoveIn\" type=\"text\" class= \"form-control\" readonly = \"readonly\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputTimeMoveOut\"><h5>止</h5></label>";
        html += "<input id = \"inputTimeMoveOut\" type=\"text\" class= \"form-control\" readonly = \"readonly\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "</form>"

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-12 col-xs-12\" style = \"text-align:center;\"><label>发布日期</label></div>";
        html += "</div>";
        html += "<form class = \"form-inline\" role = \"form\">";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputTimePostStart\"><h5>起</h5></label>";
        html += "<input id = \"inputTimePostStart\" type=\"text\" class= \"form-control\" readonly = \"readonly\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputTimePostEnd\"><h5>止</h5></label>";
        html += "<input id = \"inputTimePostEnd\" type=\"text\" class= \"form-control\" readonly = \"readonly\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "</form>"

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-12 col-xs-12\" style = \"text-align:center;\"><label>性别要求</label></div>";
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<select id=\"selectGender\" class=\"form-control\">";
        html += "<option value=\"不限性别\">不限性别</option>";
        html += "<option value=\"限男生\">限男生</option>";
        html += "<option value=\"限女生\">限女生</option>";
        html += "</select>";
        html += "</div>";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-12 col-xs-12\" style = \"text-align:center;\"><label>价格(单位：HKD/month)</label></div>";
        html += "</div>";
        html += "<form class = \"form-inline\" role = \"form\">";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputPriceLB\"><h5>起</h5></label>";
        html += "<input id = \"inputPriceLB\" type=\"text\" class= \"form-control\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "<div class = \"form-group\">";
        html += "<label for = \"inputPriceHB\"><h5>止</h5></label>";
        html += "<input id = \"inputPriceHB\" type=\"text\" class= \"form-control\" placeholder = \"不限\"/>";
        html += "</div>";
        html += "</form>"


        html += "</div>";
        html += "<div class=\"modal-footer\">";
        html += "<button class = \"btn btn-primary\" id = \"btnFilterHouseConfirm\" data-dismiss = \"modal\">确定</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function showWantRoommateBrief(){
        var wid = screen.width;
        var hei = screen.height;
        var html = "<br>";
        html += "<div class = \"form-group\" style = \"margin-left:15px; margin-right: 15px\">";

        html += "<div class = \"row\">";
        html += "<div class = \"col-md-3 col-xs-3\"><a data-toggle = \"modal\" href = \"#modalFilterHouse\"><span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span> 筛选</a></div>"
        html += "<div class = \"col-md-2 col-md-offset-6 col-xs-3 col-xs-offset-6\"><a href = \"publishHousing.html\"><button type=\"button\" class=\"btn btn-primary\">发布新的租房信息</button></a></div>";
        html += "</div>";

        if (wid >= 800){
                html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线
                html += "<div class = \"row\">";
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">发布时间</label></div>";
                html += "<div class = \"col-md-7\"><label class = \"control-label\" style= \"font-size: 15px\"> 描述</label></div>";
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">价格</label></div>";
                html += "</div>";
        }
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线

        var ret = queryHousing("wantRoommateInfo");
        ret = eval("(" + ret + ")");
        ret = ret.info;
        ret = ret.sort(compareTimePost);

        html += "<span id = \"spanTabPanel\">";
        html += displayHousing(ret, "");
        html += "</span>";

        html += "</div>";
        addFilter(ret);
        return html;
}

function displayHousingList(){
        category = app[0];
        var nameList = Array("房屋招租", "假期储物");
        var aList = Array("wantRoommate", "wantWarehouse");
        var lList = 2;
        var html = "";
        for(var i = 0; i < lList; i ++){
                if(category == aList[i])
                        html += "<li role = \"presentation\" class = \"active\"><a class = \"li_a\" href = \"housing.php?category=" + aList[i] + "\">" + nameList[i] + "</a></li>";
                else
                        html += "<li role = \"presentation\"><a class = \"li_a\" href = \"housing.php?category=" + aList[i] + "\">" + nameList[i] + "</a></li>";
        }
        return html;
}

$(document).ready(function(){
        $('#ulHousingList')[0].innerHTML = displayHousingList();
        var pageName = getPageName();
        if(category == "wantRoommate" && pageName == "housing"){
                document.getElementById("modalFilterHouse").innerHTML = modalFilterHouse();
                $('#panelForA')[0].innerHTML = showWantRoommateBrief();
                //timePicker
                $('#inputTimeMoveIn').datepicker({
                        'format': 'yyyy-m-d',
                        'autoclose': true
                });
                $('#inputTimeMoveOut').datepicker({
                        'format': 'yyyy-m-d',
                        'autoclose': true
                });
                $('#inputTimePostStart').datepicker({
                        'format': 'yyyy-m-d',
                        'autoclose': true
                });
                $('#inputTimePostEnd').datepicker({
                        'format': 'yyyy-m-d',
                        'autoclose': true
                });
        }
        if(category == "wantWarehouse" && pageName == "housing"){
                $('#panelForA')[0].innerHTML = showWantWarehouseBrief();
                addBtnWantWarehouse();
        }
});
