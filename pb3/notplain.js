$(document).ready(function () {

    let modificat = false;
    let salveaza = false;
    $("#lista_id").load("load_ids.php");

    $("#lista_id").on("click", "li", function () {

        if ($("#save").prop("disabled") === false && salveaza === false) {
            alert("Datele s-au modificat!\nNu vrei sa le salvezi?");
            salveaza = true;
            return;
        }

        //daca se apasa pe un id sa se incarce datele corespunzatoare
        $.post("load_details.php", 
        { 
            id: $(this).text() 
        },
         function (response) {
            modificat = true;
            let data = JSON.parse(response);
            $("#id").val(data["id"]);
            $("#nume").val(data["Nume"]);
            $("#prenume").val(data["Prenume"]);
            $("#telefon").val(data["Telefon"]);
            $("#mail").val(data["Email"]);
        })
        $("#save").prop("disabled", true);
    });


    $("#save").click(function () {
        let id = $("#id").val();
        let nume = $("#nume").val();
        let prenume = $("#prenume").val();
        let telefon = $("#telefon").val();
        let mail = $("#mail").val();
        // alert(id + nume + prenume + telefon + mail);
        $.post("save_details.php", {
            id: id,
            nume: nume,
            prenume: prenume,
            telefon: telefon,
            mail: mail
        }, function (data, status) {
            alert("Datele s-au salvat cu succes!")
            clearform();
            modificat = false;
            $("#save").prop("disabled", true);
        })
    });


    //daca am modificat vreo data in field uri
     
    $("input").keyup(function () {
        if (modificat) {
            $("#save").prop("disabled", false);
            salveaza = false;
        }
    });
});

function clearform() {
    $("input").val("");
}
