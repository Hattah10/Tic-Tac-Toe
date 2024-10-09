import React, { useState, useRef } from "react";
import "./App.css";
import "boxicons";
import Settings from "./components/Settings";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [firstPlayer, setFirstPlayer] = useState(null); // Tracks X player
  const [secondPlayer, setSecondPlayer] = useState(null); // Tracks O player
  const [gameStarted, setGameStarted] = useState(false); // State to manage game start
  const [volume, setVolume] = useState(1);
  const audioClickRef = useRef(false);

  const isBoardFull = board.every((cell) => cell !== null);
  const players = [
    { name: "zach", character: "/images/zach3.png", id: 1 },
    { name: "ibrahim", character: "/images/ibrahim3.png", id: 2 },
    { name: "test", character: "/images/ibrahim.jpg", id: 3 },
  ]; // List of players to choose from

  const { winner, winningLine } = calculateWinner(board);
  const currentPlayer = isXNext ? "X" : "O";
  const currentPlayerName = isXNext ? firstPlayer : secondPlayer;

  const handleClick = (index) => {
    if (board[index] || winner) return;
    audioClickRef.current.play();
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStarted(false);
    setFirstPlayer(null);
    setSecondPlayer(null);
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handlePlayerSelection = (selectedPlayer) => {
    if (!firstPlayer) {
      setFirstPlayer(selectedPlayer);
    } else if (!secondPlayer && firstPlayer.id !== selectedPlayer.id) {
      setSecondPlayer(selectedPlayer);
    }
    console.log("handlePlayerSelectionr ", selectedPlayer);
  };

  console.log("first player ", firstPlayer);
  console.log("2nd player ", secondPlayer);
  console.log("winningLine ", winningLine);

  const handleStartGame = () => {
    if (firstPlayer && secondPlayer) {
      setIsXNext(true);
      setGameStarted(true);
    }
  };
  return (
    <div className="game">
      {/* <Settings /> */}{" "}
      <div className="volume-box">
        <div>
          <box-icon name="volume-full"></box-icon>
          <audio
            src="/media/bg-music.MP3"
            autoPlay={true}
            // volume={volume}
          ></audio>
          {/* <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          /> */}
        </div>
        <div>
          <box-icon name="music"></box-icon>
          <audio
            ref={audioClickRef}
            autoPlay={false}
            src="/media/video-game-retro-click.wav"
          ></audio>
        </div>
      </div>
      <h1>Tic-Tac-Toe</h1>
      {!gameStarted ? (
        <div className="player-container">
          <h2>Select {!firstPlayer ? "1st" : "2nd"} Players:</h2>
          <div className="">
            <ul onChange={handlePlayerSelection}>
              {players.map((player, index) => (
                <li
                  key={player.id}
                  onClick={() => handlePlayerSelection(player)}
                  className={`player-items ${
                    firstPlayer?.id === player.id ||
                    secondPlayer?.id === player.id
                      ? "selected-character"
                      : ""
                  }`}
                >
                  <div className="box-character">
                    {" "}
                    <img
                      src={player.character}
                      // alt={currentPlayer}
                      className="character-img"
                    />
                  </div>
                  <p>{player.name}</p>{" "}
                </li>
              ))}
            </ul>
          </div>

          {firstPlayer && secondPlayer && (
            <button onClick={handleStartGame}>Start Game</button>
          )}
        </div>
      ) : (
        <>
          <div className="board">
            {board.map((cell, index) => (
              <button
                key={index}
                className={`cell ${
                  winningLine.includes(index) ? "highlight" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {" "}
                {cell === "X" && (
                  <img
                    src={firstPlayer.character}
                    alt="X"
                    className="character-img"
                  />
                )}
                {cell === "O" && (
                  <img
                    src={secondPlayer.character}
                    alt="O"
                    className="character-img"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="info">
            {winner ? (
              <h2>
                {winner === "X" ? firstPlayer.name : secondPlayer.name} wins!
              </h2>
            ) : isBoardFull && !winner ? (
              <h2>Its Draw!</h2>
            ) : (
              <div>
                {" "}
                <h2>Player's Turn</h2>
                <div className="player-items ">
                  <div className="box-character">
                    {" "}
                    <img
                      src={currentPlayerName.character}
                      // alt={currentPlayer}
                      className="character-img"
                    />
                  </div>
                  <p>{currentPlayerName.name}</p>{" "}
                </div>
              </div>
            )}
            <button className="reset" onClick={handleReset}>
              Restart Game
            </button>
            <button className="reset" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  return { winner: null, winningLine: [] };
};

export default App;
