function showWantWarehouseBrief(){
        var wid = screen.width;
        var hei = screen.height;
        var html = "<br>";
        html += "<div class = \"form-group\" style = \"margin-left:15px; margin-right: 15px\">";

        html += "<div class = \"row\">";
        html += "<div class = \"col-md-2 col-md-offset-9\"><a href = \"publishWarehouse.html\"><button type=\"button\" class=\"btn btn-primary\">发布新的储物信息</button></a></div>";
        html += "</div>";

        if (wid >= 800){
                html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线
                html += "<div class = \"row\">";
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">发布时间</label></div>";
                html += "<div class = \"col-md-7\"><label class = \"control-label\" style= \"font-size: 15px\"> 描述</label></div>";
                html += "<div class = \"col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">剩余名额</label></div>";
                html += "</div>";
        }
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>"; //这是一条分割线

        var ret = queryWarehouse("wantWarehouseBrief");
        ret = eval("(" + ret + ")");
        ret = ret.wantWarehouseBrief;
        var l = ret.length;
        for(var i = 0; i < l; i ++){
                html += gadgetWarehouse(ret[i]);
        }
        html += "</div>";
        return html;
}

function addBtnWantWarehouse(){
        var btnObjs = document.getElementsByName("btnWantWarehouse");
        for(var i = 0; i < btnObjs.length; i ++){
                var btnObj = btnObjs[i];
                var warehouseId = btnObj.id;
                $('#' + warehouseId).click(function(){
                        if(confirm("确认报名")){
                        var parId = this.id.split("btnWantWarehouse")[1];
                        queryUser("updateWantWarehouses", parId);
                        queryWarehouse("decreaseQuota", parId);
                        alert("报名成功");
                        window.location.reload();
                        }
                });
        }
}

