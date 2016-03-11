<?php
class JSSDK{
        private $appId, $appSecret;

        public function __construct(){
                $this->appId = "wxcc03a8589669a8e8";
                $this->appSecret = "6b6a0475308d947a50c0b01840648429";
        }

        public function getSignPackage(){
                $jsapiTicket = $this->getJsApiTicket();

                $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
                $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                $split = explode("&", $_SERVER['REQUEST_URI']);
                $app = array();
                for($i = 0; $i < count($split); $i ++){
                        $app[$i] = explode("=", $split[$i])[1];
                }
                $category = $app[0];
                $desc = "";
                if(isset($app[1])){
                        if($category == "wantRoommate"){
                                $ret = new SaeMysql();
                                $ret = $ret -> getLine("select * from housing where `id`='$app[1]';");
                                $pic = explode(";", $ret["picAddress"])[0];
                                $desc = $ret["place"]." || $".$ret["price"]."/每月 || ".$ret["gender"];
                                $title = $ret["description"];
                        }
                        if($category == "wantWarehouse"){
                                $ret = new SaeMysql();
                                $ret = $ret -> getLine("select * from housing where `id`='$app[1]';");
                                $desc = $ret["place"]."||".$ret["methodDelivering"]."||".$ret["price"];
                        }
                }
                else{
                        if($category == "index")
                                $desc = "Smaller than Smaller-Just for YOU";
                        if($category == "wantRoommate")
                                $desc = "房屋招租";
                        if($category == "wantWarehouse")
                                $desc = "假期储物";
                }
                $timestamp = time();
                $nonceStr = $this->createNonceStr();
                $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
                $signature = sha1($string);
                $signPackage = array(
                        "appId"	=> $this->appId,
                        "nonceStr"	=> $nonceStr,
                        "timestamp"	=> $timestamp,
                        "desc"	=> $desc,
                        "title" => $title,
                        "pic" => $pic,
                        "signature"	=> $signature,
                        "rawString"	=> $string,
                        "url"=> $url
                );
                return $signPackage;
        }

        public function createNonceStr($length = 16){
                $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                $str = "";
                for($i = 0; $i < $length; $i ++){
                        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
                }
                return $str;
        }

        public function getJsApiTicket(){
                $flag = json_decode(file_get_contents("../docs/flag.json"));
                $data;
                if($flag->localOrSae == "local"){
                        $data = json_decode(file_get_contents("../docs/jsapi_ticket.json"));
                }
                else{
                        $data = new SaeStorage();
                        $data = $data->read("weixin", "jsapi_ticket.json");
                        $data = json_decode($data);
                }
                if($data->expire_time < time()){
                        $accessToken = $this->getAccessToken();
                        $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
                        $res = json_decode($this->httpGet($url));
                        $ticket = $res->ticket;
                        $expires_in = $res->expires_in;
                        if($ticket){
                                $data->expire_time = time() + $expires_in;
                                $data->jsapi_ticket = $ticket;
                                if($flag->localOrSae == "local"){
	$fp = fopen("../docs/jsapi_ticket.json", "w");
	fwrite($fp, json_encode($data));
	fclose($fp);
                                }
                                else{
	$fp = new SaeStorage();
	$fp->write("weixin", "jsapi_ticket.json", json_encode($data));
                                }
                        }
                }
                else{
                        $ticket = $data->jsapi_ticket;
                }
                return $ticket;
        }

        public function getAccessToken(){
                $flag = json_decode(file_get_contents("../docs/flag.json"));
                $data;
                if($flag->localOrSae == "local"){
                        $data = json_decode(file_get_contents("../docs/access_token.json"));
                }
                else{
                        $data = new SaeStorage();
                        $data = $data->read("weixin", "access_token.json");
                        $data = json_decode($data);
                }
                if($data->expire_time < time()){
                        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret"; 
                        $res = json_decode($this->httpGet($url));
                        $access_token = $res->access_token;
                        if($access_token){
                                $data->expire_time = time() + $res->expires_in;
                                $data->access_token = $access_token;
                                if($flag->localOrSae == "local"){
	$fp = fopen("../docs/access_token.json", "w");
	fwrite($fp, json_encode($data));
	fclose($fp);
                                }
                                else{
	$fp = new SaeStorage();
	$fp->write("weixin", "access_token.json", json_encode($data));
                                }
                        }
                }
                else{
                        $access_token = $data->access_token;
                }
                return $access_token;
        }

        private function httpGet($url){
                $curl = curl_init();
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_TIMEOUT, 500);
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($curl, CURLOPT_URL, $url);
                $res = curl_exec($curl);
                curl_close($curl);
                return $res;
        }
}
?>

