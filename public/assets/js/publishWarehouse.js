$(document).ready(function(){
        $('#inputTimeStart').datepicker({
                'format': 'yyyy-m-d',
        'autoclose': true
        });
        $('#inputTimeEnd').datepicker({
                'format': 'yyyy-m-d',
                'autoclose': true
        });
        $('#btnPublishWarehouse').click(function(){
                var quota = $('#inputQuota').val();
                var timeStart = $('#inputTimeStart').val();
                var timeEnd = $('#inputTimeEnd').val();
                var type = $('#selectType').val();
                var place = $('#inputPlace').val();
                var methodDelivering = $('#inputMethodDelivering').val();
                var price = $('#inputPrice').val();
                var extra = $('#textareaExtra').val();
                var agreeSharing = $('#inputAgreeSharing').val();
                if(quota == ""){
                        $('#labelQuotaError').show();
                }
                else{
                        $('#labelQuotaError').hide();
                }
                if(timeStart == ""){
                        $('#labelTimeStartError').show();
                }
                else{
                        $('#labelTimeStartError').hide();
                }
                if(timeEnd == ""){
                        $('#labelTimeEndError').show();
                }
                else{
                        $('#labelTimeEndError').hide();
                }
                var checked = checkDate(timeStart, timeEnd);
                if(type == "none"){
                        $('#labelTypeError').show();
                }
                else{
                        $('#labelTypeError').hide();
                }
                if(place == ""){
                        $('#labelAddrError').show();
                }
                else{
                        $('#labelAddrError').hide();
                }
                if(methodDelivering == ""){
                        $('#labelDeliverError').show();
                }
                else{
                        $('#labelDeliverError').hide();
                }
                if(price == ""){
                        $('#labelPriceError').show();
                }
                else{
                        $('#labelPriceError').hide();
                }
                if(quota != "" && timeStart != "" && timeEnd != "" && type != "none" && checked && place != "" && methodDelivering != "" && price != ""){
                        // if(confirm("您发布的储物信息可能会被发布至RIC微信公众号中，这样可以吗？")){
                                queryWarehouse("publish", Array(quota, timeStart, timeEnd, place, type, methodDelivering, price, extra, agreeSharing));
                                alert("发布成功！\n感谢您的分享~");
                                window.location.href = 'index.php';
                        // }
                        // else{
                                // console.log("Oh, no"); //修改：由confirm改为可选的checkbox
                        // }
                }
                else{
                        alert("您的储物信息不全/有误，请修改后再次提交");
                }
        });

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

