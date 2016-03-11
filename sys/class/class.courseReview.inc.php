<?php

// 课程评论
class courseReview extends DB_Connect 
{
        // construction
        public function __construct()
        {
                parent::__construct();
        }
        // 数据库：review
        // 向数据库中插入一条新课程评论
        public function newReview($category, $courseCode, $review, $year, $sem, $prof, $gradeGPA, $gradeWorkload, $gradeProf)
        {
                $tableName = "review". $category;
                $sql = "insert into $tableName (`courseCode`, `review`, `year`, `sem`, `prof`, `gradeGPA`, `gradeWorkload`, `gradeProf`) values ('$courseCode', ' $review', '$year', '$sem', '$prof', '$gradeGPA', '$gradeWorkload', '$gradeProf');";
                mysql_query($sql, $this->root_conn) or trigger_error(mysql_error(), E_USER_ERROR);
        }

        // query
        // 获取该课程的所有评论
        public function getReview($category, $courseCode)
        {
            $tableName = "review".$category;
            $sql = "select * from $tableName where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
            $reviews = array();
			while($row=mysql_fetch_array($result)){
			    $reviews[] = $row;
			}

    		return $reviews;
        }

        // 数据库：list
        public function getCoursesList($category){
                $tableName = "list".$category;
                $sql = "select * from $tableName;";
                $result = mysql_query($sql, $this->root_conn);
                $courses = array();
                while($row=mysql_fetch_array($result)){
                        $courses[] = $row;
                }

                return $courses;
        }
        public function getCourseInfo($category, $courseCode){
            $tableName = "list".$category;
            $sql = "select * from $tableName where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
            if($result){
            $courseInfo = mysql_fetch_array($result);
            return $courseInfo;
            }
        }
        public function likeCourse($category, $courseCode){
            $tableName = "list".$category;
            $sql = "select `likeNumber` from $tableName where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
            $row = mysql_fetch_array($result);
            $newLikeNumber = $row["likeNumber"] + 1;
            $sql = "update $tableName set `likeNumber`='$newLikeNumber' where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
        }
        public function dislikeCourse($category, $courseCode){
            $tableName = "list".$category;
            $sql = "select `dislikeNumber` from $tableName where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
            $row = mysql_fetch_array($result);
            $newDislikeNumber = $row["dislikeNumber"] + 1;
            $sql = "update $tableName set `dislikeNumber`='$newDislikeNumber' where `courseCode`='$courseCode';";
            $result = mysql_query($sql, $this->root_conn);
        }
}

?>

