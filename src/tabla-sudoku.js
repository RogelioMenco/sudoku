//Manejo de la tabal visual (generar, llenar y tomar la matriz)
var tablaSudoku = generaTabla(
  3,
  3,
  generaTabla(
    3,
    3,
    '<input maxlength="1" class="entrada_sudoku" onblur="verificarNumero(this)">',
  ).outerHTML,
);
tablaSudoku.setAttribute('id', 'tabla_sudoku');

/**
 * Crea la tabla 3x3, donde cada celda es una cuadricula
 */
function generaTabla(filas, columnas, celda) {
  /**
   * Tabla
   */
  var tabla = document.createElement('table');
  var tablaCuerpo = document.createElement('tbody');

  /**
   * Filas de la tabla
   */
  for (var i = 0; i < filas; i++) {
    var tmpFila = document.createElement('tr');

    /**
     * Columnas
     */
    for (var j = 0; j < columnas; j++) {
      var tmpCelda = document.createElement('td'); //Celda
      tmpCelda.innerHTML = celda; //Escribe el contenido
      tmpFila.appendChild(tmpCelda); //Inserta la celda
    }

    //Añade la fila a la tabla
    tablaCuerpo.appendChild(tmpFila);
  }

  tabla.appendChild(tablaCuerpo); //Agrega el cuerpo de la tabla
  return tabla;
}

/**
 * Llena la tabla del sudoku con la matriz generada
 */
function llenarTabla(matrizSudoku) {
  limpiarTabla(tablaSudoku);

  //Recorre las filas de la tabla
  for (var i = 0; i < tablaSudoku.rows.length; i++) {
    //Recorre las celdas de una fila
    for (var j = 0; j < tablaSudoku.rows[i].cells.length; j++) {
      /**
       * Cada celda es una cuadricula 3x3, por lo que se recorre como otra matriz
       */
      llenarCuadricula(
        obtenerCuadrante(matrizSudoku, i, j),
        tablaSudoku.rows[i].cells[j].firstElementChild,
      );
    }
  }
}

function llenarCuadricula(contenido, cuadricula) {
  //Recorre las filas de la cuadricula
  for (var i = 0; i < cuadricula.rows.length; i++) {
    //Recorre las celdas de una fila
    for (var j = 0; j < cuadricula.rows[i].cells.length; j++) {
      //Verifica si el contenido es una matriz y si no asigna un espacio vacio
      if (contenido && contenido[i][j] != 0) {
        cuadricula.rows[i].cells[j].firstElementChild.setAttribute(
          'disabled',
          'disabled',
        ); //Evita cambios en la casilla
        cuadricula.rows[i].cells[j].firstElementChild.value = contenido[i][j]; //Por cada casilla actualiza el valor
      } else {
        cuadricula.rows[i].cells[j].firstElementChild.value = ''; //Por cada casilla actualiza el valor
      }
    }
  }
}

/**
 * Limpia la tabla del sudoku
 */
function limpiarTabla() {
  //Recorre las filas de la tabla
  for (var i = 0; i < tablaSudoku.rows.length; i++) {
    //Recorre las celdas de una fila
    for (var j = 0; j < tablaSudoku.rows[i].cells.length; j++) {
      llenarCuadricula('', tablaSudoku.rows[i].cells[j].firstElementChild);
    }
  }
}

function tablaAMatriz() {
  var tmpMatriz = [];

  //Recorre las filas de la tabla
  for (var i = 0; i < tablaSudoku.rows.length; i++) {
    //Recorre las celdas de una fila
    for (var j = 0; j < tablaSudoku.rows[i].cells.length; j++) {
      tmpMatriz.push(
        cuadriculaAMatriz(tablaSudoku.rows[i].cells[j].firstElementChild),
      );
    }
  }
  return convertirMatrizCuadrantes(tmpMatriz);
}

/**
 *
 */
function cuadriculaAMatriz(cuadricula) {
  var tmpMatriz = [];

  //Recorre las filas de la tabla
  for (var i = 0; i < cuadricula.rows.length; i++) {
    var tmpFila = [];

    //Recorre las celdas de una fila
    for (var j = 0; j < cuadricula.rows[i].cells.length; j++) {
      var num = cuadricula.rows[i].cells[j].firstElementChild.value;
      tmpFila[j] = num == '' ? '0' : num;
    }

    tmpMatriz[i] = tmpFila;
  }
  return tmpMatriz;
}

/**
 * Obtiene un cuadrante de 3x3 de una matriz 9x9 del sudoku
 */
function obtenerCuadrante(matrizSudoku, fila, columna) {
  var tmpMatriz = [];

  fila = fila * 3;
  columna = columna * 3;

  var indexCuadro = 0;
  for (var i = fila; i < fila + 3; i++) {
    //Resetea el indice para la proxima fila de la matriz
    indexFila = 0;
    var tmpFila = [];

    for (var j = columna; j < columna + 3; j++) {
      /**
       * Por cada casilla asigna el valor tomado de la matriz sudoku e incrementa el indice
       */
      tmpFila[indexFila++] = matrizSudoku[i][j];
    }
    tmpMatriz[indexCuadro++] = tmpFila; //Agrega la fila a la matriz
  }
  return tmpMatriz;
}

/**
 * Convierte una matriz con cuadrantes a una matriz 9x9
 */
function convertirMatrizCuadrantes(matriz) {
  var tempMat = new Array(); //Matriz nueva
  var indiceCuadricula = 0; //Indice de los cuadrantes

  //Filas de cada cuadrante
  for (j = 0; j < 3; j++) {
    var tempFila; // Fila de 9 espacios
    for (i = 0; i < 3; i++) {
      //Agrupa las filas de los 3 cuadrantes en 1 fila
      tempFila = matriz[indiceCuadricula][i]
        .concat(matriz[indiceCuadricula + 1][i])
        .concat(matriz[indiceCuadricula + 2][i]);
      tempMat.push(tempFila);
    }
    indiceCuadricula += 3; //Cambia de cuadrantes
  }
  return tempMat;
}

/**
 * Retorna el numero de casillas llenas
 */
function casillasLlenas() {
  var llenas = 0;
  var matriz = tablaAMatriz();
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (matriz[i][j] != 0) {
        llenas++;
      }
    }
  }
  return llenas;
}
