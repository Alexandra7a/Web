
<?php  

error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=trainstations";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);
$stm = $pdo->query("SELECT * FROM routes");
$rows = $stm->fetchAll(PDO::FETCH_ASSOC);

$sosiri = [];

foreach($rows as $row){
    $sosire = $row['arrival_city'];
    $plecare = $row['departure_city'];

    if ($plecare===$_GET["plecare"])
    {
        if (!in_array($sosire, $sosiri)) {
            $sosiri[] = $sosire;
        }
    }
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');
header('Content-Type: application/json'); // dacă trimiți JSON
echo json_encode($sosiri);

?>

