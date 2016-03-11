function gadgetShare(){
        var html = "";
        html += "<div class = \"form-group\"><div class = \"col-md-12\">";
        html += "<div class=\"bdsharebuttonbox\"><a href=\"#\" class=\"bds_more\" data-cmd=\"more\"></a><a href=\"#\" class=\"bds_weixin\" data-cmd=\"weixin\" title=\"分享到微信\"></a><a href=\"#\" class=\"bds_qzone\" data-cmd=\"qzone\" title=\"分享到QQ空间\"></a><a href=\"#\" class=\"bds_sqq\" data-cmd=\"sqq\" title=\"分享到QQ好友\"></a><a href=\"#\" class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\"></a><a href=\"#\" class=\"bds_fbook\" data-cmd=\"fbook\" title=\"分享到Facebook\"></a></div>";
        html += "</div></div>";
        return html;
}
function gadgetCourse(retCourse, category){
        var html = "";
        html += "<div class = \"row\" style = \"font-size:15px\">";
        html += "<div class = \"col-md-1 col-xs-6\">";
        html += "<a name = \"divLikeCourse\" id = \"category=" + category + "&courseCode=" + retCourse.courseCode + "\"><label id = \"labelcategory=" + category + "&courseCode=" + retCourse.courseCode + "\" class = \"control-label\" style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-thumbs-up\"></span>&nbsp" + retCourse.likeNumber + "</label></a>&nbsp&nbsp";
        html += "<a><label class = \"control-label\" style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-comment\"></span>&nbsp" + retCourse.numberComment + "</label></a>";
        html += "</div>";
        html += "<div class = \"col-md-1 col-xs-6\"><label class = \"control-label\" id = \"coursecode\" style = \"color: #00a885; font-size: 15px\">" + retCourse.courseCode + "</label></div>";
        html += "<div class = \"col-md-8 col-xs-12\"><a href = \"course.php?category=" + category + "&courseCode=" + retCourse.courseCode + "\" target = \"_blank\"><label class = \"control-label\"  style = \"font-size: 15px\" target = \"_blank\">" + retCourse.courseName + "</label></a></div>";
        html += "</div>";
        html += "<div class = \"row\"><div class = \"col-md-12\"><hr></div></div>";
        return html;
}

function addCourseSubset(courseCode){
        var aObj = document.getElementsByName("aSubsetPublish");
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener('click', function(){
                        var id = this.id;
                        id = id.split("aSubsetPublish")[1];
                        $('#divSubsetPublish' + id).show();
                });
        }

        aObj = document.getElementsByName("btnSubset");
        l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener('click', function(){
                        var id = this.id;
                        id = id.split("btnSubset")[1];
                        var review = $('#inputSubset' + id)[0].value;
                        window.location.reload();
                        queryCourses("addSubset", Array(id, review, courseCode));
                });
        }
}

function addCourseDislike(){
        var aObj = document.getElementsByName("divDislikeCourse");
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener('click', function(){
                        console.log(this.name);
                        if(this.name != "divDislikeCourse"){
                                return ;
                        }
                        var id = this.id;
                        var likeNumber = document.getElementById('label' + id).innerText.split(/\s+/)[1];
                        likeNumber = parseInt(likeNumber) - 1;
                document.getElementById(id).innerHTML = "<label id = \"label" + id + "\" class = \"control-label\" style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-thumbs-up\"></span>&nbsp" + likeNumber  + "</label>";
                document.getElementById(id).name = "divLikeCourse";
                console.log(document.getElementById(id));
                        id = id.split("&");
                        var courseCode = id[1].split("=")[1];
                        queryCourses("dislikeCourse", courseCode);
                });
        }
}

function eventListenerCourseLike(){
                        console.log(this.name);
                        if(this.name != "divLikeCourse"){
                                return ;
                        }
                        var id = this.id;
                        var likeNumber = document.getElementById('label' + id).innerText.split(/\s+/)[1];
                        likeNumber = parseInt(likeNumber) + 1;
                document.getElementById(id).innerHTML = "<label id = \"label" + id + "\" class = \"control-label\" style = \"font-size: 15px\"><span class = \"glyphicon glyphicon-thumbs-down\"></span>&nbsp" + likeNumber  + "</label>";
                document.getElementById(id).name = "divDislikeCourse";
                addCourseDislike();
                        id = id.split("&");
                        var courseCode = id[1].split("=")[1];
                        queryCourses("likeCourse", courseCode);
}

