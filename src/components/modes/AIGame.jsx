import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const AIGame = ({ onHome }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winningLine || !isXNext) return;

    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setSquares(newSquares);
    setIsXNext(false);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner);
      setScores(prev => ({
        ...prev,
        X: prev.X + 1
      }));
    } else {
      setTimeout(() => aiMove(newSquares), 500);
    }
  };

  const aiMove = (currentSquares) => {
    const availableMoves = currentSquares.map((square, index) => square === null ? index : null).filter(index => index !== null);
    if (availableMoves.length === 0) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newSquares = currentSquares.slice();
    newSquares[randomMove] = 'O';
    setSquares(newSquares);
    setIsXNext(true);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner);
      setScores(prev => ({
        ...prev,
        O: prev.O + 1
      }));
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinningLine(null);
    setIsXNext(true);
  };

  return (
    <GameContainer>
      <Title>VS AI</Title>
      <GameInfo>
        <StatusMessage>
          {winningLine ? `Winner: ${squares[winningLine[0]]}` : `Current Player: ${isXNext ? 'X' : 'O'}`}
        </StatusMessage>
        <ScoreBoard>
          <ScoreItem>Player (X): {scores.X}</ScoreItem>
          <ScoreItem>AI (O): {scores.O}</ScoreItem>
        </ScoreBoard>
        <BoardContainer>
          {squares.map((square, index) => (
            <Square
              key={index}
              highlight={winningLine?.includes(index)}
              onClick={() => handleClick(index)}
            >
              {square}
            </Square>
          ))}
        </BoardContainer>
        {winningLine && (
          <WinnerInfo>
            <Button onClick={resetGame} text="Play Again" />
          </WinnerInfo>
        )}
        <Button onClick={onHome} text="Back to Menu" />
      </GameInfo>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StatusMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 10px;
`;

const ScoreItem = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  background: rgba(149, 106, 250, 0.1);
  padding: 10px;
  border-radius: 10px;
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.highlight ? 'rgba(149, 106, 250, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.highlight ? '#956afa' : 'rgba(149, 106, 250, 0.3)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: #956afa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(149, 106, 250, 0.2);
  }
`;

const WinnerInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default AIGame;