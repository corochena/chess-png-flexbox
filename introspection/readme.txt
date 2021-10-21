Cuando hago mousedown en una casilla necesito saber la pieza y la posicion de esa casilla, 
y cuando hago mouseup debo poner en la nueva posicion la pieza que tome y 
eliminar de la primera casilla la pieza que tenia

pieza = { posicion: [0,0], letra: 'K', color: 'white'}
letras = K, Q, R, B, K, P

Algunas Caracteristicas importantes:
Progresadas
1. Un timer que me diga el tiempo total consumido por cada jugador
4. Poner los controles de tiempo en sus respectivos lados: abajo las blancas, arriba las negras
5. Al menos debe forzar que el jugador mueva solo una vez (solo una pieza a menos que sea enroque)
6. Que imprima un log de las jugadas hechas

Pendientes
2. Poder mover una ficha a un area fuera del tablero y traerla de regreso, que las fichas comidas vayan a esa area
3. Hacerlo responsive. Que al reducir el ancho el tablero y sus piezas se acomoden y se hagan mas pequeÃ±os
7. Agregarle un Modal que permita apagar el sonido, cambiar el color de las piezas y tablero, ajustar el tamano,  poner limites de tiempo, etc.
8. Seria genial que reprodujera un juego a partir de una serie de jugadas codificadas