function addCourseLike(){
        var aObj = document.getElementsByName("divLikeCourse");
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener('click', eventListenerCourseLike);
        }
}

function markCourse(){
        var aObj = document.getElementsByName("divMarkCourse");
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener('click', function(){
                        var id = this.id;
                        id = id.split("&");
                        var category = id[0].split("=")[1];
                        var courseCode = id[1].split("=")[1];
                        if(this.innerHTML.indexOf("empty") != -1)
                        queryUser("markCourse", Array(category, courseCode));
                        else
                        queryUser("unmarkCourse", Array(category, courseCode));
                });
        }
}

function createModalPic(){
        var html = "";
        html += "<div class=\"modal-dialog\" id = \"divModalPic\">";
        html += "<div class=\"modal-content\">";
        html += "<div class=\"modal-header\">";
        html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>";
        html += "</div>";
        html += "<div class=\"modal-body\" id = \"divBodyPic\">";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        return html;
}
function showPic(imgSrc, l){
        var html = "";
        html += "<div id = \"carouselHousing\" class=\"carousel slide\" data-ride=\"carousel\">";
        html += "<ol class=\"carousel-indicators\">";
        html += "<li data-target=\"#carouselHousing\" data-slide-to=\"0\" class=\"active\"></li>";
        if(l == 0){
                imgSrc[l ++] = "http://ricservice-housing.stor.sinaapp.com/noPic.jpg";
        }
        for(var i = 1; i < l; i ++){
                html += "<li data-target=\"#carouselHousing\" data-slide-to=\"" + i + "\"></li>";
        }
        html += "</ol>";
        html += "<div class=\"carousel-inner\" role=\"listbox\" height>";

        html += "<div class=\"item active\"><img name = \"imgPic\" style=\"height:310px; margin: auto\" src=\"" + imgSrc[0] + "\">";
        html += "<div class=\"carousel-caption\"></div>";
        html += "</div>";

        for(var i = 1; i < l; i ++){
                html += "<div class=\"item\">";
                html += "<img name = \"imgPic\" style=\"height:310px; margin: auto\" src=\"" + imgSrc[i] + "\">";
                html += "<div class=\"carousel-caption\">";
                html += "</div>";
                html += "</div>";
        }

        html += "</div>";

        html += "<a class=\"left carousel-control\" href=\"#carouselHousing\" role=\"button\" data-slide=\"prev\">";
        html += "<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>";
        html += "<span class=\"sr-only\">Previous</span>";
        html += "</a>";

        html += "<a class=\"right carousel-control\" href=\"#carouselHousing\" role=\"button\" data-slide=\"next\">";
        html += "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>";
        html += "<span class=\"sr-only\">Next</span>";
        html += "</a>";
        html += "</div>";
        return html;
}

//loading
function removecloud() { 
        $(".divLoading").remove();
} 
function subSomething() { 
        if (document.readyState == "complete"){
                removecloud(); 
                displayWantRoommateDetailShowPic();
        }
} 
function addcloud() { 
        var bodyWidth = screen.width; 
        var bodyHeight = screen.height; 
        var bgObj = document.createElement("div" ); 
        bgObj.setAttribute('class', 'divLoading'); 
        bgObj.style.position = "absolute"; 
        bgObj.style.top = "0"; 
        bgObj.style.background = "#ffffff"; 
        bgObj.style.opacity = "1"; 
        bgObj.style.left = "0"; 
        bgObj.style.width = bodyWidth + "px"; 
        bgObj.style.height = bodyHeight + "px"; 
        bgObj.style.zIndex = "10000"; 
        bgObj.innerHTML = "正在加载<br><br>-----也喜欢你的RIC";
        document.body.appendChild(bgObj);
} 

function initialize() { 
        addcloud(); 
        document.onreadystatechange = subSomething; 
} 

initialize();
