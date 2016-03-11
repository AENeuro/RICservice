<?php

if( !isset($_BASE_PATH) )
        $_BASE_PATH = "../";

include $_BASE_PATH.'sys/config/db.inc.php';

foreach( $Const as $name => $val )
{
        define( $name, $val );
}

function __autoload($class_name)
{
        global $_BASE_PATH;
        $filename = $_BASE_PATH. "sys/class/class.$class_name.inc.php";	
        if( file_exists($filename) )
                include_once( $filename );
}

spl_autoload_register("__autoload");

?>
