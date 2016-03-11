<?php

class Goods extends DB_Connect 
{


        public function __construct()
        {
                parent::__construct();
        }
        public function Add_Goods($category, $name, $code, $author, $publisher, $edition, $ori_price, $cur_price, $description, $pic, $status, $uid)
        {
                $sql = "insert into $category (name, code, author, publisher, edition, ori_price, cur_price, description, pic, status, uid) values ('$name', '$code', '$author', '$publisher', '$edition', '$ori_price', '$cur_price', '$description', '$pic', '$status', '$uid')";
                mysql_query($sql, $this->root_conn) or trigger_error(mysql_error(),E_USER_ERROR);
        }
}

?>

