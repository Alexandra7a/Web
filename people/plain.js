document.addEventListener('DOMContentLoaded', function() {
    let modificat = false;
    let salveaza = false;
    let listaId = document.getElementById('lista_id');
    let saveButton = document.getElementById('save');
    let inputs = document.querySelectorAll('form input');

    // Load list IDs
    function loadIds() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'load_ids.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                listaId.innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }
 

    // Incarcarea datelor dupa id
    listaId.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            if (!saveButton.disabled && !salveaza) {
                alert("Datele s-au modificat!\nNu vrei sa le salvezi?");
                salveaza = true;
                return;
            }

            let id = event.target.textContent;
            let xhr = new XMLHttpRequest();
         
            xhr.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    modificat = true;
                    let data = JSON.parse(xhr.responseText);
                    document.getElementById('id').value = data.id;
                    document.getElementById('nume').value = data.Nume;
                    document.getElementById('prenume').value = data.Prenume;
                    document.getElementById('telefon').value = data.Telefon;
                    document.getElementById('mail').value = data.Email;
                    saveButton.disabled = true;
                }
            };
            xhr.open('POST', 'load_details.php', true);
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.send('id=' + encodeURIComponent(id));
        }
    });

    // Save click 
    saveButton.addEventListener('click', function() {
        let id = document.getElementById('id').value;
        let nume = document.getElementById('nume').value;
        let prenume = document.getElementById('prenume').value;
        let telefon = document.getElementById('telefon').value;
        let mail = document.getElementById('mail').value;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_details.php', true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert("Datele s-au salvat cu succes!");
                clearForm();
                modificat = false;
                saveButton.disabled = true;
            }
        };
        xhr.send('id=' + encodeURIComponent(id) + 
                 '&nume=' + encodeURIComponent(nume) +
                 '&prenume=' + encodeURIComponent(prenume) +
                 '&telefon=' + encodeURIComponent(telefon) +
                 '&mail=' + encodeURIComponent(mail));
    });

    // Enable save button if input fields are modified
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            if (modificat) {
                saveButton.disabled = false;
                salveaza = false;
            }
        });
    });

    function clearForm() {
        inputs.forEach(function(input) {
            input.value = '';
        });
    }
    loadIds();
});
