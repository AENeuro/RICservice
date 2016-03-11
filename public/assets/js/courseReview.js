function addClickReviewPref(){
        var objs = document.getElementsByName("aLikeReview");
        var lObjs = objs.length;
        /*
        var userLikeReview, lU = 0;
        if(retUserInfo){
                userLikeReview = retUserInfo.likeReview;
                userLikeReview = userLikeReview.split(";");
                lU = userLikeReview.length;
        }
        */
        for(var i = 0; i < lObjs; i ++){
                var obj = objs[i];
                var objId = obj.id;
                $('#' + objId).bind('click', function(){
                        /*
                        if(!retUserInfo){
                                alert("请登录");
                                return ;
                        }
                        */
                        var id = this.id.split("aLikeReview")[1];
                        /*
                        var j = 0;
                        while(userLikeReview[j] != id && j < lU){
                                j ++;
                        }
                        if(j < lU){
                                alert("已点赞");
                                return ;
                        }
                        var tmp = id + ";";
                        retUserInfo.likeReview = retUserInfo.likeReview + tmp;
                        */
                        alert("已点赞");
//                        queryUser("updateLikeReview", retUserInfo.likeReview);//write-through
                        queryCourses("updateLikeReview", id);
                        window.location.reload();
                });
        }
}

function addClickReviewCancel(){
        var objs = document.getElementsByName("btnCancel");
        var lObjs = objs.length;
        for(var i = 0; i < lObjs; i ++){
                var obj = objs[i];
                var objId = obj.id;
                $('#' + objId).bind('click', function(){
                        window.location.reload();
                });
        }
}

function addClickReviewEdit(){
        //aEdit
        var objs = document.getElementsByName("aEdit");
        var lObjs = objs.length;
        for(var i = 0; i < lObjs; i ++){
                var obj = objs[i];
                var objId = obj.id;
                $('#' + objId).bind('click', function(){
                        var id = this.id.split("aEdit")[1];
                        var btnId = "btnEdit" + id;
                        var html = "<div class = \"col-md-8 col-xs-12\"><textarea id = \"textarea" + id + "\" class = \"form-control\">" + $('#labelReview' + id).text() + "</textarea></div>";
                        html += "<div class = \"col-md-2 col-xs-6\"><button id = \"" + btnId + "\" name = \"btnEdit\" class = \"btn btn-primary form-control\" style = \"margin: 3px\">提交更改</button></div>";
                        html += "<div class = \"col-md-2 col-xs-6\"><button id = \"btnCancel" + btnId + "\" name = \"btnCancel\" class = \"btn btn-primary form-control\" style = \"margin: 3px\">取消</button></div>";
                        $('#divReview' + id)[0].innerHTML = html;
                        addClickReviewCancel();
                        if($('#labelYear' + id)[0]){
                                var labelYear = $('#labelYear' + id).text();
                                var labelSem = $('#labelSem' + id).text();
                                $('#divYear' + id)[0].innerHTML = "<select id = \"selectRYear" + id + "\" class = \"form-control\" style = \"margin: 3px\"><option value = \"2012-2013\">2012-2013</option><option value = \"2013-2014\">2013-2014</option><option value = \"2014-2015\">2014-2015</option></select>";
                                $('#selectRYear' + id).val(labelYear);
                                $('#divSem' + id)[0].innerHTML = "<select id = \"selectRSem" + id + "\" class = \"form-control\" style = \"margin: 3px\"><option value = \"Sem1\">Sem1</option><option value = \"Sem2\">Sem2</option></select>";
                                $('#selectRSem' + id).val(labelSem);
                        }
                        $('#' + btnId).bind('click', function(){
                                if(confirm("确认修改？")){
	var id = this.id.split("btnEdit")[1];
	var val = $('#textarea' + id).val();
	var year = "";
	if($('#selectRYear' + id)){
	        year = $('#selectRYear' + id).val();
	}
	var sem = "";
	if($('#selectRSem' + id)){
	        sem = $('#selectRSem' + id).val();
	}
	alert("发布成功");
	queryCourses("updateReview", Array(id, val, year, sem));
	queryUser("updateModify", ses);
	window.location.reload();
                                }
                        });
                });
        }

        var objs = document.getElementsByName("aDelete");
        var lObjs = objs.length;
        for(var i = 0; i < lObjs; i ++){
                var obj = objs[i];
                var objId = obj.id;
                $('#' + objId).bind('click', function(){
                        var ret = confirm("确认删除?");
                        if(ret){
                                var id = this.id.split("aDelete")[1];
                                queryCourses("deleteReview", Array(id, courseCode));
                                queryUser("updateModify", ses);
                                window.location.reload();
                        }
                });
        }
}

