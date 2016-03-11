<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

//flag: publishBook step 1
if(isset($_FILES['img'])){
        $picAddress = saveAndGetPicAddress($_FILES['img']['tmp_name'], $_FILES['img']['type']);
        echo packJson(array(0=>"picAddress"), array(0=>$picAddress));
}

if(isset($_POST["flag"])){
        $flag = $_POST["flag"];
        //flag: publishBook step 2
        if($flag == "publishBook"){
                $book = new Book();
                $bookTitle = $_POST["bookTitle"];
                $courseCode = $_POST["courseCode"];
                $category = $_POST["category"];
                $originalPrice = $_POST["originalPrice"];
                $currentPrice = $_POST["currentPrice"];
                $publisher = $_POST["publisher"];
                $edition = $_POST["edition"];
                $author = $_POST["author"];
                $description = $_POST["description"];
                $status = $_POST["stat"];
                $picAddress = $_POST["picAddress"];
                $owner = $_SESSION["id"];

                $book->newBook($category, $bookTitle, $courseCode, $author, $publisher, $edition, $originalPrice, $currentPrice, $description, $picAddress, $status, $owner);
        }

        if($flag == "userTrading" || $flag == "userOnShelf" || $flag == "userDone"){
                if(loggedIn())
                {
                        $request = substr($flag, 4);
                        $book = new Book();
                        $statusInfo = $book->getStatusInfo($_SESSION['id'], $request);

                        echo packJson(array('statusInfo'), array($statusInfo));
                }
                else{
                        echo "false";
                }
        }

        if($flag == "buyBook"){
                $book = new Book();
                $category = $_POST["category"];
                $id = $_POST["id"];
                $buyer = $_SESSION["id"];
                $ret = $book -> queryMysql("SELECT ", " `owner` ", $category, " `id`  = $id ");
                $owner = $ret[0]["owner"];
                if($buyer == $owner)
                        echo false;
                else
                {
                        echo $book -> queryMysql("UPDATE ", " `status` = 'Trading' ", $category, " `id` = $id");
                        $book -> queryMysql("UPDATE ", " `buyer` =  '$buyer' ", $category, " `id` = $id");
                        echo $owner;
                }
        }

        if($flag == "amount"){
                $book = new Book();
                echo $book->queryAmount($_POST['category']);
        }

        if($flag == "brief" || $flag == "detail"){
                $book = new Book();
                $cat = $_POST["category"];
                if($flag == "detail"){
                        $id = $_POST["id"];
                        $ret = $book -> queryMysql("SELECT ", "*", $cat, " `id` = $id");
                        $key = array(0=>"picAddress", 1=>"bookTitle", 2=>"originalPrice", 3=>"currentPrice", 4=>"publisher", 5=>"edition", 6=>"description", 7=>"author", 8=>"owner", 9=>"id");
                        $value = array(0=>$ret[0]["picAddress"], 1=>$ret[0]["bookTitle"], 2=>$ret[0]["originalPrice"], 3=>$ret[0]["currentPrice"], 4=>$ret[0]["publisher"], 5=>$ret[0]["edition"], 6=>$ret[0]["description"], 7=>$ret[0]["author"], 8=>$ret[0]["owner"], 9=>$ret[0]["id"]);
                        echo packJson($key, $value);
                }
                else{
                        $picAddress = array();
                        $bookTitle = array();
                        $originalPrice = array();
                        $currentPrice = array();
                        $id = array();
                        $category = array();
                        for($i = 0; $i < 13; $i ++){
                                if($cat == "allCategories" or $cat == $book->allCategories[$i]){
	$category = array_merge($category, $book -> queryMysql("SELECT ", "saveCategory", $book->allCategories[$i], " `status` = 'onShelf' "));
	$picAddress = array_merge($picAddress, $book -> queryMysql("SELECT ", "picAddress", $book->allCategories[$i], " `status` = 'onShelf' "));
	$bookTitle = array_merge($bookTitle, $book -> queryMysql("SELECT ", "bookTitle", $book->allCategories[$i], " `status` = 'onShelf' "));
	$originalPrice = array_merge($originalPrice, $book -> queryMysql("SELECT ", "originalPrice", $book->allCategories[$i], " `status` = 'onShelf' "));
	$currentPrice = array_merge($currentPrice, $book -> queryMysql("SELECT ", "currentPrice", $book->allCategories[$i], " `status` = 'onShelf' "));
	$id = array_merge($id, $book -> queryMysql("SELECT ", "id", $book->allCategories[$i], " `status` = 'onShelf' "));
                                }
                        }
                        $key = array(0=>'picAddress',1=>'bookTitle', 2=>'currentPrice', 3=>'originalPrice', 4=>'id', 5 => 'category');
                        $value = array(0=>$picAddress, 1=>$bookTitle, 2=>$currentPrice, 3=>$originalPrice, 4=>$id, 5 => $category);
                        echo packJson($key, $value);
                }
        }
        if($flag == "changeStatus"){
                $stat = $_POST["stat"];
                $cat = $_POST["category"];
                $id = $_POST["id"];
                $book = new Book();
                echo $book->queryMysql("UPDATE ", " `status` = '$stat' ", $cat, " `id` = $id ");
        }
        if($flag == "getContact"){
                $cat = $_POST["category"];
                $id = $_POST["id"];
                $book = new Book();
                $ret = $book -> queryMysql("SELECT ", "*", $cat, " `id` = $id");
                if($ret[0]["buyer"] == $_SESSION["id"] || $ret[0]["owner"] == $_SESSION["id"]){
                        echo $ret[0]["owner"];
                }
                echo false;
        }
}

session_write_close();
?>

