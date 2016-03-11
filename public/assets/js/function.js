function myAjaxSyn(data, url){
        var ret;
        $.ajax({
                async: false,
                type: 'POST',
                data: data,
                url: url,
                contentType: false,
                processData: false,
                success: function(data){
                        ret = data;
                }
        });
        return ret;
}

function myAjaxAsyn(data, url){
        var ret;
        $.ajax({
                async: true,
                type: 'POST',
                data: data,
                url: url,
                contentType: false,
                processData: false,
                success: function(data){
                        ret = data;
                }
        });
        return ret;
}

function queryWx(flag){
        var data = new FormData();
        var url = 'handle/manipulateWx.php';
        data.append('flag', flag);
        if(flag == "getSignPackage"){
                return myAjaxSyn(data, url);
        }
}

function queryHousing(flag, info){ 
        var data = new FormData();
        var url = 'handle/housing.php';
        data.append('flag', flag);
        //flag: publish
        if(flag == "publish"){
                var picAddress;
                //Step1: upload image
                var dataPic = new FormData();
                var l = info[7].files.length;
                dataPic.append('imgLength', l);
                for(var i = 0; i < l; i ++){
                        var key = "img" + i;
                        dataPic.append(key, info[7].files[i]);
                }
                var ret = myAjaxSyn(dataPic, url);
                ret = eval("(" + ret + ")");
                picAddress = ret.picAddress;
                //step 2
                data.append('timeMoveIn', info[0]);
                data.append('timeMoveOut', info[8]);
                data.append('place', info[1]);
                data.append('gender', info[2]);
                data.append('price', info[3]);
                data.append('nameBuilding', info[4]);
                data.append('residentInfo', info[5]);
                data.append('description', info[6]);
                data.append('picAddress', picAddress);
                data.append('agreeSharing', info[9]);
                myAjaxAsyn(data, url);
        }
        if(flag == "insertWantUser"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }
        if(flag == "detail"){
                data.append('id', info);
                return myAjaxSyn(data, url);
        }
        if(flag == "delete"){
                var picAddress = queryHousing("detail", info);
                picAddress = eval("(" + picAddress + ")").detail.picAddress.split(";");
                data.append('l', picAddress.length - 1);
                for(var i = 0; i < picAddress.length - 1; i ++){
                        var key = "ad" + i;
                        picAddress[i] = picAddress[i].split("/")[3];
                        data.append(key, picAddress[i]);
                }
                data.append('id', info);
                return myAjaxAsyn(data, url);
        }
        if(flag == "myPublish" || flag == "wantRoommateInfo" || flag == "wantRoommateBrief"){
                return myAjaxSyn(data, url);
        }
        if(flag == "insertWantUser")
                return myAjaxAsyn(data, url);
}

function queryWarehouse(flag, info){
        var url = 'handle/warehouse.php';
        var data = new FormData();
        data.append('flag', flag);
        if(flag == "publish"){
                data.append('quota', info[0]);
                data.append('timeStart', info[1]);
                data.append('timeEnd', info[2]);
                data.append('place', info[3]);
                data.append('type', info[4]);
                data.append('methodDelivering', info[5]);
                data.append('price', info[6]);
                data.append('extra', info[7]);
                data.append('agreeSharing', info[8]);
                myAjaxAsyn(data, url);
        }

        if(flag == "detail"){
                data.append('id', info);
                return myAjaxSyn(data, url);
        }

        if(flag == "wantWarehouseBrief"){
                return myAjaxSyn(data, url);
        }

        if(flag == "decreaseQuota"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }

        if(flag == "updateWantUsers" || flag == "ifRegistered" || flag == "insertWantUsers" || flag == "delete" || flag == "published"){
                data.append('id', info);
                return myAjaxSyn(data, url);
        }
}

