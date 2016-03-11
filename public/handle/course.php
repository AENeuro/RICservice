<?php
include_once 'header.php';
$_BASE_PATH="../../";
include_once $_BASE_PATH.'sys/core/init.inc.php';

if(isset($_POST["flag"])){
        $flag = $_POST["flag"];
        $course = new SaeMysql();

        if($flag == "modifyWiki"){
                $courseCode = $_POST["courseCode"];
                $sem = $_POST["sem"];
                $presen = $_POST["presen"];
                $essay = $_POST["essay"];
                $group = $_POST["group"];
                $sql = "update listCourse set `sem` = '$sem', `presen` = '$presen', `essay` = '$essay', `group` = '$group' where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }

        if($flag == "updateCourseBrief"){
                $courseCode = $_POST["courseCode"];
                $brief = $_POST["brief"];
                $sql = "update listCourse set `brief` = '$brief' where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }

        if($flag == "updateLikeReview"){
                $id = $_POST["id"];
                $sql = "update reviewCourse set `likeNumber` = (`likeNumber` + 1) where `id` = '$id';";
                $course -> runSql($sql);
        }
if($flag == "createArray"){
        $listCourse = array(
                array('id'=>1,'category'=>'CCCH','courseCode'=>'CCCH9001','courseName'=>'Chinese House and Garden: Architecture, Landscape, and Material Culture','likeNumber'=>2,'dislikeNumber'=>2),
                array('id'=>2,'category'=>'CCCH','courseCode'=>'CCCH9002','courseName'=>'Chinese Cities in the 21st Century','likeNumber'=>2,'dislikeNumber'=>1),
                array('id'=>3,'category'=>'CCCH','courseCode'=>'CCCH9004','courseName'=>'Ideas and Images of the West in Late Imperial China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>4,'category'=>'CCCH','courseCode'=>'CCCH9005','courseName'=>'The Chinese Cultural Revolution','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>5,'category'=>'CCCH','courseCode'=>'CCCH9006','courseName'=>'China\'s Modernization in the East Asian Context','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>6,'category'=>'CCCH','courseCode'=>'CCCH9007','courseName'=>'China in the Global Economy','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>7,'category'=>'CCCH','courseCode'=>'CCCH9008','courseName'=>'Hong Kong\'s Environment: Issues and Policies','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>8,'category'=>'CCCH','courseCode'=>'CCCH9009','courseName'=>'Protests, Rebellions and Revolutions in Modern China: From 1840 until Today','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>9,'category'=>'CCCH','courseCode'=>'CCCH9010','courseName'=>'Understanding China Governance: Challenges and Prospects','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>10,'category'=>'CCCH','courseCode'=>'CCCH9012','courseName'=>'China and World Order','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>11,'category'=>'CCCH','courseCode'=>'CCCH9013','courseName'=>'Love, Marriage and Sex in Modern China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>12,'category'=>'CCCH','courseCode'=>'CCCH9014','courseName'=>'Social Development Challenges in China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>13,'category'=>'CCCH','courseCode'=>'CCCH9015','courseName'=>'Population, Society and Sustainable Development in Hong Kong','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>14,'category'=>'CCCH','courseCode'=>'CCCH9016','courseName'=>'Hong Kong: Becoming a Chinese Global City','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>15,'category'=>'CCCH','courseCode'=>'CCCH9017','courseName'=>'People, Propaganda and Profit: Understanding Media in China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>16,'category'=>'CCCH','courseCode'=>'CCCH9018','courseName'=>'Buddhism and Chinese Culture','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>17,'category'=>'CCCH','courseCode'=>'CCCH9020','courseName'=>'Science and Technology: Lessons from China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>18,'category'=>'CCCH','courseCode'=>'CCCH9021','courseName'=>'Chinese Business and Society: Past and Present','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>19,'category'=>'CCCH','courseCode'=>'CCCH9023','courseName'=>'Family and Development in Modern China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>20,'category'=>'CCCH','courseCode'=>'CCCH9024','courseName'=>'Following the Dao: Ways of Life in Chinese Thought','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>21,'category'=>'CCCH','courseCode'=>'CCCH9025','courseName'=>'Humanity and Nature in Chinese Thought','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>22,'category'=>'CCCH','courseCode'=>'CCCH9028','courseName'=>'Hong Kong and China\'s Economic Development','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>23,'category'=>'CCCH','courseCode'=>'CCCH9029','courseName'=>'Ideas and Practices of Healing in Traditional China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>24,'category'=>'CCCH','courseCode'=>'CCCH9030','courseName'=>'Modernizing China\'s Constitution: Failures and Hope','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>25,'category'=>'CCCH','courseCode'=>'CCCH9031','courseName'=>'Property Rights, Built Heritage and Sustainable Development in Hong Kong','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>26,'category'=>'CCCH','courseCode'=>'CCCH9033','courseName'=>'Sustainable Urban Development and Hong Kong','likeNumber'=>1,'dislikeNumber'=>0),
                array('id'=>27,'category'=>'CCCH','courseCode'=>'CCCH9035','courseName'=>'Music along the Silk Road','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>28,'category'=>'CCCH','courseCode'=>'CCCH9036','courseName'=>'Environmental Pollution in China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>29,'category'=>'CCCH','courseCode'=>'CCCH9038','courseName'=>'Chinese Social Values: Authority and Anarchy','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>30,'category'=>'CCCH','courseCode'=>'CCCH9039','courseName'=>'Curing the Chinese: Medicine and Society in Modern China','likeNumber'=>0,'dislikeNumber'=>2),
                array('id'=>31,'category'=>'CCCH','courseCode'=>'CCCH9040','courseName'=>'Representing Contemporary China through Film','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>32,'category'=>'CCCH','courseCode'=>'CCCH9041','courseName'=>'The Rule of Law in Contemporary China','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>56,'category'=>'CCHU','courseCode'=>'CCHU9031','courseName'=>'Language Play as Social Communication in Multilingual Settings','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>54,'category'=>'CCHU','courseCode'=>'CCHU9028','courseName'=>'Happy Endings: How a Text Ends','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>55,'category'=>'CCHU','courseCode'=>'CCHU9030','courseName'=>'Image, Architecture and Society: Finding Meaning in Architectural Representation','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>53,'category'=>'CCHU','courseCode'=>'CCHU9026','courseName'=>'Cultures of War: Making Sense of the Human Fighting Instinct','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>52,'category'=>'CCHU','courseCode'=>'CCHU9025','courseName'=>'Creativity, Technology and Law','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>51,'category'=>'CCHU','courseCode'=>'CCHU9024','courseName'=>'The Last Dance: Understanding Death and Dying','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>50,'category'=>'CCHU','courseCode'=>'CCHU9023','courseName'=>'Shaping the Landscape: A Quest for Harmony between Nature and the City','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>49,'category'=>'CCHU','courseCode'=>'CCHU9022','courseName'=>'Journey into Madness: Conceptions of Mental Health and Mental Illness','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>48,'category'=>'CCHU','courseCode'=>'CCHU9021','courseName'=>'Critical Thinking in Contemporary Society','likeNumber'=>2,'dislikeNumber'=>0),
                array('id'=>47,'category'=>'CCHU','courseCode'=>'CCHU9019','courseName'=>'From Health to Well-being','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>46,'category'=>'CCHU','courseCode'=>'CCHU9018','courseName'=>'Arts and Ideas: East and West','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>45,'category'=>'CCHU','courseCode'=>'CCHU9017','courseName'=>'Stages of Life: Scientific Fact or Social Fiction?','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>44,'category'=>'CCHU','courseCode'=>'CCHU9015','courseName'=>'Sex and Intimacy in Modern Times','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>43,'category'=>'CCHU','courseCode'=>'CCHU9014','courseName'=>'Spirituality, Religion and Social Change','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>42,'category'=>'CCHU','courseCode'=>'CCHU9013','courseName'=>'Cultural Heritages in the Contemporary World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>41,'category'=>'CCHU','courseCode'=>'CCHU9012','courseName'=>'Body, Beauty and Fashion','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>40,'category'=>'CCHU','courseCode'=>'CCHU9011','courseName'=>'Social Divisions in Contemporary Societies','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>39,'category'=>'CCHU','courseCode'=>'CCHU9010','courseName'=>'Being Different: Understanding People with Disabilities','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>38,'category'=>'CCHU','courseCode'=>'CCHU9009','courseName'=>'Moral Controversies in Contemporary Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>37,'category'=>'CCHU','courseCode'=>'CCHU9007','courseName'=>'Sexuality and Gender: Diversity and Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>36,'category'=>'CCHU','courseCode'=>'CCHU9006','courseName'=>'Girl Power in a Man\'s World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>35,'category'=>'CCHU','courseCode'=>'CCHU9005','courseName'=>'Food and Values','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>34,'category'=>'CCHU','courseCode'=>'CCHU9003','courseName'=>'Making History: Engaging with the Powerful Past','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>33,'category'=>'CCHU','courseCode'=>'CCHU9001','courseName'=>'Designs on the Future: Sustainability of the Built Environment','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>58,'category'=>'CCGL','courseCode'=>'CCGL9001','courseName'=>'Hong Kong Cinema through a Global Lens','likeNumber'=>1,'dislikeNumber'=>0),
                array('id'=>59,'category'=>'CCGL','courseCode'=>'CCGL9002','courseName'=>'Hong Kong Culture in the Context of Globalization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>60,'category'=>'CCGL','courseCode'=>'CCGL9003','courseName'=>'Contagions: Global Histories of Disease','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>61,'category'=>'CCGL','courseCode'=>'CCGL9004','courseName'=>'Governance and Democracy in the Age of Globalization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>62,'category'=>'CCGL','courseCode'=>'CCGL9005','courseName'=>'Poverty, Development, and the Next Generation: Challenges for a Global World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>63,'category'=>'CCGL','courseCode'=>'CCGL9006','courseName'=>'Asian Regional Governance in an Age of Globalization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>64,'category'=>'CCGL','courseCode'=>'CCGL9007','courseName'=>'Youth in a Global World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>65,'category'=>'CCGL','courseCode'=>'CCGL9008','courseName'=>'Cybersocieties: Understanding Technology as Global Change','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>66,'category'=>'CCGL','courseCode'=>'CCGL9009','courseName'=>'Local Cultures and Global Markets','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>67,'category'=>'CCGL','courseCode'=>'CCGL9011','courseName'=>'Media in the age of globalization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>68,'category'=>'CCGL','courseCode'=>'CCGL9014','courseName'=>'Thinking about Global Ethics','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>69,'category'=>'CCGL','courseCode'=>'CCGL9015','courseName'=>'Globalization and Migration','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>70,'category'=>'CCGL','courseCode'=>'CCGL9016','courseName'=>'Feeding the World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>71,'category'=>'CCGL','courseCode'=>'CCGL9017','courseName'=>'Food: Technology, Trade and Culture','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>72,'category'=>'CCGL','courseCode'=>'CCGL9018','courseName'=>'Corporate Social Responsibility','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>73,'category'=>'CCGL','courseCode'=>'CCGL9019','courseName'=>'Economic Globalization: Issues and Challenges','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>74,'category'=>'CCGL','courseCode'=>'CCGL9020','courseName'=>'Environment, Globalization, and the Law','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>75,'category'=>'CCGL','courseCode'=>'CCGL9021','courseName'=>'Globalization and Tourism','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>76,'category'=>'CCGL','courseCode'=>'CCGL9022','courseName'=>'Globalization in Question: Human and Economic Consequences','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>77,'category'=>'CCGL','courseCode'=>'CCGL9023','courseName'=>'Internet, Media and Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>78,'category'=>'CCGL','courseCode'=>'CCGL9024','courseName'=>'The Life and Death of Languages: Diversity, Identity and Globalization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>79,'category'=>'CCGL','courseCode'=>'CCGL9025','courseName'=>'The Political Economy of Growth and Poverty in the World','likeNumber'=>1,'dislikeNumber'=>0),
                array('id'=>80,'category'=>'CCGL','courseCode'=>'CCGL9026','courseName'=>'Think Global, Act Local: You, Hong Kong, and the World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>81,'category'=>'CCGL','courseCode'=>'CCGL9027','courseName'=>'Criminal Organizations, Clandestine Globalization and the Illicit World Political Economy','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>82,'category'=>'CCGL','courseCode'=>'CCGL9030','courseName'=>'Understanding the Financial Crisis','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>83,'category'=>'CCGL','courseCode'=>'CCGL9031','courseName'=>'Entrepreneurship: Global and Social Development','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>84,'category'=>'CCGL','courseCode'=>'CCGL9032','courseName'=>'Rule of Law in the Globalizing World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>85,'category'=>'CCGL','courseCode'=>'CCGL9033','courseName'=>'Weapons of Mass Destruction: Science, Proliferation and Terrorism','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>86,'category'=>'CCGL','courseCode'=>'CCGL9034','courseName'=>'Globalization and Architecture','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>87,'category'=>'CCGL','courseCode'=>'CCGL9036','courseName'=>'Dilemmas of Humanitarian Intervention','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>88,'category'=>'CCGL','courseCode'=>'CCGL9038','courseName'=>'English as a Global Language in Asian Contexts','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>89,'category'=>'CCGL','courseCode'=>'CCGL9039','courseName'=>'World Heritage and Us','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>90,'category'=>'CCGL','courseCode'=>'CCGL9040','courseName'=>'Energy Futures, Globalization and Sustainability','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>91,'category'=>'CCGL','courseCode'=>'CCGL9042','courseName'=>'The Evolution of Civilization','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>92,'category'=>'CCGL','courseCode'=>'CCGL9043','courseName'=>'Obesity: Beyond a Health Issue','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>57,'category'=>'CCHU','courseCode'=>'CCHU9032','courseName'=>'Language, Institution and Power','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>109,'category'=>'CCST','courseCode'=>'CCST9001','courseName'=>'Life 2.0: Synthetic Biology and the Future Bioeconomy','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>110,'category'=>'CCST','courseCode'=>'CCST9002','courseName'=>'Quantitative Literacy in Science, Technology and Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>111,'category'=>'CCST','courseCode'=>'CCST9003','courseName'=>'Everyday Computing and the Internet','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>112,'category'=>'CCST','courseCode'=>'CCST9004','courseName'=>'Appropriate Technology for the Developing World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>113,'category'=>'CCST','courseCode'=>'CCST9005','courseName'=>'Science and Health: The Ever-changing Challenges and Solutions','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>114,'category'=>'CCST','courseCode'=>'CCST9006','courseName'=>'Biomedical Breakthroughs in a Pluralistic World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>115,'category'=>'CCST','courseCode'=>'CCST9008','courseName'=>'Infectious Disease in a Changing World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>116,'category'=>'CCST','courseCode'=>'CCST9009','courseName'=>'Living with Stem Cells','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>117,'category'=>'CCST','courseCode'=>'CCST9010','courseName'=>'The Science of Crime Investigation','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>118,'category'=>'CCST','courseCode'=>'CCST9011','courseName'=>'Biotechnology - Science and Impacts','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>119,'category'=>'CCST','courseCode'=>'CCST9012','courseName'=>'Our Place in the Universe','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>120,'category'=>'CCST','courseCode'=>'CCST9013','courseName'=>'Our Living Environment','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>121,'category'=>'CCST','courseCode'=>'CCST9014','courseName'=>'Science and Music','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>122,'category'=>'CCST','courseCode'=>'CCST9015','courseName'=>'Electronic Technologies in Everyday Life','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>123,'category'=>'CCST','courseCode'=>'CCST9016','courseName'=>'Energy: Its Evolution and Environmental Impacts','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>124,'category'=>'CCST','courseCode'=>'CCST9017','courseName'=>'Hidden Order in Daily Life: A Mathematical Perspective','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>125,'category'=>'CCST','courseCode'=>'CCST9018','courseName'=>'Origin and Evolution of Life','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>126,'category'=>'CCST','courseCode'=>'CCST9019','courseName'=>'Understanding Climate Change','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>127,'category'=>'CCST','courseCode'=>'CCST9020','courseName'=>'Sustainable Development of the Built Environment','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>128,'category'=>'CCST','courseCode'=>'CCST9021','courseName'=>'Hong Kong: Our Marine Heritage','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>129,'category'=>'CCST','courseCode'=>'CCST9022','courseName'=>'How the Mass Media Depicts Science, Technology and the Natural World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>130,'category'=>'CCST','courseCode'=>'CCST9023','courseName'=>'The Oceans: Science and Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>131,'category'=>'CCST','courseCode'=>'CCST9024','courseName'=>'Blood, Beliefs, Biology','likeNumber'=>0,'dislikeNumber'=>1),
                array('id'=>132,'category'=>'CCST','courseCode'=>'CCST9025','courseName'=>'Genetics and Human Nature','likeNumber'=>1,'dislikeNumber'=>0),
                array('id'=>133,'category'=>'CCST','courseCode'=>'CCST9026','courseName'=>'Scientific Revolutions and their Impact on Modern Societies','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>134,'category'=>'CCST','courseCode'=>'CCST9027','courseName'=>'The Science of Irrational Thinking','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>135,'category'=>'CCST','courseCode'=>'CCST9028','courseName'=>'Science and Technology: Facts and Fallacies','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>136,'category'=>'CCST','courseCode'=>'CCST9029','courseName'=>'Cyberspace Crime: Technology and Ethics','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>137,'category'=>'CCST','courseCode'=>'CCST9030','courseName'=>'Forensic Science: Unmasking Evidence, Mysteries and Crimes','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>138,'category'=>'CCST','courseCode'=>'CCST9032','courseName'=>'Intelligent Architecture and Sustainability','likeNumber'=>1,'dislikeNumber'=>0),
                array('id'=>139,'category'=>'CCST','courseCode'=>'CCST9033','courseName'=>'Left Brain, Right Brain: Science and Myth','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>140,'category'=>'CCST','courseCode'=>'CCST9034','courseName'=>'Living in a Hazardous World','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>141,'category'=>'CCST','courseCode'=>'CCST9035','courseName'=>'Making Sense of Science-related Social Issues','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>142,'category'=>'CCST','courseCode'=>'CCST9036','courseName'=>'Material World: Past, Present, and Future','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>143,'category'=>'CCST','courseCode'=>'CCST9037','courseName'=>'Mathematics: A Cultural Heritage','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>144,'category'=>'CCST','courseCode'=>'CCST9038','courseName'=>'Science and Science Fiction','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>145,'category'=>'CCST','courseCode'=>'CCST9039','courseName'=>'Statistics and Our Society','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>146,'category'=>'CCST','courseCode'=>'CCST9040','courseName'=>'The Science of Evidence: Is Medicine Scientific?','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>147,'category'=>'CCST','courseCode'=>'CCST9042','courseName'=>'The World of Waves','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>148,'category'=>'CCST','courseCode'=>'CCST9043','courseName'=>'Time\'s Arrow','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>149,'category'=>'CCST','courseCode'=>'CCST9045','courseName'=>'The Science and Lore of Culinary Culture','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>150,'category'=>'CCST','courseCode'=>'CCST9046','courseName'=>'The Science of the Mind-body-health Relationship','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>151,'category'=>'CCST','courseCode'=>'CCST9047','courseName'=>'The Age of Big Data','likeNumber'=>0,'dislikeNumber'=>0),
                array('id'=>152,'category'=>'CCST','courseCode'=>'CCST9048','courseName'=>'Simplifying Complexity','likeNumber'=>0,'dislikeNumber'=>0)
        );
        echo packJson(array('listCourse'), array($listCourse));
}
        if($flag == "updateReview"){
                $id = $_POST["id"];
                $review = $_POST["review"];
                $year = $_POST["year"];
                $sem = $_POST["sem"];
                $sql = "update reviewCourse set `review` = '$review', `year` = '$year', `sem` = '$sem' where `id` = '$id';";
                $course -> runSql($sql);
        }
        if($flag == "coursesList"){
                $category = $_POST["category"];
                $sql = "select * from `listCourse` where `category` = '$category';";
                $coursesList = $course -> getData($sql);
                echo packJson(array("coursesList"), array($coursesList));
        }
        if($flag == "postNewReview"){
                $courseCode = $_POST["courseCode"];
                $review = $_POST["review"];
                $stat = "show";
                $year = $_POST["year"];
                $sem = $_POST["sem"];
                $timePost = date('Y-m-d');
                $sql = "insert into reviewCourse (`courseCode`, `review`, `stat`, `year`, `sem`, `timePost`) values ('$courseCode', '$review', '$stat', '$year', '$sem', '$timePost');";
                $course -> runSql($sql);
                $sql = "update listCourse set `numberComment` = (`numberComment` + 1) where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }
        if($flag == "addSubset"){
                $root = $_POST["root"];
                $review = $_POST["review"];
                $courseCode = $_POST["courseCode"];
                $timePost = date('Y-m-d');
                $sql = "insert into reviewCourse (`courseCode`, `review`, `timePost`, `root`) values ('$courseCode', '$review', '$timePost', '$root');";
                $course -> runSql($sql);
                $sql = "update listCourse set `numberComment` = (`numberComment` + 1) where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }
        if($flag == "courseReview"){
                $courseCode = $_POST["courseCode"];
                $sql = "select * from reviewCourse where `courseCode` = '$courseCode';";
                $reviews = $course -> getData($sql);
                echo packJson(array('reviews'), array($reviews));
        }
        if($flag == "courseInfo"){
                $courseCode = $_POST["courseCode"];
                $sql = "select * from listCourse where `courseCode` = '$courseCode';";
                $courseInfo = $course -> getLine($sql);
                echo packJson(array("courseInfo"), array($courseInfo));
        }
        if($flag == "likeCourse"){
                $courseCode = $_POST["courseCode"];
                $sql = "update listCourse set `likeNumber` = (`likeNumber` + 1) where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }
        if($flag == "deleteReview"){
                $id = $_POST["id"];
                $courseCode = $_POST["courseCode"];
                $sql = "delete from reviewCourse where `id`='$id';";
                $course -> runSql($sql);
                $sql = "update listCourse set `numberComment` = (`numberComment` - 1) where `courseCode` = '$courseCode';";
                $course -> runSql($sql);
        }
}
session_write_close();
?>
