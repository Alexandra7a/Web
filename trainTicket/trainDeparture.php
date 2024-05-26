
<?php  

error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=trainstations";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);
$stm = $pdo->query("SELECT * FROM routes");
$rows = $stm->fetchAll(PDO::FETCH_ASSOC);

$plecari = [];

foreach($rows as $row){
    $plecare = $row['departure_city'];
    if (!in_array($plecare, $plecari)) {
        $plecari[] = $plecare;
    }
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');
header('Content-Type: application/json'); // dacă trimiți JSON
echo json_encode($plecari);

?>