function queryServer(flag, info){
        var url = 'handle/server.php';
        var data = new FormData();
        data.append('flag', flag);
        if(flag == "setAccessToken"){
                data.append('accessToken', info);
                myAjaxSyn(data, url);
        }
        if(flag == "setTicket"){
                data.append('ticket', info[0]);
                data.append('timestamp', info[1]);
                data.append('ticketExpireTime', info[2]);
                myAjaxSyn(data, url);
        }
        if(flag == "createSignature"){
                data.append('nonceStr', info[0]);
                data.append('url', info[1]);
                myAjaxSyn(data, url);
        }
        if(flag == "getSession" || flag == "getWeiXinSession" || flag == "destroySession" || flag == "checkAccessToken" || flag == "checkTicket" || flag == "initWeiXin"){
        return myAjaxSyn(data, url);
        }
}

function queryBetaComment(flag, info){
        var url = 'handle/betaComment.php';
        var data = new FormData();
        data.append('flag', flag);
        if(flag == "delete"){
                data.append('id', info);
                myAjaxSyn(data, url);
                window.location.reload();
        }
        if(flag == "showComment"){
                data.append('page', info);
                return myAjaxSyn(data, url);
        }
        if(flag == "post"){
                data.append('page', info[0]);
                data.append('comment', info[1]);
                data.append('stat', info[2]);
                myAjaxSyn(data, url);
                window.location.reload();
        }
        if(flag == "showLogs")
                return myAjaxSyn(data, url);
        if(flag == "approve"){
                data.append('id', info);
                myAjaxSyn(data, url);
                window.location.reload();
        }
}

function queryUser(flag, info){
        var url = 'handle/user.php';
        var data = new FormData();
        data.append('flag', flag);

        if(flag == "updateLikeReview"){
                data.append('likeReview', info);
                data.append('pwd', ses);
                myAjaxSyn(data, url);
        }
        if(flag == "updateModify"){
                data.append('pwd', ses);
                myAjaxSyn(data, url);
        }

        if(flag == "insertWantHousing"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }

        if(flag == "insertWantWarehouses"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }
        if(flag == "updateWantWarehouses"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }
        
        if(flag == "markBook"){
                data.append('category', info[0]);
                data.append('bookId', info[1]);
                myAjaxAsyn(data, url);
        }
        if(flag == "markCourse" || flag == "unmarkCourse"){
                data.append('category', info[0]);
                data.append('courseCode', info[1]);
                myAjaxAsyn(data, url);
                window.location.reload();
        }
        if(flag == "markHousing"){
                data.append('id', info);
                myAjaxAsyn(data, url);
        }
        if(flag == "buyBook"){
                data.append('category', info[0]);
                data.append('id', info[1]);
                var ret = myAjaxSyn(data, url);
                var newData = new FormData();
                newData.append('flag', flag);
                newData.append('category', info[0]);
                newData.append('id', info[1]);
                newData.append('owner', ret);
                if(ret != false){
                        ret = myAjaxSyn(newData, url);
                }
                return ret;
        }

        if(flag == "likeBook"){
                data.append('id', info[0]);
                myAjaxAsyn(data, url);
        }
        if(flag == "signUp"){
                data.append('email', info[0]);
                data.append('pwd', info[1]);
                data.append('contact', info[2]);
                data.append('faculty', info[3]);
                data.append('year', info[4]);
                if (myAjaxSyn(data, url) == false){
                        return false;
                }
                else{
                        myAjaxAsyn(data, 'handle/mail.php');
                        window.location.reload();
                        return true;
                }
        }
        if(flag == "signIn"){
                data.append('pwd', info);
                return myAjaxSyn(data, url);
        }
        if (flag == "rstPwd")
        {
          data.append('user', info);
          return myAjaxSyn(data, url);
        }
        if(flag == "trading"){
                return myAjaxSyn(data, url);
        }
        if(flag == "updatePwd" || flag == "updateContact"){
                data.append('updateInfo', info);
                myAjaxAsyn(data, url);
                window.location.reload();
        }
        if(flag == "contact" || flag == "userInfo"){
                if(info)
                data.append('id', info);
                return myAjaxSyn(data, url);
        }
}

