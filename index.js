let timeWhite = 0;
let timeBlack = 0;
let playWhite = true;
let moving = false;

const imgs = {
  Bb: 'https://i.ibb.co/MRS7W34/Bb.png',
  Bw: 'https://i.ibb.co/sj6mpb1/Bw.png',
  Kb: 'https://i.ibb.co/T0FBB9h/Kb.png',
  Kw: 'https://i.ibb.co/nBMPTft/Kw.png',
  Nb: 'https://i.ibb.co/L9KkTg5/Nb.png',
  Nw: 'https://i.ibb.co/kmFLT0g/Nw.png',
  Pb: 'https://i.ibb.co/3CtF3CG/Pb.png',
  Pw: 'https://i.ibb.co/k4XBPVb/Pw.png',
  Qb: 'https://i.ibb.co/BcjSNDF/Qb.png',
  Qw: 'https://i.ibb.co/G26q5pC/Qw.png',
  Rb: 'https://i.ibb.co/c2JvdPB/Rb.png',
  Rw: 'https://i.ibb.co/wJkhVtC/Rw.png',
};

let moves = [];

// const audio = new Audio('tick.wav');
let tablero = [];
let origin, destiny, currPiece;

const timer = setInterval(function () {
  if (playWhite) timeWhite++;
  else timeBlack++;
  document.getElementById('timeWhite').innerHTML = hms(timeWhite / 10);
  document.getElementById('timeBlack').innerHTML = hms(timeBlack / 10);
}, 100);

iniciarTablero();
piezasTabla(tablero);
printLog(moves);

function hms(seg) {
  // devuelve una cadena con formato 0h:00m:00s.0
  let h = Math.floor(seg / 3600);
  let m = Math.floor((seg - h * 3600) / 60);
  let s = (seg - h * 3600 - m * 60).toFixed(1);
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;
  return h + ':' + m + ':' + s;
}

function iniciarTablero() {
  // crea un arreglo de dos dimensiones y lo llena con objetos piezas retornados por la funcion piece

  function piece(row, col) {
    let letter, color;
    const l = 'RNBQKBNR';
    if (row < 2) color = 'b';
    else if (row > 5) color = 'w';
    else return null;

    letter = row == 0 || row == 7 ? l[col] : 'P';
    return { letter, color };
  }

  for (var i = 0; i < 8; i++) {
    tablero[i] = [];
    for (var j = 0; j < 8; j++) {
      tablero[i].push(piece(i, j));
    }
  }
}

function piezasTabla(array) {
  // crea un node element <table> y le agrega clases
  // que representan si la casilla es blanca o negra
  // y si tiene o no tiene una pieza segun el contenido del arreglo, ademas
  // le agrega una clase js-casilla y un id para que respondan a eventos de mouse

  let container = document.querySelector('#content');
  if (container.firstChild) container.removeChild(container.firstChild);

  let tabla = document.createElement('table');

  for (let row = 0; row < 8; row++) {
    let tr = document.createElement('tr');
    for (let col = 0; col < 8; col++) {
      let td = document.createElement('td');
      td.className = (row + col) % 2 == 0 ? 'cell-white' : 'cell-black';
      td.classList.add('js-casilla');
      td.setAttribute('id', `${row}${col}`);

      const piece = array[row][col];
      if (piece) {
        let img = document.createElement('img');
        img.setAttribute('data-id', `${piece.letter}${piece.color}`);
        const k = piece.letter + piece.color;
        img.setAttribute('src', imgs[k]);
        td.appendChild(img);
      }
      tr.appendChild(td);
    }
    tabla.appendChild(tr);
  }
  container.appendChild(tabla);

  eventListeners();
}

function pieceUnicode(piece) {
  const d = { K: 12, Q: 13, R: 14, B: 15, N: 16, P: 17 };
  let num = d[piece.letter];
  if (piece.color == 'b') num += 6;
  return `&#98${num};`;
}

function movePiece() {
  // quita la pieza de la posicion origin, en la posicion destiny pone la pieza currPiece
  // rehace el tablero de ajedrez con las posiciones actualizadas
  // y establece nuevamente los event listeners
  // guarda la movida en el arreglo moves y lo imprime en el textarea log
  tablero[origin[0]][origin[1]] = null;
  tablero[destiny[0]][destiny[1]] = currPiece;
  piezasTabla(tablero);
  // audio.play();
  // si es enroque el jugador debe mover su torre (no hay cambio de turno)
  const currMove = { origin: origin, destiny: destiny, piece: currPiece };
  //(Math.abs(destiny[1] - origin[1]) == 2) && (currPiece.letter == 'K')
  if (!esEnroque(currMove)) playWhite = !playWhite;
  moves.push(currMove);
  printLog(moves);
}

function esEnroque(move) {
  if (move.piece.letter == 'K') {
    if (move.origin[1] - move.destiny[1] == 2) {
      return [true, '0-0-0'];
    } else if (move.origin[1] - move.destiny[1] == -2) {
      return [true, '0-0'];
    } else return false;
  } else return false;
}

function printLog(moves) {
  // cada elemento del arreglo moves es un objeto
  // {origin: 43, destiny: 62, piece: {letter: 'K', color:'white'}}
  // imprime el numero de cada jugada (blancas y negras),
  // convierte la posicion de la pieza a notacion algebraica si es enroque imprime 0-0 o 0-0-0
  let log = '';
  let lineNum = 1;
  const files = 'abcdefgh';

  for (let i = 0; i < moves.length; i++) {
    if (i > 0) {
      if (esEnroque(moves[i - 1])[0]) continue;
    }
    if (lineNum == Math.floor(lineNum)) {
      if (lineNum < 10) log += ' ';
      log += lineNum + '. ';
    }
    // si es enroque imprime 0-0 o 0-0-0
    let enroque = esEnroque(moves[i]);
    if (enroque[0]) {
      log += enroque[1];
    } else {
      log += pieceUnicode(moves[i].piece);
      log += files[Number(moves[i].destiny[1])];
      log += 8 - Number(moves[i].destiny[0]);
    }

    log += '  ';
    if (lineNum != Math.floor(lineNum)) log += '\r\n';
    lineNum += 0.5;
  }
  document.getElementById('log').innerHTML = log;
}

function eventListeners() {
  // tuve que incluir los event listeners dentro de una funcion
  // porque al rehacer la tabla dejaban de funcionar, por eso
  // despues de llamar piezasTabla llamo a esta funcion eventListeners

  const casillas = document.querySelectorAll('.js-casilla');
  const imgEls = document.querySelectorAll('td img');

  for (let img of imgEls) {
    img.addEventListener('mousedown', function (e) {
      const letterColor = this.getAttribute('data-id');
      currPiece = { letter: letterColor[0], color: letterColor[1] };
      origin = this.parentNode.getAttribute('id');
      console.log('img', origin, currPiece, moving);
      moving = true;
      // console.log(letterColor);
    });
  }

  for (casilla of casillas) {
    casilla.addEventListener('mousedown', function (event) {
      // establece la variable global destiny y llama a movePiece si se cumplen las condiciones
      console.log(moving);
      if (moving) {
        destiny = event.currentTarget.getAttribute('id');
        console.log('casilla', origin, destiny, currPiece);
        if (origin != destiny) {
          if (
            (playWhite && currPiece.color == 'w') ||
            (!playWhite && currPiece.color == 'b')
          )
            movePiece();
        }
      }
    });
  }
}
