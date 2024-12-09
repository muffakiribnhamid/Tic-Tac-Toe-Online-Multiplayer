import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAudio } from '../../context/AudioContext';
import { FaHome, FaRedo } from 'react-icons/fa';

const GameControls = ({ onRestart, onHome, gameStatus }) => {
  const { playSound, startGame, endGame } = useAudio();

  useEffect(() => {
    startGame();
    return () => {
      endGame();
    };
  }, []);

  const handleRestart = () => {
    if (onRestart) {
      playSound('click');
      onRestart();
    }
  };

  const handleHome = () => {
    if (onHome) {
      playSound('click');
      endGame();
      onHome();
    }
  };

  return (
    <StyledControls>
      <GameButton onClick={handleRestart}>
        <FaRedo /> Restart
      </GameButton>
      <GameButton onClick={handleHome}>
        <FaHome /> Home
      </GameButton>
      {gameStatus && (
        <GameStatus>
          {gameStatus}
        </GameStatus>
      )}
    </StyledControls>
  );
};

const StyledControls = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;
  justify-content: center;
`;

const GameButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
  }

  svg {
    font-size: 18px;
  }
`;

const GameStatus = styled.div`
  font-size: 18px;
  color: #333;
  margin: 0 10px;
`;

export default GameControls;
