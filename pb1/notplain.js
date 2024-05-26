$(document).ready(function() {
    var sosiriList = $("#sosiri");
    var plecariList = $("#plecari");

    plecariList.on("change", function() {
        loadSosiri();
    });

    function loadPlecari() {
        $.ajax({
            url: 'http://localhost:80/mylab/trainDeparture.php',
            method: 'GET',
            success: function(data) {
                // alert(data);
                var dataArray = Array.isArray(data) ? data : [data];
                var defaultOption = $("<option>").val("default").text("default");
                plecariList.append(defaultOption);
                
                dataArray.forEach(function(item) {
                    var option = $("<option>").val(item).text(item);
                    plecariList.append(option);
                });
            }
        });
    }

    function loadSosiri() {
        $.ajax({
            url: 'http://localhost:80/mylab/trainArrivals.php',
            method: 'GET',
            data: { plecare: plecariList.val() },
            success: function(data) {
                // alert(data);
                sosiriList.empty();
                
                var dataArray = Array.isArray(data) ? data : [data];
                dataArray.forEach(function(item) {
                    var option = $("<option>").val(item).text(item);
                    sosiriList.append(option);
                });
            }
        });
    }

    loadPlecari(); 
});