function displaySubset(retReview){
        var l = 0;
        if(retReview)
                l = retReview.length;
        for(var i = 0; i < l; i ++){
                if(retReview[i].root == "" || retReview[i].root == null)
                        continue;
                var id = "divSubsetDisplay" + retReview[i].root;
                var html = "<div id = \"divReview" + retReview[i].id + "\" class = \"row\" style = \"background-color: #F5FFFA;\"><div class = \"col-md-11 col-xs-12\"><label id = \"labelReview" + retReview[i].id + "\" class = \"control-label\" style= \"font-size: 15px\">" + retReview[i].review + "</label></div>";
                if(ses != "" && noModify < 4){
                        html += "<div class = \"col-md-1 col-xs-offset-8 col-xs-4\" style = \"background-color: #F5FFFA;\"><a name = \"aEdit\" id = \"aEdit" + retReview[i].id + "\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>&nbsp;&nbsp;<a name = \"aDelete\" id = \"aDelete" + retReview[i].id + "\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></a></div>";
                }
                html += "</div>";
                html += "<div class = \"row\" style = \"background-color: #F5FFFA;\"><div class = \"col-md-offset-9 col-md-3 col-xs-offset-4 col-xs-8\">" + retReview[i].timePost + "</div></div>";
                html += "<div class = \"row\" style = \"background-color: #F5FFFA;\"><div class = \"col-md-12\"><hr></div></div>";
                $('#' + id).append(html);
        }
}
function displayCourseReview(category){
        var retReview = queryCourses("courseReview", courseCode);
        retReview = eval("(" + retReview + ")").reviews;
        var retCourse = queryCourses("courseInfo", courseCode);
        retCourse = eval("(" + retCourse + ")").courseInfo;

        //modalWiki
        $('#modalWiki')[0].innerHTML = modalWiki(retCourse);
        $('#selectWSem').val(retCourse.sem);
        $('#selectWPresen').val(retCourse.presen);
        $('#selectWEssay').val(retCourse.essay);
        $('#selectWGroup').val(retCourse.group);
        $('#btnWikiModify').click(function(){
                alert("提交成功");
                queryCourses("modifyWiki", Array(courseCode, $('#selectWSem').val(), $('#selectWPresen').val(), $('#selectWEssay').val(), $('#selectWGroup').val()));
                window.location.reload();
        });
        //modalWiki end
        //modalReview
        $('#modalReview')[0].innerHTML = modalReview(retCourse);
        //modalReview end

        var html = "";
        html += "<br/>";
        html += displaySingleCourseInfo(category, retReview, retCourse);
        html += displaySingleCourseReview(retReview, retCourse);
        document.getElementById("divTabPanel").innerHTML = html;
        displaySubset(retReview);
        addClickReviewPref();
        addClickCourseBrief(courseCode);
        $('#btnReviewPost').click(function(){
                var review = $('#textareaReview').val();
                if(review == ""){
                        alert("请输入评价");
                }
                else{
                        var year = $('#selectRYear').val();
                        var sem = $('#selectRSem').val();
                        alert("发布成功，您可以登陆后修改");
                        queryCourses("postNewReview", Array(courseCode, review, year, sem));
                        window.location.reload();
                }
        });

        addCourseSubset(courseCode);
        addCourseLike();
        //        markCourse();
}

function addClickCourseBrief(courseCode){
        $('#btnCourseBrief').click(function(){
                var res = confirm("确认修改？");
                if(res){
                        var brief = $('#textareaCourseBrief').val();
                        queryCourses("updateCourseBrief", Array(courseCode, brief));
                        alert("修改成功");
                }
        })
}

function modalWiki(retCourse){
        var html = "";
        html += "<div class=\"modal-dialog\">";
        html += "<div class=\"modal-content\" style = \"background:white; opacity: 0.9;\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"modalWikiTitle\">Wiki-课程介绍</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-offset-1 col-md-1 col-xs-5\"><label>sem</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectWSem\" class = \"form-control\"><option value = \"未知\">未知</option><option value = \"不开课\">不开课</option><option value = \"both\">both</option><option value = \"1\">1</option><option value = \"2\">2</option></select></label></div>";
        html += "<div class = \"col-md-3 col-xs-5\"><label>presentation</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectWPresen\" class = \"form-control\"><option value = \"未知\">未知</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "</div>";
        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-offset-1 col-md-1 col-xs-5\"><label>essay</label></div><div class = \"\"></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectWEssay\" class = \"form-control\"><option value = \"未知\">未知</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "<div class = \"col-md-3 col-xs-5\"><label>group project</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectWGroup\" class = \"form-control\"><option value = \"未知\">未知</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "</div>";

        html += "</div>";
        html += "<div class=\"modal-footer\">";
        html += "<button class = \"btn btn-primary\" id = \"btnWikiModify\" data-dismiss = \"modal\">提交</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        return html;
}

