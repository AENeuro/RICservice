$(document).ready(function(){
        function addClickLog(){
                //post log
                $('#btnLogPost').bind('click', function(){
                        var comment = $('#textareaLog').val();
                        queryBetaComment("post", Array('log', comment, "pending"));
                });

                //delete log
                var divObjs = document.getElementsByName("aLog");
                var lDivObj = divObjs.length;
                for(var i = 0; i < lDivObj; i ++){
                        var divObj = divObjs[i];
                        $("#" + divObj.id).bind("click", function(){
                                var objId = this.id;
                                var mysqlId = objId.split("aLog")[1];
                                queryBetaComment("delete", mysqlId);
                        });
                }

                //approve log
                var btnObjs = document.getElementsByName("btnLogAppr");
                var lBtnObjs = btnObjs.length;
                for(var i = 0; i < lBtnObjs; i ++){
                        var btnObj = btnObjs[i];
                        $('#' + btnObj.id).bind('click', function(){
                                var objId = this.id;
                                var mysqlId = objId.split("btnLogAppr")[1];
                                queryBetaComment("approve", mysqlId);
                        });
                }
        }

        function sortLogs(a, b){
                return b.id - a.id;
        }

        function displayLog(){
                var ret = queryBetaComment("showLogs");
                ret = eval("(" + ret + ")");
                ret = ret.logs;
                if(ret)
                        ret.sort(sortLogs);
                var html = "";
                if(ret && ret.length > 0){
                        html += "<div class = \"panel panel-default\" style = \"padding: 20px\">";
                        var l = ret.length;
                        for(var i = 0; i < l; i ++){
                                if(permission == "admin"){
	html += "<div class=\"row\">";
	html += "<div class = \"col-xs-1\" style = \"text-align: right\"><a name = \"aLog\" id = \"aLog" + ret[i].id + "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></div>";

	html += "<div class = \"col-xs-8\"><label class = \"control-label\">" + ret[i].comment + "</label></div>";
	html += "<div class = \"col-xs-2\">";
	if(ret[i].stat == "pending"){
	        html += "<button class = \"btn btn-primary\" name = \"btnLogAppr\" id = \"btnLogAppr" + ret[i].id + "\">完成啦！</button>";
	}
	else{
	        html += "<label>" + ret[i].timePost + "</label>";
	}
	html += "</div></div>";
	html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
                                }
                                else if(ret[i].stat == "approved"){
	html += "<div class=\"row\">";
	html += "<div class = \"col-xs-offset-1 col-xs-10\"><label class = \"control-label\">" + ret[i].comment + "</label></div></div>";
	html += "<div class = \"row\"><div class = \"col-xs-offset-6 col-xs-6\"><label>" + ret[i].timePost + "</label></div></div>";
	html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
                                }
                        }
                        html += "</div>";

                }
                return html;
        }

        function displayFrameLog(){
                var html = "";
                html += "<div class=\"row\" style = \"text-align: center;\">";
                html += "<h1 style = \"margin-top: 80px; color: #ffffff\">优化日志</h1>";
                html += "</div>";
                if(permission == "admin"){
                        html += "<div class=\"row\">";
                        html += "<div class = \"col-md-offset-1 col-md-10 col-xs-offset-1 col-xs-10\">"
                                html += "<textarea class=\"form-control\" placeholder = \"待更改的优化\" id = \"textareaLog\"></textarea>";
                        html += "</div></div>";
                        html += "<div class=\"row\" style = \"margin-top: 10px; margin-bottom: 20px; text-align: center\">";
                        html += "<button class = \"btn btn-default\" type=\"submit\" id = \"btnLogPost\">提交优化</button>";
                        html += "</div>";
                }
                html += "<div id = \"divDisplayLog\" class=\"row\" style = \"margin: 10px; padding: 10px\">";
                html += "</div>";
                return html;
        }

        $('#divLog').html(displayFrameLog());
        $('#divDisplayLog').html(displayLog());
        addClickLog();
});

