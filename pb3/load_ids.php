<?php

error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=persoane";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);
$stm = $pdo->query("SELECT * FROM users");
$rows = $stm->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    foreach ($rows as $row) {
        echo "<li>" . $row['id'] . "</li>";
    }
} else {
    echo "<li>There are no more people!</li>";
}
?>