var arrayCategory = new Array("CCCH", "CCGL", "CCHU", "CCST");
var lengthCategory;
var category, courseCode;

function getIdEnroll(type, i){
        return type + arrayCategory[i];
}

function displayListCategory(){
        var html = "";
        for(var i = 0; i < lengthCategory; i ++){
                if(arrayCategory[i] == category){
                        html += "<li role = \"presentation\" class = \"active\">";
                }
                else{
                        html += "<li role = \"presentation\">";
                }
                html += "<a class = \"li_a\" href = \"course.php?category=" + arrayCategory[i] + "\">" + arrayCategory[i] + "</a>";
                html += "</li>";
        }
        document.getElementById("ulListCategory").innerHTML = html;
}

function addSortList(ret){
        $('#btnSortLikeNumber').click(function(){
                console.log(ret);
                ret.sort(function sortCourses(a, b){return b.likeNumber - a.likeNumber;});
                document.getElementById("divTabPanel").innerHTML = displayCoursesList(ret, "<br/>");
        });
        $('#btnSortComment').click(function(){
                ret.sort(function sortCourses(a, b){return b.numberComment - a.numberComment;});
                document.getElementById("divTabPanel").innerHTML = displayCoursesList(ret, "<br/>");
        });
        $('#btnSortOriginal').click(function(){
                ret.sort(function sortCourses(a, b){return a.courseCode.localeCompare(b.courseCode);});
                document.getElementById("divTabPanel").innerHTML = displayCoursesList(ret, "<br/>");
        });
}

function displayCoursesList(ret, html){
        var l = ret.length;
        for(var i = 0; i < l; i ++){
                html += gadgetCourse(ret[i], category);
        }
        html += "<div class = \"col-md-12\"><label style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-link\"></span><a href = \"https://docs.google.com/spreadsheet/ccc?key=0Aoar9mnRK7a7dGQ4NGJwTkJRdzkzZU11cFBtOUlJRHc#gid=6\" target = \"_blank\">在选课Google Doc查看其他评价（仅供墙外使用）</a></label></div>";
        return html;
}

function addFilter(ret){
        $('#btnFilterConfirm').click(function(){
                var l = ret.length;
                var retCourse = Array();

                var sem = $('#selectSem').val();
                var presen = $('#selectPresen').val();
                var essay = $('#selectEssay').val();
                var group = $('#selectGroup').val();
                        
                for(var i = 0; i < l; i ++){
                        if(sem != "不限" && ret[i].sem != "both" && sem != ret[i].sem)continue;
                        if(presen != "不限" && presen != ret[i].presen)continue;
                        if(essay != "不限" && essay != ret[i].essay)continue;
                        if(group != "不限" && group != ret[i].group)continue;
                        retCourse.push(ret[i]);
                }
                console.log(retCourse);
                document.getElementById("divTabPanel").innerHTML = displayCoursesList(retCourse, "<br/>");
        });
}

function triggerDivTabPanel(){
        var ret = queryCourses("coursesList", category);
        ret = eval("(" + ret + ")");
        ret = ret.coursesList;
        if(ret)
                ret.sort(function sortCourses(a, b){return a.courseCode.localeCompare(b.courseCode);});
        document.getElementById("divTabPanel").innerHTML = displayCoursesList(ret, "<br/>");

        document.getElementById("modalSort").innerHTML = modalSort();
        addCourseLike(ret);
        addSortList(ret);
        addFilter(ret);
        markCourse();
}

function displayPublishCourseCode(){
        var ret = queryCourses("createArray");
        ret = eval("(" + ret + ")");
        ret = ret.listCourse;
        var l = ret.length;
        var html = "";
        var courseCode = "", courseName = "";
        for(var i = 0; i < l; i ++){
                html += "<option value = \"" + ret[i].courseCode + "\">" + ret[i].courseCode + "</option>";
                courseName += ret[i].courseName + ";";
        }
        $('#selectReviewCode')[0].innerHTML = html;
}

function modalFilter(retCourse){
        var html = "";
        html += "<div class=\"modal-dialog\">";
        html += "<div class=\"modal-content\" style = \"background:white; opacity: 0.9;\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"modalWikiTitle\">筛选条件</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-offset-1 col-md-1 col-xs-5\"><label>sem</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectSem\" class = \"form-control\"><option value = \"不限\">不限</option><option value = \"both\">both</option><option value = \"1\">1</option><option value = \"2\">2</option></select></label></div>";
        html += "<div class = \"col-md-3 col-xs-5\"><label>presentation</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectPresen\" class = \"form-control\"><option value = \"不限\">不限</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "</div>";
        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-md-offset-1 col-md-1 col-xs-5\"><label>essay</label></div><div class = \"\"></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectEssay\" class = \"form-control\"><option value = \"不限\">不限</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "<div class = \"col-md-3 col-xs-5\"><label>group project</label></div>";
        html += "<div class = \"col-md-3 col-xs-7\"><select id = \"selectGroup\" class = \"form-control\"><option value = \"不限\">不限</option><option value = \"yes\">yes</option><option value = \"no\">no</option></select></label></div>";
        html += "</div>";

        html += "</div>";
        html += "<div class=\"modal-footer\">";
        html += "<button class = \"btn btn-primary\" id = \"btnFilterConfirm\" data-dismiss = \"modal\">确定</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function modalSort(){
        var html = "";
        html += "<div class=\"modal-dialog\">";
        html += "<div class=\"modal-content\" style = \"background:white; opacity: 0.9;\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "<h4 class=\"modal-title\" id=\"modalWikiTitle\">排序方式</h4>";
        html += "</div>";
        html += "<div class=\"modal-body\">";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-xs-12\" style = \"text-align: center\"><button class = \"btn btn-primary\" id = \"btnSortLikeNumber\" data-dismiss = \"modal\">按照点赞数量排序</button></div>";
        html += "</div>";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-xs-12\" style = \"text-align: center\"><button class = \"btn btn-primary\" id = \"btnSortComment\" data-dismiss = \"modal\">按照评论数量排序</button></div>";
        html += "</div>";

        html += "<div class = \"row\" style = \"margin-bottom:20px\">";
        html += "<div class = \"col-xs-12\" style = \"text-align: center\"><button class = \"btn btn-primary\" id = \"btnSortOriginal\" data-dismiss = \"modal\">取消排序</button></div>";
        html += "</div>";

        html += "</div>";
        html += "<div class=\"modal-footer\">";
        html += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}

function displaySort(){
        var html = "";
        html += "<div class = \"row\">";
        html += "<div class = \"col-md-3 col-xs-6\"><a data-toggle = \"modal\" href = \"#modalSort\"><span class=\"glyphicon glyphicon-circle-arrow-down\" aria-hidden=\"true\"></span> 排序</a></div>";
        html += "<div class = \"col-md-3 col-xs-6\"><a data-toggle = \"modal\" href = \"#modalFilter\"><span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span> 筛选</a></div>";
        html += "</div>";
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        return html;
}

$(document).ready(function(){
        lengthCategory = arrayCategory.length;
        category = app[0];
        courseCode = app[1];
        if(category){
                displayListCategory();
                if(courseCode){
                        displayCourseReview(category);
                        addClickReviewEdit();
                }
                else{
                        document.getElementById("divSort").innerHTML = displaySort();
                        //filter
                        document.getElementById("modalFilter").innerHTML = modalFilter();
                        //filter end
                        triggerDivTabPanel();
                }
        }
});