function modalReview(retCourse){
        var html = "";
        html += "<div class=\"modal-dialog\">";
        html += "<div class=\"modal-content\" style = \"background:white; opacity: 0.9;\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"modalWikiTitle\">" + retCourse.courseCode + "</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-3 col-xs-12\">上课时间：</div>";
        html += "<div class = \"col-md-3 col-xs-6\"><select id = \"selectRYear\" class = \"form-control\"><option value = \"2012-2013\">2012-2013</option><option value = \"2013-2014\">2013-2014</option><option value = \"2014-2015\">2014-2015</option></select></div>";
        html += "<div class = \"col-md-3 col-xs-6\"><select id = \"selectRSem\" class = \"form-control\"><option value = \"Sem1\">Sem1</option><option value = \"Sem2\">Sem2</option></select></div>";
        html += "</div>";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-offset-3 col-md-8 col-xs-12\"><textarea class=\"form-control\" placeholder = \"新的评价\" id = \"textareaReview\"></textarea></div>";
        html += "</div>";

        html += "</div>";
        html += "<div class=\"modal-footer\">";
        html += "<button class = \"btn btn-primary\" id = \"btnReviewPost\" data-dismiss = \"mdoal\">发布</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        return html;
}

function displaySingleCourseInfo(category, retReview, retCourse){
        var html = "";
        html += gadgetCourse(retCourse, category, courseCode);
        //Wiki
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-offset-5 col-md-2 col-xs-12\"><h3 style = \"text-align: center\">课程基本信息</h3></div>";
        html += "<div class = \"col-md-offset-3 col-md-2 col-xs-12\" style = \"text-align: center\"><button type = \"button\" class = \"btn btn-primary\" data-toggle = \"modal\" data-target = \"#modalWiki\">修改</button></div>";
        html += "</div>";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-12\" style = \"text-align: center\"><h4><span class = \"glyphicon glyphicon-link\"></span><a href = \"http://commoncore.hku.hk/" + retCourse.courseCode + "\" target = \"_blank\">课程主页链接请点击这里</a></h4></div>";
        html += "<div class = \"col-md-12\" style = \"text-align: center\"><h6>*如果主页链接无效，则说明本学年不提供此课程</h6></div>";
        html += "</div>";
        html += "<div class=\"row\"><div class = \"col-md-12\" style = \"text-align: center\">";
        html += "<span class = \"badge\" style = \"background-color: #337ab7\">sem " + retCourse.sem + "</span>&nbsp&nbsp&nbsp&nbsp";
        html += "<span class = \"badge\" style = \"background-color: #337ab7\">presentation " + retCourse.presen + "</span>&nbsp&nbsp&nbsp";
        html += "<span class = \"badge\" style = \"background-color: #337ab7\">essay " + retCourse.essay + "</span>&nbsp&nbsp&nbsp&nbsp";
        html += "<span class = \"badge\" style = \"background-color: #337ab7\">group project " + retCourse.group + "</span>";
        html += "</div></div>";
        html += "<div class = \"row\"><div class = \"col-xs-12\"><hr></div></div>";
        //发布新评论
        html += "<div class = \"row\" style = \"margin-bottom:10px\">";
        html += "<div class = \"col-md-offset-5 col-md-2 col-xs-12\"><h3 style = \"text-align: center\">评价区</h3></div>";
        html += "<div class = \"col-md-offset-3 col-md-2 col-xs-12\" style = \"text-align: center\"><button type = \"button\" class = \"btn btn-primary\" data-toggle = \"modal\" data-target = \"#modalReview\">发布新评价</button></div>";
        html += "</div>";
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        return html;
}

