<?php
error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=persoane";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);
$stm = $pdo->query("SELECT * FROM users");
$rows = $stm->fetchAll(PDO::FETCH_ASSOC);


function getByPage($rows,$page){

    $len=count($rows);
    $start_index=3*$page;
    $list=[];
  
    while($rows[$start_index] && count($list)<3){
        $obj= $rows[$start_index]["Email"];
        //echo $obj;
        $list[]=$rows[$start_index];
        $start_index=$start_index +1;
    }

    return $list;
};


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');
header('Content-Type: application/json'); // dacă trimiți JSON

if(!isset($_GET["page"]))
{
    echo json_encode(count($rows));
}
else {
    echo json_encode(getByPage($rows,$_GET["page"]));
}



?>