/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function Square({ squareClick, value }) {
  return (
    <button className="square" onClick={squareClick}>
      {value}
    </button>
  );
}

function Board({isX, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || Winner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isX ? "X" : "O";

    onPlay(nextSquares);
  }

  let status = "";
  if (Winner(squares)) {
    status = "Pemenangnya : " + Winner(squares);
  } else {
    status = "Giliran : " + (isX ? "X" : "O");
  }

  return (
    <>
      <div>{status}</div>
      <div className="board">
        <Square squareClick={() => handleClick(0)} value={squares[0]} />
        <Square squareClick={() => handleClick(1)} value={squares[1]} />
        <Square squareClick={() => handleClick(2)} value={squares[2]} />
        <Square squareClick={() => handleClick(3)} value={squares[3]} />
        <Square squareClick={() => handleClick(4)} value={squares[4]} />
        <Square squareClick={() => handleClick(5)} value={squares[5]} />
        <Square squareClick={() => handleClick(6)} value={squares[6]} />
        <Square squareClick={() => handleClick(7)} value={squares[7]} />
        <Square squareClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isX = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function onPlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  const moves = history.map((square, move) => {
    let description = ''
    if (move > 0) {
      description = "Pindah Ke Gerakan #"+move;
    } else {
      description = "Pindah Ke Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className="game">
        <div className="board">
          <Board isX={isX} squares={currentSquare} onPlay={onPlay} />
        </div>
        <ol>
          {moves}
        </ol>
      </div>
    </>
  );
}

function Winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }

  return false;
}

export default App;
