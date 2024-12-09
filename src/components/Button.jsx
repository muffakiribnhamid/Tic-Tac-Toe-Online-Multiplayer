import React from 'react';
import styled from 'styled-components';
import { useAudio } from '../context/AudioContext';

const Button = ({text, onClick}) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('/audio/click.mp3');
    if (onClick) onClick();
  };

  return (
    <StyledWrapper>
      <div>
        <StyledButton onClick={handleClick} className="c-button c-button--gooey"> {text}
          <div className="c-button__blobs">
            <div />
            <div />
            <div />
          </div>
        </StyledButton>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{display: 'block', height: 0, width: 0}}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .c-button {
    color: #000;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    padding: 0.9em 1.6em;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    z-index: 1;
  }

  .c-button--gooey {
    color: #06c8d9;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 4px solid #06c8d9;
    border-radius: 8px;
    position: relative;
    transition: all 700ms ease;
  }

  .c-button--gooey .c-button__blobs {
    height: 100%;
    filter: url(#goo);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: -3px;
    right: -1px;
    z-index: -1;
  }

  .c-button--gooey .c-button__blobs div {
    background-color: #06c8d9;
    width: 34%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transform: scale(1.4) translateY(125%) translateZ(0);
    transition: all 700ms ease;
  }

  .c-button--gooey .c-button__blobs div:nth-child(1) {
    left: -5%;
  }

  .c-button--gooey .c-button__blobs div:nth-child(2) {
    left: 30%;
    transition-delay: 60ms;
  }

  .c-button--gooey .c-button__blobs div:nth-child(3) {
    left: 66%;
    transition-delay: 25ms;
  }

  .c-button--gooey:hover {
    color: #fff;
  }

  .c-button--gooey:hover .c-button__blobs div {
    transform: scale(1.4) translateY(0) translateZ(0);
  }
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #956afa 0%, #6c42c9 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 66, 201, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

export default Button;