function queryBooks(flag, info){	//flag: amount, detail
        var url = 'handle/book.php';
        var data = new FormData();
        data.append('flag', flag);
        if(flag == "detail"){
                data.append('category', info[0]);
                data.append('id', info[1]);
                return myAjaxSyn(data, url);
        }

        if(flag == "getContact"){
                data.append('category', info.category);
                data.append('id', info.bookId);
                var ret = myAjaxSyn(data, url);
                //get contact
                if(ret != false){
                        ret = queryUser("userInfo", ret);
                }
                return ret;
        }

        if(flag == "amount" || flag == "brief"){
                data.append('category', info);
                return myAjaxSyn(data, url);
        }
        if(flag == "publishBook"){
                var picAddress;
                //Step1: upload image
                var picData = new FormData();
                picData.append('img', info[0]);
                var ret = myAjaxSyn(picData, url);
                ret = eval("(" + ret + ")");
                var picAddress = ret.picAddress;
                data.append('bookTitle', info[1]);
                data.append('courseCode', info[2]);
                data.append('category', info[3]);
                data.append('originalPrice', info[4]);
                data.append('currentPrice', info[5]);
                data.append('publisher', info[6]);
                data.append('edition', info[7]);
                data.append('author', info[8]);
                data.append('description', info[9]);
                data.append('picAddress', picAddress);
                data.append('stat', 'onShelf');
                myAjaxAsyn(data, url);
        }
        if(flag == "userOnShelf" || flag == "userTrading" || flag == "userDone"){
                return myAjaxSyn(data, url);
        }
        if(flag == "changeStatus"){
                data.append('category', info[0]);
                data.append('id', info[1]);
                data.append('stat', info[2]);
                myAjaxAsyn(data, url);
        }
}

function queryCourses(flag, info){
        var url = 'handle/course.php';
        var data = new FormData();
        data.append('flag', flag);

        if(flag == "updateCourseBrief"){
                data.append('courseCode', info[0]);
                data.append('brief', info[1]);
                myAjaxSyn(data, url);
        }
        if(flag == "updateLikeReview"){
                data.append('id', info);
                myAjaxSyn(data, url);
        }
        if(flag == "addSubset"){
                data.append('root', info[0]);
                data.append('review', info[1]);
                data.append('courseCode', info[2]);
                myAjaxSyn(data, url);
//                myAjaxAsyn(data, url);
        }
        if(flag == "deleteReview"){
                data.append('id', info[0]);
                data.append('courseCode', info[1]);
                myAjaxSyn(data, url);
        }
        if(flag == "updateReview"){
                data.append('id', info[0]);
                data.append('review', info[1]);
                data.append('year', info[2]);
                data.append('sem', info[3]);
                myAjaxSyn(data, url);
        }
        if(flag == "likeCourse" || flag == "dislikeCourse" || flag == "courseInfo" || flag == "courseReview"){
                data.append('courseCode', info);
                var ret = myAjaxSyn(data, url);
                if(flag == "courseReview" || flag == "courseInfo"){
                        return ret;
                }
        }
        if(flag == "coursesList"){
                data.append('category', info);
                return myAjaxSyn(data, url);
        }

        if(flag == "postNewReview"){
                data.append('courseCode', info[0]);
                data.append('review', info[1]);
                data.append('year', info[2]);
                data.append('sem', info[3]);
                myAjaxSyn(data, url);
//                myAjaxAsyn(data, url);
        }
        if(flag == "createArray"){
                return myAjaxSyn(data, url);
        }
        if(flag == "modifyWiki"){
                data.append('courseCode', info[0]);
                data.append('sem', info[1]);
                data.append('presen', info[2]);
                data.append('essay', info[3]);
                data.append('group', info[4]);
                myAjaxSyn(data, url);
        }
}

function queryProfessor(flag, info){
        var url = 'handle/professor.php';
        var data = new FormData();
        data.append('flag', flag);
        if(flag == "teachCourse"){
                data.append('courseCode', info);
                myAjax(data, url);
                window.location.reload();
        }
        if(flag == "inFaculty"){
                data.append('faculty', info);
                myAjax(data, url);
        }
}

