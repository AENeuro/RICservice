$(document).ready(function(){
        var boolCheck = new Array();
        for(var i = 0; i < 100; i ++){
                boolCheck[i] = false;
        }
        var imgSrc, imgType;
        var img;
        function checkEmpty(idInput, idLabel, idArray, info){
                if($(idInput).val()){
                        boolCheck[idArray] = true;
                        $(idLabel).text('');
                }
                else{
                        boolCheck[idArray] = false;
                        $(idLabel).text(info);
                }
        }
        function checkValid(len){
                for(var i = 0; i < len; i ++){
                        if(boolCheck[i] == false){
                                return false;
                        }
                }
                return true;
        }

        $('#inputBookTitle').blur(function(){
                checkEmpty('#inputBookTitle', '#labelBookTitleError', 0, '请输入书籍名称');
        });
        $('#inputCourseCode').blur(function(){
                checkEmpty('#inputCourseCode', '#labelCourseCodeError', 1, '请输入课程代码');
        });
        $('#inputOriginalPrice').blur(function(){
                checkEmpty('#inputOriginalPrice', '#labelOriginalPriceError', 2, '请输入原价');
        });
        $('#inputCurrentPrice').blur(function(){
                checkEmpty('#inputCurrentPrice', '#labelCurrentPriceError', 3, '请输入现价');
        });
        $('#inputPublisher').blur(function(){
                checkEmpty('#inputPublisher', '#labelPublisherError', 4, '请输入出版社');
        });
        $('#inputEdition').blur(function(){
                checkEmpty('#inputEdition', '#labelEditionError', 5, '请输入版本');
        });
        $('#inputAuthor').blur(function(){
                checkEmpty('#inputAuthor', '#labelAuthorError', 6, '请输入作者');
        });
        $('#inputDescription').blur(function(){
                checkEmpty('#inputDescription', '#labelDescriptionError', 7, '请输入描述');
        });
        $('#uploadCover').change(function(){
                var docObj = document.getElementById("uploadCover");
                var imgObj = document.getElementById("imgCover");
                if(docObj.files && docObj.files[0]){
                        imgObj.src = window.URL.createObjectURL(docObj.files[0]);
                        img = docObj.files[0];
                        imgSrc = imgObj.src;
                        imgType = docObj.files[0].type;
                        boolCheck[8] = true;
                }
                else{
                        boolCheck[8] = false;
                }
        });
        $('#selectFaculty').blur(function(){
                if($('#selectFaculty').val() == "none"){
                        boolCheck[9] = false;
                        $('#labelFacultyError').text('请选择专业');
                }
                else{
                        boolCheck[9] = true;
                        $('#labelFacultyError').text('');
                }
        });
        $('#btnPublishBook').click(function(){
                var ret = checkValid(10);
                if(ret == false){
                        alert("请输入正确信息");
                }
                else{
                        var bookTitle = $('#inputBookTitle').val();
                        var courseCode = $('#inputCourseCode').val();
                        var originalPrice = $('#inputOriginalPrice').val();
                        var currentPrice = $('#inputCurrentPrice').val();
                        var publisher = $('#inputPublisher').val();
                        var edition = $('#inputEdition').val();
                        var author = $('#inputAuthor').val();
                        var description = $('#inputDescription').val();
                        var category = $('#selectFaculty').val();
                        queryBooks("publishBook", Array(img, bookTitle, courseCode, category, originalPrice, currentPrice, publisher, edition, author, description));
                }
        });
});

