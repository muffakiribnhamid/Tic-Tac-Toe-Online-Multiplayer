import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import styled from 'styled-components';
import Button from '../Button';
import './Board.css';

const Board = ({ roomId }) => {
  const { socket } = useSocket();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    // Listen for game start and set player symbol
    socket.on('gameStart', ({ symbol }) => {
      console.log('Game started, you are:', symbol);
      setPlayerSymbol(symbol);
      setIsMyTurn(symbol === 'X'); // X goes first
    });

    // Listen for moves from the other player
    socket.on('moveMade', ({ index, symbol }) => {
      console.log('Move received:', index, symbol);
      setSquares(prev => {
        const newSquares = [...prev];
        newSquares[index] = symbol;
        return newSquares;
      });
      setIsMyTurn(true); // It's my turn after opponent moves
    });

    return () => {
      socket.off('gameStart');
      socket.off('moveMade');
    };
  }, [socket]);

  const handleClick = (index) => {
    // Check if it's my turn and the square is empty
    if (!isMyTurn || squares[index] || winningLine) return;

    // Make the move
    const newSquares = [...squares];
    newSquares[index] = playerSymbol;
    setSquares(newSquares);
    setIsMyTurn(false); // Set to opponent's turn

    // Emit the move to the server
    socket.emit('makeMove', {
      roomId,
      index,
      symbol: playerSymbol
    });

    // Check for winner
    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner);
      setScores(prev => ({
        ...prev,
        [playerSymbol]: prev[playerSymbol] + 1
      }));
    }
  };

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
        return lines[i];
      }
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinningLine(null);
    setIsMyTurn(playerSymbol === 'X');
    socket.emit('resetGame', { roomId });
  };

  return (
    <GameContainer>
      <GameInfo>
        <StatusMessage>
          {playerSymbol ? (
            <>
              You are: <span style={{ color: '#956afa' }}>{playerSymbol}</span>
              <br />
              {isMyTurn ? "Your turn" : "Opponent's turn"}
            </>
          ) : (
            "Waiting for opponent..."
          )}
        </StatusMessage>

        <ScoreBoard>
          <ScoreItem>X: {scores.X}</ScoreItem>
          <ScoreItem>O: {scores.O}</ScoreItem>
        </ScoreBoard>

        <div className="board">
          {squares.map((square, index) => (
            <div
              key={index}
              className={`square ${winningLine?.includes(index) ? 'highlight' : ''}`}
              onClick={() => handleClick(index)}
            >
              {square}
            </div>
          ))}
        </div>

        {winningLine && (
          <WinnerInfo>
            <h2>Winner: {squares[winningLine[0]]}</h2>
            <Button onClick={resetGame} text="Play Again" />
          </WinnerInfo>
        )}
      </GameInfo>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StatusMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const ScoreItem = styled.div`
  font-size: 1.2rem;
  color: #956afa;
`;

const WinnerInfo = styled.div`
  text-align: center;
  margin-top: 2rem;

  h2 {
    color: #956afa;
    margin-bottom: 1rem;
  }
`;

export default Board;