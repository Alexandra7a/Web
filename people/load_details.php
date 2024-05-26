<?php

error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=persoane";
$user = "root";
$passwd = "";
try {
    $pdo = new PDO($dsn, $user, $passwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_p = intval($_POST['id']);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->bindParam(':id', $id_p, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) > 0) {
        $row = $rows[0];
        $response = array(
            'id' => $row['id'],
            'Nume' => $row['Nume'],
            'Prenume' => $row['Prenume'],
            'Telefon' => $row['Telefon'],
            'Email' => $row['Email']
        );
        echo json_encode($response);
    } else {
        echo "id not found!";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
