document.addEventListener('DOMContentLoaded', function () {
    let page = 0;
    let elems = 0;
    var list = document.getElementById("elements");
    var prev = document.getElementById("previous");
    var next = document.getElementById("next");

    function nrElems() {
        request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                elems = data;
                console.log(elems);
                startPage();
            }
        }
        request.open('GET', 'http://localhost:80/mylab/persoane.php', true);
        request.send();
    }

    function getPage() {
        request = new XMLHttpRequest(); // creăm apelul

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                list.innerHTML = '';
                //alert(data);
                data.forEach(element => {
                    var extract = element["Nume"] + " " + element["Prenume"] + " " + element["Telefon"] + " " + element["Email"];
                    console.log(extract);
                    var newElem = document.createElement("p");
                    newElem.textContent = extract;
                    list.appendChild(newElem);

                });
            }
        }
        request.open('GET', 'http://localhost:80/mylab/pb2/persoane.php?page=' + page, true);
        request.send();
    }

    function startPage() {

        console.log(elems);
        var last_page = Math.floor(elems / 3);

        prev.disabled = true;
        if (page === last_page) next.disabled = false;

        getPage();
        console.log(last_page);
        prev.addEventListener("click", function () {
            if (page - 1 === 0) prev.disabled = true;
            else
                next.disabled = false;
            page--;
            getPage();
            console.log(page);
        })
        next.addEventListener("click", function () {
            if (page + 1 === last_page) next.disabled = true;
            else
                prev.disabled = false;
            page++;
            getPage();
            console.log(page);

        })
    }
    nrElems();

});