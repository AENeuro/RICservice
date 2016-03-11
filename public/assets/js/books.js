var arrayValue = new Array("所有书籍", "Architecture", "Arts", "Business & Economics", "Engineering", "Law", "Medicine", "Science", "Social Science", "Others", "GRE", "GMAT", "TOEFL");
var arrayForMysql = new Array("allCategories", "architecture", "arts", "be", "engineering", "law", "medicine", "science", "ss", "others", "gre", "gmat", "toefl");
var arrayForId = new Array("AllCategories", "Architecture", "Arts", "Be", "Engineering", "Law", "Medicine", "Science", "Ss", "Others", "Gre", "Gmat", "Toefl");
var category;

function getId(preStr, Id){
        var ret = preStr + Id;
        return ret;
}

function getPicAddress(page, picAddress){
        if(page == "books"){
                console.log(picAddress);
                return "../" + picAddress;
        }
}

//show the left nav bar
function showList(){
        var html = "";
        for(var i = 0; i < 13; i ++){
                var ret = queryBooks("amount", arrayForMysql[i]);
                var l = 0;
                if(ret == '')
                        l = 0;
                else
                        l = ret;
                html += "<li role = \"presentation\">";
                var panelId = getId("panel", arrayForId[i]);
                var aId = getId("a", arrayForId[i]);
                html += "<a href = \"#" + panelId + "\" class = \"list-group-item\" role = \"tab\" data-toggle = \"tab\" name = \"aListCategory\"> " + arrayValue[i] + "<span class = \"badge\"> " + l + "</span> </a>";
                html += "</li>";
        }
        document.getElementById("ulListFaculty").innerHTML = html;
}

function findCategory(aObj){
        var href = aObj.href.split("panel")[1];
        console.log(href);
        for(var i = 0; i < 13; i ++){
                if(href == arrayForId[i]){
                        return arrayForMysql[i];
                }
        }
}

function showTabBrief(aObj){
        category = findCategory(aObj);
        console.log("showTabBrief " + category);
        var panelId = aObj.href.split("#")[1];
        var ret = queryBooks("brief", category);
        ret = eval("(" + ret + ")");
        var flag, length;
        var picAddress, bookTitle, currentPrice, originalPrice, id, arrayCategory;
        picAddress = ret.picAddress;
        bookTitle = ret.bookTitle;
        currentPrice = ret.currentPrice;
        originalPrice = ret.originalPrice;
        id = ret.id;
        arrayCategory = ret.category;
        length = id.length;

        var j, html = "";
        for(j = 0; j < length; j ++){
                if(j % 3 == 0){
                        if(j != 0)
                                html += "</div>";
                        html += "<div class = \"row\">";
                }
                var l0 = "<div class = \"col-md-4\" style = \"background-color: white\">";
                var l1 = "<div class = \"col-md-8\"><img width = \"100\" height = \"150\" src = " + picAddress[j][0] + " alt = \"卖家上传的cover\"/></div>";
                var l2 = "<div class = \"col-md-4 thumbnail\" style = \"background: rgba(255,255,255,0.2); border: none\">";
                var l3 = "<p><h3>" + bookTitle[j][0] + "</h3></p>";
                var l4 = "<p><div class = \"control-label\" id = \"displayCurrentPrice\"><h4>$" + currentPrice[j][0] + "</h4></div></p>";
                var l5 = "<p><div class = \"control-label\" id = \"displayOriginalPrice\" style = \"text-decoration: line-through\"><h4>$" + originalPrice[j][0] + "</h4></div></p>";
                var l6 = "<p><a href = \"bookDetail.html?category=" + arrayCategory[j] + "&bookId=" + id[j][0] + "&contact=false\" class = \"btn btn-primary\" role = \"button\" style = \"background-color: #00a885; border: none\">查看详情</a></p>";
                var l7 = "";
                if(ses != ''){
                        l7 = "<p><a name = \"aMarkBook\" id = \"category=" + arrayCategory[j] + "&bookId=" + id[j][0] + "\" class = \"btn btn-default\" role = \"button\">先收藏着</a></p>";
                }
                var l8 = "</div></div>";
                html += l0 + l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8;
        }
        html += "</div>";
        document.getElementById(panelId).innerHTML = html;
        markBook();
}

function addClick(){
        //click list
        var aObj = document.getElementsByName("aListCategory");
        console.log(aObj);
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener("click", function(){
                        showTabBrief(this);
                }, false);
        }
}

function addTabPanel(){
        var html = "";
        for(var i = 0; i < 13; i ++){
                var panelId = getId("panel", arrayForId[i]);
                html += "<div role = \"tabpanel\" class = \"tab-pane fade\" style = \"background-color: white; border-radius: 3px\" id = \"" + panelId + "\">";
                html += "</div>";
        }
        document.getElementById("divTabPanel").innerHTML = html;
}

$(document).ready(function(){
        addTabPanel();
        showList();
        addClick();
});

