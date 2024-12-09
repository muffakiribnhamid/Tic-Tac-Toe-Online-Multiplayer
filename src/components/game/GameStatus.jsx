import React from 'react';
import styled from 'styled-components';

const GameStatus = ({ currentPlayer, winner, isDraw, scores }) => {
  const getStatusMessage = () => {
    if (winner) return `Winner: ${winner}!`;
    if (isDraw) return "It's a Draw!";
    return `Next Player: ${currentPlayer}`;
  };

  return (
    <Container>
      <StatusMessage>{getStatusMessage()}</StatusMessage>
      {scores && (
        <ScoreBoard>
          <Score>X: {scores.X}</Score>
          <Score>Draws: {scores.draws}</Score>
          <Score>O: {scores.O}</Score>
        </ScoreBoard>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const StatusMessage = styled.div`
  font-size: 1.5rem;
  color: #956afa;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem 1rem;
  background: rgba(149, 106, 250, 0.1);
  border-radius: 10px;
  border: 2px solid #956afa;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
`;

const Score = styled.div`
  color: #956afa;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default GameStatus;
