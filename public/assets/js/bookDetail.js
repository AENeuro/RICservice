var param = [];
function getParameter(){
        var str = window.location.search;
        console.log("getParameter: " + str);
        str = str.substr(1);
        str = str.split("&");
        console.log(str);
        var l = str.length;
        console.log(l);
        for(var i = 0; i < l; i ++){
                var spl = str[i].split("=");
                param[spl[0]] = spl[1];
        }
        console.log(param);
}

function markBook(){
        var aObj = document.getElementsByName("aMarkBook");
        var l = aObj.length;
        for(var i = 0; i < l; i ++){
                aObj[i].addEventListener("click", function(){
                        var obj = this;
                        console.log(obj);
                        var id = obj.id;
                        var bookId = id.split("&")[1].split("=")[1];
                        var category = id.split("&")[0].split("=")[1];
                        console.log("markBook: " + bookId);
                        console.log("markBook: " + category);
                        queryUser("markBook", Array(category, bookId));
                });
        }
}

$(document).ready(function(){
        function setBookInfo(){
                console.log("setBookInfo");
                var category = param.category;
                var ret = queryBooks("detail", param);
                ret = eval("(" + ret + ")");
                var picAddress = ret.picAddress;
                var bookTitle = ret.bookTitle;
                var originalPrice = ret.originalPrice;
                var currentPrice = ret.currentPrice;
                var publisher = ret.publisher;
                var edition = ret.edition;
                var author = ret.author;
                var owner = ret.owner;
                var id = ret.id;
                var description = ret.description;
                document.getElementById("imgCover").src = "../" + picAddress;
                $('#h4BookTitle').text(bookTitle);
                $("#h4OriginalPrice").text(originalPrice);
                $('#h4CurrentPrice').text(currentPrice);
                $('#h4Publisher').text(publisher);
                $('#h4Edition').text(edition);
                $('#h4Author').text(author);
                $('#h4Description').text(description);
        }
        function setBtnMarkAndBuy(){
                var html = "<button role = \"button\" class=\"btn btn-primary\" id = \"btnBuy\" data-toggle = \"modal\" data-target = \"#modalBuy\">我要买！</button>";
                if(ses != ''){
                        html += "<p><a name = \"aMarkBook\" id = \"category=" + param.category + "&bookId=" + param.bookId + "\" class = \"btn btn-default\" role = \"button\">先收藏着</a></p>";
                }
                document.getElementById("divBuyMark").innerHTML = html;
                markBook();
                $('#btnBuy').bind('click', function(){
                        var category = param.category;
                        var bookId = param.bookId;
                        console.log("btnBuy: " + category + bookId);
                        var ret = queryUser("buyBook", Array(category, bookId));
                        if(ret){
                                ret = eval("(" + ret + ")");
                                $('#labelContact').text(ret.contact);
                        }
                        else{
                                $('#labelContact').text("不要买自己的书呀");
                        }
                });
        }
        function displayContact(){
                var category = param.category;
                var bookId = param.bookId;
                var ret = queryBooks("getContact", param);
                ret = eval("(" + ret + ")");
                ret = ret.contact;
                console.log(ret);
                var html = "<label class=\"col-md-3 control-label\"><h4>联系方式</h4></label>";
                html += "<label class=\"col-md-9 control-label\"><h4 id = \"h4Description\">" + ret + "</h4></label>";
                $('#divContact')[0].innerHTML = html;
        }
        console.log("bookDetail");
        console.log("param: " + param);
        getParameter();
        console.log("param: " + param.category);
        console.log("param: " + param.contact);
        if(param.category){
                setBookInfo();
                console.log("after: " + param.contact);
                if(param.contact == "false"){
                setBtnMarkAndBuy();
                }
                else{
                        displayContact();
                }
        }
});

