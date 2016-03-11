function showPic(docObj, l){
        var imgSrc = Array();
        for(var i = 0; i < l; i ++){
                imgSrc[i] = window.URL.createObjectURL(docObj.files[i]);
        }
        var html = "";
        html += "<div id = \"carouselHousing\" class=\"carousel slide\" data-ride=\"carousel\">";
        html += "<ol class=\"carousel-indicators\">";
        html += "<li data-target=\"#carouselHousing\" data-slide-to=\"0\" class=\"active\"></li>";
        for(var i = 1; i < l; i ++){
        html += "<li data-target=\"#carouselHousing\" data-slide-to=\"" + i + "\"></li>";
        }
        html += "</ol>";
        html += "<div class=\"carousel-inner\" role=\"listbox\">";

        html += "<div class=\"item active\"><img src=\"" + imgSrc[0] + "\">";
        html += "<div class=\"carousel-caption\"></div>";
        html += "</div>";

        for(var i = 1; i < l; i ++){
        html += "<div class=\"item\">";
        html += "<img src=\"" + imgSrc[i] + "\">";
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

$(document).ready(function(){
        //timePicker
        $('#inputTimeMoveIn').datepicker({
                'format': 'yyyy-m-d',
        'autoclose': true
        });
        $('#inputTimeMoveOut').datepicker({
                'format': 'yyyy-m-d',
                'autoclose': true
        });
        console.log(ses);
        if(ses == ""){
                alert("请先登录");
                window.location = "index.php?category=index";
        }

        jsUserInfo();
        var checkImg, img;
        function getImg(){
                var docObj = document.getElementById("inputPic");
                img = docObj;
                if(docObj.files){
                var html = "";
                        var l = docObj.files.length;
                        if(l > 20){
                                checkImg = false;
                                alert("图片数量不能超过20张");
                        }
                        else{
                        html += showPic(docObj, l);
                        $('#divShowPic')[0].innerHTML = html;
                        checkImg = true;
                        }
                }
                else{
                        checkImg = false;
                }
        }
        $('#inputPic').blur(function(){
                getImg();
        });

        $('#btnPublishHousing').click(function(){
                // alert(screen.width);
                if(screen.width < 800){
                        getImg();
                }
                var inputPlace = $('#inputPlace').val();
                var inputNameBuilding = $('#inputNameBuilding').val();
                var inputRoomType = $('#inputRoomType').val();
                var inputTimeMoveIn = $('#inputTimeMoveIn').val();
                var inputTimeMoveOut = $('#inputTimeMoveOut').val();
                var inputPrice = $('#inputPrice').val();
                var selectGender = $('#selectGender').val();
                var textareaResidentInfo = $('#textareaResidentInfo').val();
                var inputDescription = $('#inputDescription').val();
                var inputAgreeSharing = $('#inputAgreeSharing')[0].checked;
                if(inputDescription.length > 15){
                        alert("请将标题限于15个字以内！@v@");
                }
                else{
                        if(inputPlace == ""){
                                $('#labelPlaceError').show();
                        }
                        else{
                                $('#labelPlaceError').hide();
                        }
                        if(inputNameBuilding == ""){
                                $('#labelNameBuildingError').show();
                        }
                        else{
                                $('#labelNameBuildingError').hide();
                        }
                        if(inputPrice == ""){
                                $('#labelPriceError').show();
                        }
                        else{
                                $('#labelPriceError').hide();
                        }
                        if(inputRoomType == "none"){
                                $('#labelRoomTypeError').show();
                        }
                        else{
                                $('#labelRoomTypeError').hide();
                        }
                        if(inputTimeMoveIn == ""){
                                $('#labelTimeMoveInError').show();
                        }
                        else{
                                $('#labelTimeMoveInError').hide();
                        }
                        if(inputTimeMoveOut == ""){
                                $('#labelTimeMoveOutError').show();
                        }
                        else{
                                $('#labelTimeMoveOutError').hide();
                        }
                        var checked = checkDate(inputTimeMoveIn, inputTimeMoveOut);
                        if(selectGender == "none"){
                                $('#labelGenderError').show();
                        }
                        else{
                                $('#labelGenderError').hide();
                        }
                        if(!checkImg){
                                $('#labelPictureError').show();
                        }
                        else{
                                $('#labelPictureError').hide();
                        }
                        if(inputPlace != "" && inputNameBuilding != "" && inputRoomType != "none" && inputTimeMoveIn != "" && inputTimeMoveOut != "" && selectGender != "none" && checked && inputPrice != "" && checkImg){
                                // if(confirm("您发布的租房信息可能会被发布至RIC微信公众号中，这样可以吗？")){
                                        queryHousing("publish", Array(inputTimeMoveIn, inputPlace, selectGender, inputPrice, inputNameBuilding, textareaResidentInfo, inputDescription, img, inputTimeMoveOut, inputAgreeSharing));
                                        alert("发布成功！\n感谢您的分享~");
                                        window.location = "housing.php?category=wantRoommate";
                                // }
                                // else{
                                        // console.log("Oh, no");
                                // }
                                
                        }
                        else{
                                alert("你的租房信息不全/有误，请修改后再次提交");
                        }
                }
        });
        
        function jsUserInfo(){
                var ret = retUserInfo;
                console.log(ret);
                var contact = ret.contact;
                var email = ret.email;
                var pwd = ret.pwd;

                var boolCheck = Array();
                for(var i = 0; i < 20; i ++){
                        boolCheck[i] = false;
                }

                //put Email
                // document.getElementById("textareaContact").placeholder = contact;
                $('#h5Email').text(email + "@hku.hk");
                $('#h5Contact').text(contact);
                // $('#h5Year').text(ret.year);
                // $('#h5Faculty').text(ret.faculty);

                // $('#btnSubmitChange').click(function(){
                //         // var inputNewPassword = $('#inputNewPassword').val();
                //         // var inputNewPassword2 = $('#inputNewPassword2').val();
                //         var textareaContact = $('#textareaContact').val();
                //         var cPwd = false, cContact = false;
                //         var flag = true;
                //         if(inputNewPassword != "" || inputNewPassword2 != ""){
                //                 var retCheckPwd = checkPwd(inputNewPassword);
                //                 if(retCheckPwd == "true")
                //                 $('#labelNewPasswordError').text('');
                //                         else{
                //                                 $('#labelNewPasswordError').text(retCheckPwd);
                //                                 flag = false;
                //                         }
                //                 if(inputNewPassword != inputNewPassword2){
                //                         $('#labelNewPassword2Error').text('Oops！和之前输入的密码不相符。再试一次吧？');
                //                         flag = false;
                //                 }
                //                 cPwd = true;
                //         }
                //         if(textareaContact != ""){
                //                 cContact = true;
                //         }
                //         if(!flag){
                //                 alert("请输入信息");
                //         }
                //         else{
                //                 if(cPwd)
                //                         queryUser("updatePwd", inputNewPassword);
                //                 if(cContact)
                //                         queryUser("updateContact", textareaContact);
                //         }
                // });
        }

        function checkDate(timeStart, timeEnd){
                var start = timeStart.split('-');
                var end = timeEnd.split('-');
                var startYear = parseInt(start[0]);
                var endYear = parseInt(end[0]);
                if (startYear > endYear){
                        $('#labelTimeError').show();
                        return false;
                }
                else if (startYear == endYear){
                        var startMonth = parseInt(start[1]);
                        var endMonth = parseInt(end[1]);
                        if (startMonth > endMonth){
                                $('#labelTimeError').show();
                                return false;
                        }
                        else if (startMonth == endMonth){
                                var startDate = parseInt(start[2]);
                                var endDate = parseInt(end[2]);
                                if (startDate >= endDate){
                                        $('#labelTimeError').show();
                                        return false;
                                }
                                else{
                                        $('#labelTimeError').hide();
                                        return true;
                                }
                        }
                        else{
                                $('#labelTimeError').hide();
                                return true;
                        }
                }
                else{
                        $('#labelTimeError').hide();
                        return true;
                }
        }
});

