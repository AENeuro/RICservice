<?php
    $picname = $_FILES["pic"]['name']; 
    $picsize = $_FILES["pic"]['size'];
    $flag = false;
    if ($picname != "") { 
        if ($picsize > 512000) { //限制上传大小 
            echo '图片大小不能超过500k'; 
            exit; 
        } 
        $type = strstr($picname, '.'); //限制上传格式 
        if ($type != ".gif" && $type != ".jpg" && $type != '.JPG') { 
            echo '图片格式不对！'; 
            exit; 
        } 
        $rand = rand(100, 999); 
        $pics = date("YmdHis") . $rand . $type; //命名图片名称 
        //上传路径 
        $pic_path = "../../uploadPic/". $pics; 

        $flag = move_uploaded_file($_FILES["pic"]["tmp_name"], $pic_path); 
    } 
    $size = round($picsize/1024,2); //转换成kb 
    $arr = array( 
        'name'=>$picname, 
        'pic'=>$pics, 
        'size'=>$size,
        'tmp'=>$_FILES["pic"]['tmp_name'],
        'pic_path'=>$pic_path,
        'flag'=>$flag
    ); 
    echo json_encode($arr); //输出json数据 
?>

