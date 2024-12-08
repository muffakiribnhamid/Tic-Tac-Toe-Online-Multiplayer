import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Lottie from 'lottie-react';
import Button from './Button';

const HomeScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <TextAnimation />
    </div>
  )
}

export default HomeScreen

export const TextAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/feda1176-6b05-4d2a-a336-c3e9f0b8404d/8mhxP781zr.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  return (
    <StyledWrapper>
      <div className="top-container">
        <h2 className="game-title text-4xl mb-8">Tic Tac Toe</h2>
      </div>

      <div className="loader">
        <p className="play-text">Play With</p>
        <div className="words">
          <span className="word">Your Friends</span>
          <span className="word">Your Computer</span>
          <span className="word">Online Players</span>
        </div>
      </div>

      <div className="game-modes">
        <h2 className="mode-title">Select Game Mode</h2>
        <div className="btn-container">
          <Button text={'Single Player'} onClick={() => console.log('Single Player')}/>
          <Button text={'With AI '} onClick={() => console.log('With AI')}/>
          <Button text={'Online Player'} onClick={() => console.log('Online Player')}/>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-height: 100vh;
  padding: 2rem;

  .top-container {
    text-align: center;
  }

  .loader {
    color: #fff;
    font-family: 'Russo One', sans-serif;
    font-weight: 500;
    font-size: 25px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .play-text {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
    font-size: 18px;
    color: black;
    text-shadow: 2px 2px 4px rgba(149, 106, 250, 0.3);
  }

  .words {
    overflow: hidden;
    height: 40px;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 12px;
    color: black;
    animation: spin_4991 6s infinite;
    line-height: 40px;
    font-family: 'Russo One', sans-serif;
    text-shadow: 2px 2px 4px rgba(149, 106, 250, 0.3);
  }

  .game-modes {
    text-align: center;
  }

  .mode-title {
    font-family: 'Press Start 2P', cursive;
    font-size: 20px;
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  @keyframes spin_4991 {
    10% {
      transform: translateY(-102%);
    }

    25% {
      transform: translateY(-100%);
    }

    35% {
      transform: translateY(-202%);
    }

    50% {
      transform: translateY(-200%);
    }

    60% {
      transform: translateY(0);
    }

    85% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(0);
    }
  }
`;
