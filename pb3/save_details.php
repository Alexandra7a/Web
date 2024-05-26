<?php

error_reporting(E_ERROR | E_PARSE);
$dsn = "mysql:host=localhost;dbname=persoane";
$user = "root";
$passwd = "";
$pdo = new PDO($dsn, $user, $passwd);
 
    $id_p = intval($_POST['id']);
    $nume_p = $_POST['nume'];
    $prenume_p = $_POST['prenume'];
    $telefon_p = $_POST['telefon'];
    $mail_p = $_POST['mail'];
    
    $stm = $pdo->query("UPDATE users SET Nume = '$nume_p', Prenume = '$prenume_p', Telefon = '$telefon_p', Email = '$mail_p' WHERE id=$id_p");
    $rows = $stm->fetchAll(PDO::FETCH_ASSOC);

?>