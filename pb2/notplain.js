$(document).ready(function() {
    let page = 0;
    let elems = 0;
    var $list = $("#elements");
    var $prev = $("#previous");
    var $next = $("#next");

    function nrElems() {
        $.ajax({
            url: 'http://localhost:80/mylab/persoane.php',
            method: 'GET',
            success: function(data) {
                elems = JSON.parse(data);
                console.log(elems);
                startPage();
            }
        });
    }

    function getPage() {
        $.ajax({
            url: 'http://localhost:80/mylab/persoane.php',
            method: 'GET',
            data: { page: page },
            success: function(data) {
                $list.empty();
                data.forEach(function(element) {
                    var extract = element["Nume"] + " " + element["Prenume"] + " " + element["Telefon"] + " " + element["Email"];
                    console.log(extract);
                    var $newElem = $("<p>").text(extract);
                    $list.append($newElem);
                });
            }
        });
    }

    function startPage() {
        console.log(elems);
        var last_page = Math.floor(elems / 3);

        $prev.prop('disabled', true);
        if (page === last_page) $next.prop('disabled', false);

        getPage();
        console.log(last_page);

        $prev.on("click", function() {
            if (page - 1 === 0) $prev.prop('disabled', true);
            else $next.prop('disabled', false);
            page--;
            getPage();
            console.log(page);
        });

        $next.on("click", function() {
            if (page + 1 === last_page) $next.prop('disabled', true);
            else $prev.prop('disabled', false);
            page++;
            getPage();
            console.log(page);
        });
    }

    nrElems();
});
