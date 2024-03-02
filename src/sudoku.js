//Inicio de la pagina

/**
 * Carga la tabla del sudoku
 */
document.getElementById("contenedor_sudoku").appendChild(tablaSudoku);

/**
 * Botones
 */
document.getElementById("boton_generar").addEventListener("click", generarTamSudoku, false);
document.getElementById("boton_verificar").addEventListener("click", veriSudo, false);
document.getElementById("boton_resolver").addEventListener("click", resuelveSudoku, false);

generarTamSudoku();

/**
 * Verifica que sea un numero positivo mayor a 0
 */
function verificarNumero(casilla) {
    switch (casilla.value) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            break;
        default:
            casilla.value = "";
    }
    casilla.setAttribute("class", "entrada_sudoku");
}

/**
 * Genera el sudoku para los datos internos y la tabla
 */
function generarTamSudoku() {
    cargarSudoku();
    llenarTabla(sudokuFinal);
}

/**
 * Llena la tabla con la solucion del sudoku
 */
function resuelveSudoku() {
    if (sudoSoluA) {
        llenarTabla(sudoSoluA);
    } else {
        alert("Error al solucionar el sudoku")
    }
}

/**
 * Verifica el sudoku
 */
function veriSudo() {
    var tempSudoNew = tablaAMatriz();
    if (!hayErrores(tempSudoNew)) {
        if (casillasLlenas() == 81) {
            alert("Felicitaciones! el sudoku esta completo.")
        }
    } else {
        alert("Hay errores en el sudoku!\nPor favor verifique las casillas.");
    }
}