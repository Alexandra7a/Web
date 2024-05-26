document.addEventListener('DOMContentLoaded', function() {
    // This code will run when the DOM is fully loaded
    // You can place your initialization code here
    
var sosiriList = document.getElementById("sosiri");
var plecariList = document.getElementById("plecari");

plecariList.addEventListener("change", function () {
  loadSosiri();
})

function loadPlecari() {
  request = new XMLHttpRequest(); // creăm apelul

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      alert(data);
      var option = document.createElement('option');
              option.value = "default";
              option.textContent = "default";
              plecariList.appendChild(option);
      var dataArray = Array.isArray(data) ? data : [data];
          dataArray.forEach(function(item) {
              var option = document.createElement('option');
              option.value = item;
              option.textContent = item;
              plecariList.appendChild(option);
          });
    }

  }

  request.open('GET', 'http://localhost:80/mylab/trainDeparture.php', true);
  request.send();
}

function loadSosiri() {
  request = new XMLHttpRequest(); // creăm apelul

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      alert(data);
      sosiriList.innerHTML='';
      var dataArray = Array.isArray(data) ? data : [data];
          dataArray.forEach(function(item) {
              var option = document.createElement('option');
              option.value = item;
              option.textContent = item;
              sosiriList.appendChild(option);
          });
    }
  }
  var plecareValue=document.getElementById("plecari").value;
  var encodedPlecare = encodeURIComponent(plecareValue);

  request.open('GET', 'http://localhost:80/mylab/trainArrivals.php?plecare='+encodedPlecare, true);
  request.send();
}

loadPlecari();
});


