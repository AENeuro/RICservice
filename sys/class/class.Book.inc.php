<?php
class Book 
{
        public $allCategories = array(0=>'architecture', 1=>'arts', 2=>'be', 3=>'engineering', 4=>'gmat', 5=>'gre', 6=>'ielts', 7=>'law', 8=>'medicine', 9=>'others', 10=>'science', 11=>'ss', 12=>'toefl', 13=>'user');

        // construction
        public function __construct()
        {
                parent::__construct();
        }

        public function queryMysql($opt, $id, $table, $where){
                $flag = true;
                if($id == "saveCategory"){
                        $flag = false;
                        $id = "picAddress";
                }
                if($opt == "SELECT "){
                        $sql = $opt. $id. " FROM ". $table ." WHERE ". $where .";";
                        $tmp = $this -> root_conn -> query($sql);
                        $ret = array();
                        if($tmp){
                                while($row = $tmp->fetch_row()){
	if($flag)
	        $ret[] = $row;
	else
	        $ret[] = $table;
                                }
                        }
                        return $ret;
                }
                if($opt == "UPDATE "){
                        //update architecture set `status` = 'Done' where `id` =  
                        $sql = $opt. $table. " SET ". $id. " WHERE ". $where. ";";
                        return $this -> root_conn -> query($sql);
                }
        }

        //询问总书籍数量
        public function queryAmount($category){
                $ret = 0;
                if($category == "allCategories"){
                        for($i = 0; $i < 13; $i ++){
                                $tmp = $this->queryMysql("SELECT ", "*", $this->allCategories[$i], " `status` = 'onShelf'");
                                $ret += count($tmp);
                        }
                }
                else{
                        $tmp = $this->queryMysql("SELECT ", "*", $category, " `status` = 'onShelf'");
                        $ret += count($tmp);
                }
                return $ret;
        }
        // 向数据库中插入一本新书
        public function newBook($category, $bookTitle, $courseCode, $author, $publisher, $edition, $originalPrice, $currentPrice, $description, $picAddress, $status, $owner)
        {
                $sql = "insert into $category (bookTitle, courseCode, author, publisher, edition, originalPrice, currentPrice, description, picAddress, status, owner) values ('$bookTitle', '$courseCode', '$author', '$publisher', '$edition', '$originalPrice', '$currentPrice', '$description', '$picAddress', '$status', '$owner')";
                $this -> root_conn -> query($sql) or trigger_error(mysqli_error(), E_USER_ERROR);
        }

        // query: get information
        // 获取某个用户某个状态的全部书籍信息：在架上/交易中/已交易
        public function getStatusInfo($owner, $request)
        {
                $ret = array();
                for($i=0; $i<14; $i++){
                        $sql = "select * from ".$this->allCategories[$i]." where `owner`='$owner' and `status`='$request';";
                        $result = $this -> root_conn -> query($sql);
                        if($result){
                                while($row=$result->fetch_row()){
	$row["category"] = $this->allCategories[$i];
	$ret[] = $row;
                                }
                        }
                }
                for($i=0; $i<14; $i++){
                        $sql = "select * from ".$this->allCategories[$i]." where `buyer`='$owner' and `status`='$request';";
                        $result = $this -> root_conn -> query($sql);;
                        if($result){
                                while($row=$result->fetch_row()){
	$row["category"] = $this->allCategories[$i];
	$ret[] = $row;
                                }
                        }
                }
                return $ret;

        }
}

?>

