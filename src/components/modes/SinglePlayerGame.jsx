import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const SinglePlayerGame = ({ onHome }) => {
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
    if (squares[index] || winningLine) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner);
      const winningPlayer = newSquares[winner[0]];
      setScores(prev => ({
        ...prev,
        [winningPlayer]: prev[winningPlayer] + 1
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
      <Title>Single Player</Title>
      <GameInfo>
        <StatusMessage>
          {winningLine 
            ? `Winner: ${squares[winningLine[0]]}` 
            : `Current Player: ${isXNext ? 'X' : 'O'}`}
        </StatusMessage>
        <ScoreBoard>
          <ScoreItem>X: {scores.X}</ScoreItem>
          <ScoreItem>O: {scores.O}</ScoreItem>
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
  color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
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
  color: white;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 10px;
`;

const ScoreItem = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
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
  background: white;
  border: 2px solid ${props => props.highlight ? '#956afa' : '#ccc'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

const WinnerInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default SinglePlayerGame;
