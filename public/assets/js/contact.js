function displayContact(){
        if(ses == ""){
                alert("请先登录");
                window.location = "index.php";
        }
        var html = "";
        var category = app[0];
        if(category == "wantRoommate"){
                var id = app[1];
                var ret = queryHousing("detail", id);
                ret = eval("(" + ret + ")").detail[0];
                var ownerId = ret.ownerId;
                console.log(ownerId);
                var ret = queryUser("contact", ownerId);
                console.log(ret);
                ret = eval("(" + ret + ")").contact[0].contact;
                html += "<h1 style = \"margin-top: 70px; color: #ffffff\">";
                html += ret;
                html += "</h1>";

//                queryUser("markHousing", id);
        return html;
        }
}

$(document).ready(function(){
        console.log("contact");
        $('#divContact')[0].innerHTML = displayContact();
});

