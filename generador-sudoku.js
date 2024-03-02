//Generador y solucionador
/**
 * Sudoku
 */
var sudokuFinal = new Array(9);
var sudoSoluA = new Array(9);
var tempSudoku = new Array(9);

for (var i = 0; i < 9; i++) {
    sudokuFinal[i] = new Array(9);
    sudoSoluA[i] = new Array(9);
    tempSudoku[i] = new Array(9);
}

/**
 * Funcion generadora principal
 */
function generarSudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (Math.random() * 10 > 5) {
                rellenarCelda(i, j);
            } else {
                tempSudoku[i][j] = "0";
            }
        }
    }
    for (var i = 0; i < 9; i++) {
        switch (i) {
            case 0:
            case 3:
            case 6:
                var cas = 0;
                var k = 0;
                var i2 = i;
                while (cas < 3) {
                    for (var j = 0; j < 3; j++) {
                        sudokuFinal[i2][j] = tempSudoku[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            case 1:
            case 4:
            case 7:
                var cas = 0;
                var k = 0;
                var i2 = i - 1;
                while (cas < 3) {
                    for (var j = 3; j < 6; j++) {
                        sudokuFinal[i2][j] = tempSudoku[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            case 2:
            case 5:
            case 8:
                var cas = 0;
                var k = 0;
                var i2 = i - 2;
                while (cas < 3) {
                    for (var j = 6; j < 9; j++) {
                        sudokuFinal[i2][j] = tempSudoku[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            default:
                alert('Error al generar el sudoku');
                break;
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (sudokuFinal[i][j] != 0) {
                limpiarSudoku(i, j);
            } else {
                sudokuFinal[i][j] = '0';
            }
        }
    }
}

/**
 * Asigna un numero a una casilla de la matriz comprobandola
 */
function rellenarCelda(i, j) {
    var num = parseInt((Math.random() * 9) + 1);
    if (comprobarCasilla(num, i, j) == false) {
        tempSudoku[i][j] = "0";
    } else {
        tempSudoku[i][j] = num;
    }
}

/**
 * Limpia los valores de la matriz sudoku con correctos
 */
function limpiarSudoku(i, j) {
    for (var k = 0; k < 9; k++) {
        if (sudokuFinal[i][k] == sudokuFinal[i][j] && k != j) {
            sudokuFinal[i][k] = "0";
        }
    }
    for (var k = 0; k < 9; k++) {
        if (sudokuFinal[k][j] == sudokuFinal[i][j] && k != i) {
            sudokuFinal[k][j] = "0";
        }
    }
}

/**
 * Verifica que el numero en una casilla del sudoku este bien
 */
function comprobarCasilla(num, i, j) {
    for (var k = 0; k < 9; k++) {
        if (tempSudoku[i][k] == num) {
            return false;
        }
    }
    return true;
}

/**
 * Valida la casilla en el sudoku
 */
function casillaValida(sudoku, fila, columna, valor) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(fila / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(columna / 3) + i % 3;
        if (sudoku[fila][i] == valor || sudoku[i][columna] == valor || sudoku[m][n] == valor) {
            return false;
        }
    }
    return true;
}

/**
 * Llena una tabla que contiene el sudoku con la solucion
 */
function solucionSudoku(sudoku) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == 0) {
                for (let k = 1; k <= 9; k++) {
                    if (casillaValida(sudoku, i, j, k)) {
                        sudoku[i][j] = `${k}`;
                        if (solucionSudoku(sudoku)) {
                            return true;
                        } else {
                            sudoku[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

/**
 * Ajusta las casillas del sudoku convirtiendolas a string
 */
function ajustarSudoku(sudoku) {

    for (var i = 0; i < sudoku.length; i++) {
        for (var j = 0; j < sudoku[i].length; j++) {
            sudoku[i][j] = sudoku[i][j] + "";
        }
    }
    return sudoku;
}

/**
 * Copia un sudoku en una nueva matriz
 */
function copiarSudoku(sudoku) {

    var copia = new Array();

    for (i = 0; i < 9; i++) {
        copia[i] = new Array();
    }

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            copia[i][j] = sudoku[i][j];
        }
    }
    return copia;
}

/**
 * Carga el sudoku
 */
function cargarSudoku() {

    const maxIntentos = 5;
    var intentos = 0;
    do {
        generarSudoku();
        ajustarSudoku(sudokuFinal);
        sudoSoluA = copiarSudoku(sudokuFinal);
        intentos++;

        if (intentos >= maxIntentos) {
            sudokuFinal = _defaSudoku;
            sudoSoluA = _defaSudokuSolucion;
            break;
        }
    } while (!solucionSudoku(sudoSoluA) && intentos < maxIntentos);
}

/**
 * Verifica dos matrices del sudoku
 */
function hayErrores(sudoku) {

    for (var i = 0; i < sudoSoluA.length; i++) {
        for (var j = 0; j < sudoSoluA[i].length; j++) {

            if (sudoku[i][j] != 0 && sudoSoluA[i][j] != sudoku[i][j]) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Sudoku predefinido
 */
const _defaSudoku = [
    ["7", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "3", "2", "0", "0", "8", "0", "0", "0"],
    ["0", "5", "0", "0", "0", "0", "8", "0", "0"],
    ["0", "0", "6", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "8"],
    ["0", "0", "0", "7", "5", "0", "0", "2", "3"],
    ["0", "0", "5", "0", "6", "2", "1", "8", "7"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "4", "0", "0", "0", "0", "0", "9", "0"]
]

const _defaSudokuSolucion = [
    ["7", "1", "8", "2", "3", "4", "5", "6", "9"],
    ["6", "3", "2", "5", "9", "8", "4", "7", "1"],
    ["4", "5", "9", "1", "7", "6", "8", "3", "2"],
    ["1", "7", "6", "8", "2", "3", "9", "4", "5"],
    ["5", "2", "3", "6", "4", "9", "7", "1", "8"],
    ["9", "8", "4", "7", "5", "1", "6", "2", "3"],
    ["3", "9", "5", "4", "6", "2", "1", "8", "7"],
    ["2", "6", "1", "9", "8", "7", "3", "5", "4"],
    ["8", "4", "7", "3", "1", "5", "2", "9", "6"]
];