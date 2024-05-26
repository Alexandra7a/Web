$(document).ready(function (){

    //load the selects for filters
    $.post("load_filtre.php", function (data, status) {
        let obj = JSON.parse(data);
        
        let producator = obj.producator;
        let memorie = obj.memorie;
        let stocare = obj.stocare;
        let procesor = obj.procesor;
        let placa_video = obj.placa_video;
        let diagonala = obj.diagonala;
        $("#producator").html(producator);
        $("#memorie").html(memorie);
        $("#stocare").html(stocare);
        $("#procesor").html(procesor);
        $("#placa_video").html(placa_video);
        $("#diagonala").html(diagonala);
    });
    function reload () {
        let producator = $("#producator").val();
        let memorie = $("#memorie").val();
        let stocare = $("#stocare").val();
        let procesor = $("#procesor").val();
        let placa_video = $("#placa_video").val();
        let diagonala = $("#diagonala").val();
        $.post("load_date.php", {
            producator: producator,
            memorie: memorie,
            stocare: stocare,
            procesor: procesor,
            placa_video: placa_video,
            diagonala: diagonala
        }, function (data, status) {
            $("#tabel").html(data);
        });
    }
    
    $("select").on("change",reload);
    reload();

    //clear the filter cand se apasa butonul
    $("#clear").click(function (){
        $("select").val("");
        reload();
    });
})
