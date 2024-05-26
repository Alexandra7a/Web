document.addEventListener('DOMContentLoaded', function () {
    var turn = 'mine';
    var freePos = Array([0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]);
    var tdElements = document.getElementsByTagName('td');

    function makeMove() {
        request = new XMLHttpRequest();
        $.post("http://localhost:80/mylab/xzero.php", {
            positions: freePos,

        }, function (response, status) {
            console.log(response);

            var indexes = response.split(' ');
            var rowIndex = parseInt(indexes[0]);
            var cellIndex = parseInt(indexes[1]);

            // Find the specific td element using rowIndex and cellIndex
            var table = document.querySelector('table');
            var row = table.rows[rowIndex];
            var cell = row.cells[cellIndex];

            // Set the innerHTML of the identified cell
            cell.innerHTML = 'O';
            var i = 0;
            freePos.forEach(e => {
                if (e[0] === rowIndex && e[1] === cellIndex) {
                    freePos.splice(i, 1); // 2nd parameter means remove one item only
                    return;
                }
                i++;
            })
            console.log('from comp')
            console.log(freePos);

        });
    }

    Array.prototype.forEach.call(tdElements, function (td) {
        td.addEventListener("click", function () {
            if (td.innerHTML === '')
                if (turn === 'mine') {
                    td.innerHTML = 'X';
                    //turn='comp';
                    var i = 0;
                    freePos.forEach(e => {
                        if (e[0] === td.parentNode.rowIndex && e[1] === td.cellIndex) {
                            freePos.splice(i, 1); // 2nd parameter means remove one item only
                            return;
                        }
                        i++;
                    })
                    console.log(freePos);
                    makeMove();
                }

        });
    });

});