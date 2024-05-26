<?php
if (isset($_POST["positions"])) {
    $positions =$_POST["positions"]; // Decode the JSON string into a PHP array
   // rand.seed(time);
    $pos=rand(0,count($positions)-1);

    echo $positions[$pos][0].' ';
    echo $positions[$pos][1];
        /*if ($positions !== null) { // Check if the JSON decoding was successful
        echo "Received positions:<br>";
        foreach ($positions as $position) {
            echo "Row: " . htmlspecialchars($position[0]) . ", Column: " . htmlspecialchars($position[1]) . "<br>";
        }
    } else {
        echo "Error decoding JSON.";
    }*/
} else {
    echo "nu";
}
?>
