import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAudio } from '../../context/AudioContext';

const Square = ({ value, onClick, isWinning }) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    if (!value) {
      playSound('click');
      onClick();
    }
  };

  return (
    <StyledSquare 
      onClick={handleClick} 
      $isEmpty={!value}
      className={isWinning ? 'winning' : ''}
    >
      {value}
    </StyledSquare>
  );
};

const pop = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #956afa;
  }
  50% {
    box-shadow: 0 0 20px #956afa, 0 0 30px #6c42c9;
  }
  100% {
    box-shadow: 0 0 5px #956afa;
  }
`;

const StyledSquare = styled.button`
  background: ${props => props.$isEmpty ? 'rgba(149, 106, 250, 0.1)' : 'rgba(149, 106, 250, 0.2)'};
  border: 2px solid #956afa;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  color: #956afa;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(149, 106, 250, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &.winning {
    animation: ${glow} 1.5s infinite;
    background: rgba(149, 106, 250, 0.4);
  }

  ${props => props.children && css`
    animation: ${pop} 0.3s ease-out forwards;
  `}
`;

export default Square;
