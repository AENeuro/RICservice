$(document).ready(function(){
        function addClickAdmin(){
                var divObjs = document.getElementsByName("aAdmin");
                var lDivObj = divObjs.length;
                for(var i = 0; i < lDivObj; i ++){
                        var divObj = divObjs[i];
                        $("#" + divObj.id).bind("click", function(){
                                var objId = this.id;
                                var mysqlId = objId.split("aAdmin")[1];
                                queryBetaComment("delete", mysqlId);
                        });
                }
        }

        function sortComment(a, b){
                return b.id - a.id;
        }

        function displayComments(page){
                var ret = queryBetaComment("showComment", page);
                ret = eval("(" + ret + ")");
                ret = ret.comments;
                if(ret)
                        ret.sort(sortComment);
                var html = "";
                if(ret){
                        var l = ret.length;
                        for(var i = 0; i < l; i ++){
                                html += "<div class = \"row\">";
                                if(permission == "admin"){
	html += "<div class = \"col-xs-1\" style = \"text-align: right\">";
	html += "<a name = \"aAdmin\" id = \"aAdmin" + ret[i].id + "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>";
	html += "</div>";
                                }
                                html += "<div class = \"col-xs-8\">";
                                html += "<label class = \"control-label\">";
                                html += ret[i].comment;
                                html += "</label></div>";
                                html += "</div>";
                                html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
                        }

                }
                document.getElementById("divComments").innerHTML = html;
                addClickAdmin();
        }

        function displayFrame(){
                var html = "<div class=\"container-fluid\">";
                html += "<div class=\"row\" style = \"text-align: center\">";
                html += "<h4>网站意见反馈区</h4>";
                html += "</div>";
                html += "<div class=\"row\">";
                html += "<div class = \"col-md-offset-1 col-md-10 col-xs-offset-1 col-xs-10\">"
                html += "<textarea class=\"form-control\" placeholder = \"你的评价\" id = \"textareaComment\"></textarea>";
                html += "</div></div>";
                html += "<div class=\"row\" style = \"margin-top: 10px; margin-bottom: 20px; text-align: center\">";
                html += "<button class = \"btn btn-default\" type=\"submit\" id = \"btnPostComment\">提交评价</button>";
                html += "</div>";
                html += "<div id = \"divComments\" class=\"row\" style = \"margin: 10px\">";
                html += "</div></div></div>";
                $("body").append(html);
        }

        function getPage(){
                var loc = window.location.href;
                loc = loc.split("/");
                loc = loc[loc.length - 1];
                return loc;
        }

        var page = getPage();
        displayFrame();

        displayComments(page);
        $('#btnPostComment').bind('click', function(){
                var comment = $('#textareaComment').val();
                queryBetaComment("post", Array(page, comment));
        });
});

