<?php
    $tabla = $_POST['tabla'];
    $muta = $_POST['muta'];
    $comp_item = $_POST['piesa']; //piesa calculatorului(ori 0 ori x)
    //verifica daca nu s-a terminat jocul
    $final = false;
    $castigator = "DRAW";


    //orizontal prima linie
    for($i=0; $i<3; $i++){
        if($tabla[$i][0] !='' and $tabla[$i][0] == $tabla[$i][1] and $tabla[$i][0] == $tabla[$i][2]){
            if($tabla[$i][0] == $comp_item)
                $castigator = "COMP WIN";
            else
                $castigator = "YOU WIN";
            $final = true;
            break;
        }
    }
    //vertical prima linie
    for($i=0; $i<3; $i++){
        if($tabla[0][$i] !='' and $tabla[0][$i] == $tabla[1][$i] and $tabla[0][$i] == $tabla[2][$i]){
            if($tabla[0][$i] == $comp_item)
                $castigator = "COMP WIN";
            else
                $castigator = "YOU WIN";
            $final = true;
            break;
        }
    }

    //diagonala
    if($tabla[0][0] !='' and $tabla[0][0] == $tabla[1][1] and $tabla[1][1] == $tabla[2][2]){
        if($tabla[0][0] == $comp_item)
            $castigator = "COMP WIN";
        else
            $castigator = "YOU WIN";
        $final = true;
    }
    //cealalta diagonala
    if($tabla[0][2] !='' and $tabla[0][2] == $tabla[1][1] and $tabla[1][1] == $tabla[2][0]){
        if($tabla[0][2] == $comp_item)
            $castigator = "COMP WIN";
        else
            $castigator = "YOU WIN";
        $final = true;
    }


    if($muta == "true" and !$final){

        //vedem cate pozitiile libere
        $pos = 0;
        for($i=0; $i<3; $i++){
            for($j=0; $j<3; $j++){
                if($tabla[$i][$j] == ''){
                    $pos++;
                }
            }
        }
        $random_number = mt_rand(0, $pos);
        for($i=0; $i<3; $i++){
            for($j=0; $j<3; $j++){
                //catam casuta de pe pozitia generata
                if($random_number <= 0 and $tabla[$i][$j] == ''){
                    $tabla[$i][$j] = $comp_item;
                    break 2;
                }
                $random_number--;
            }
        }
        if($pos <= 1){
            $final = true;
        }
    }


    //verific inca o data sa vad daca jocul nu a fost castigat dupa mutarea computerului
    for($i=0; $i<3; $i++){
        if($tabla[$i][0] !='' and $tabla[$i][0] == $tabla[$i][1] and $tabla[$i][0] == $tabla[$i][2]){
            if($tabla[$i][0] == $comp_item)
                $castigator = "COMP WIN";
            else
                $castigator = "YOU WIN";
            $final = true;
            break;
        }
    }
    for($i=0; $i<3; $i++){
        if($tabla[0][$i] !='' and $tabla[0][$i] == $tabla[1][$i] and $tabla[0][$i] == $tabla[2][$i]){
            if($tabla[0][$i] == $comp_item)
                $castigator = "COMP WIN";
            else
                $castigator = "YOU WIN";
            $final = true;
            break;
        }
    }
    if($tabla[0][0] !='' and $tabla[0][0] == $tabla[1][1] and $tabla[1][1] == $tabla[2][2]){
        if($tabla[0][0] == $comp_item)
            $castigator = "COMP WIN";
        else
            $castigator = "YOU WIN";
        $final = true;
    }
    if($tabla[0][2] !='' and $tabla[0][2] == $tabla[1][1] and $tabla[1][1] == $tabla[2][0]){
        if($tabla[0][2] == $comp_item)
            $castigator = "COMP WIN";
        else
            $castigator = "YOU WIN";
        $final = true;
    }


    //transmit inapoi tabla generata 
    $tabla_generata = "";
    for($i=0; $i<3; $i++){
        $tabla_generata .= "<tr>";
        for($j=0; $j<3; $j++){
            $tabla_generata .= "<td>{$tabla[$i][$j]}</td>";
        }
        $tabla_generata .= "</tr>";
    }

    $response = array(
        'finalizat' => $final,
        'tabla' => $tabla_generata,
        'array' => $tabla,
        'castigator' => $castigator
    );
    echo json_encode($response);