function displaySingleCourseReview(retReview, retCourse){
        var semName = Array("Sem1", "Sem2", "Summer Semester");
        var html = "";
        var width = screen.width;
        //intro
        if(width > 800){
                html += "<div class = \"row\">";
                html += "<div class = \"col-md-offset-1 col-md-2\"><label class = \"control-label\" style= \"font-size: 15px\">上课时间</label></div>";
                html += "<div class = \"col-md-9\"><label class = \"control-label\" style= \"font-size: 15px\"> 详细评价</label></div>";
                html += "</div>";
                html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        }
        //review
        if(retReview){
                //                retReview.sort(function f(a, b){return b.likeNumber - a.likeNumber});
                retReview.sort(function f(a, b){return a.id - b.id});
                var floor = 0;
                for(var i = 0; i < retReview.length; i ++){
                        if(retReview[i].root != "" && retReview[i].root != null)
                                continue;
                        floor ++;
                        html += "<div class = \"row\">";
                        html += "<div class = \"col-md-1 col-xs-3\">";
                        html += "<a name = \"aLikeReview\" id = \"aLikeReview" + retReview[i].id + "\"><label class = \"control-label\" style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-thumbs-up\"></span>&nbsp" + retReview[i].likeNumber + "</label></a>&nbsp&nbsp";
                        html += "</div>";
                        html += "<div class = \"col-md-2 col-xs-9\">";
                        if(width > 800){
                                html += "<div class = \"row\"><div id = \"divYear" + retReview[i].id + "\" class = \"col-md-12\"><label id = \"labelYear" + retReview[i].id + "\" class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\">" + retReview[i].year + "</span></div></div>";
                                html += "<div class = \"row\"><div id = \"divSem" + retReview[i].id + "\" class = \"col-md-12\"><label id = \"labelSem" + retReview[i].id + "\" class = \"control-label\" style = \"font-size: 15px\"><span class = \"text\">" + retReview[i].sem + "</span></label></div></div>";
                        }
                        else{
                                html += "<div class = \"row\"><div id = \"divYear" + retReview[i].id + "\" class = \"col-xs-7\"><label id = \"labelYear" + retReview[i].id + "\" class = \"control-label\" style= \"font-size: 15px\"><span class = \"text\">" + retReview[i].year + "</span></div><div id = \"divSem" + retReview[i].id + "\" class = \"col-xs-4\"><label id = \"labelSem" + retReview[i].id + "\" class = \"control-label\" style = \"font-size: 15px\"><span class = \"text\">" + retReview[i].sem + "</span></label></div></div>";
                        }
                        html += "</div>";
                        html += "<div id = \"divReview" + retReview[i].id + "\" class = \"col-md-8 col-xs-12\">";
                        html += "<div class = \"row\"><div class = \"col-md-11 col-xs-12\"><label id = \"labelReview" + retReview[i].id + "\" class = \"control-label\">" + retReview[i].review + "</label></div>";
                        if(ses != "" && noModify < 4){
                                html += "<div class = \"col-md-1 col-xs-offset-8 col-xs-4\"><a name = \"aEdit\" id = \"aEdit" + retReview[i].id + "\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>&nbsp;&nbsp;<a name = \"aDelete\" id = \"aDelete" + retReview[i].id + "\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></a></div>";
                        }
                        html += "</div>";
                        html += "<div class = \"row\"><div class = \"col-md-offset-8 col-md-4 col-xs-offset-4 col-xs-8\">" + floor + "楼&nbsp|&nbsp" + retReview[i].timePost + "&nbsp|&nbsp<a id = \"aSubsetPublish" + retReview[i].id + "\" name = \"aSubsetPublish\">回复</a></div></div>";
                        html += "<div id = \"divSubsetPublish" + retReview[i].id + "\" class = \"row\" style = \"display: none; background-color: #F5FFFA; padding: 5px\"><div class = \"col-md-offset-1 col-md-9 col-xs-12\"><input id = \"inputSubset" + retReview[i].id + "\" type = \"text\" class = \"form-control\"></div><div class = \"col-md-2 col-xs-offset-8 col-xs-4\"><button id = \"btnSubset" + retReview[i].id + "\" name = \"btnSubset\" type = \"button\" class = \"btn btn-default\" style = \"margin-top: 5px\">发布</button></div></div>";
                        //                        html += "<div id = \"divSubsetDisplay" + retReview[i].id + "\"  name = \"divSubsetDisplay\" class = \"row\" style = \"background-color: #F5FFFA; padding: 8px\"></div>";
                        html += "<div id = \"divSubsetDisplay" + retReview[i].id + "\"  name = \"divSubsetDisplay\" class = \"row\" style = \"padding: 8px; margin: 10px\"></div>";
                        html += "</div></div>";
                        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
                }
        }
        else{
                html += "<div class = \"row\"><div class = \"col-md-12\" style = \"text-align: center\">上这门课的同学都很懒，什么都没有留下。快来抢沙发吧！</div></div>";
        }
        return html;
}

