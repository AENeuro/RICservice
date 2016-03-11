<?php

class Professor extends DB_Connect 
{
        public function __construct(){
                parent::__construct();
        }

        // 返回某门课程的所有授课教授
        function courseProf($courseCode){
                $sql = "SELECT `name`, `text` FROM professor;";
                $result = mysql_query($sql, $this->root_conn);
                $ret = array();
                if($result){
                        while($row = mysql_fetch_array($result)){
                                $text = $row["course"];
                                // 如果某教授的course中有$courseCode， 则将该教授的名字加入返回值中
                                if(strpos($text, $courseCode)){
                                        $ret[] = $row["name"];
                                }
                        }
                }
                return $ret;
        }

        // 返回某个faculty下的全部教授
        function facultyProf($faculty){
                $sql = "SELECT `name` FROM professor WHERE `faculty` = '$faculty';";
                $result = mysql_query($sql,$this->root_conn);
                $ret = array();
                if($result){
                        while($row = mysql_fetch_array($result)){
                                $ret[] = $row["name"];
                        }
                }
                return $ret;
        }
}
?>

