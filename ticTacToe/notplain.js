$(document).ready(function (){
    let array = [['', '', ''], ['', '', ''], ['', '', '']];
    let cine_incepe =  Math.floor(Math.random() * 2);
    let piesa = 'O'
    let piesa_robot = 'X'
    let muta = true;
    if(cine_incepe === 1){
        piesa = 'X';
        piesa_robot = 'O';
        muta = false;
    }

    $.post("x_o.php", {
        tabla: array,
        muta: muta,
        piesa: piesa_robot
    }, function (response, status) {
        // alert(response);
        let data = JSON.parse(response);
        array = data["array"];
        $("#tabla").html(data["tabla"]);
        $("td").on("click", mutare_facuta);

    });
    function mutare_facuta() {
        if ($(this).val() === "") {
            // alert($(this).col + $(this).row)
            array[$(this).parent().index()][$(this).index()] = piesa;
            $.post("x_o.php", {
                tabla: array,
                muta: true,
                piesa: piesa_robot
            }, function (response, status) {
                // alert(response)
                console.log(response);
                let data = JSON.parse(response);
                if(data["finalizat"] === true){
                    $("#tabla").html(data["tabla"]);
                    setTimeout(function () {
                        alert('Jocul s-a terminat' + '\n' + data["castigator"]);
                    }, 100);
                    return;
                }
                array = data["array"];
                $("#tabla").html(data["tabla"]);
                $("td").on("click", mutare_facuta);
            });
        }
    }
})