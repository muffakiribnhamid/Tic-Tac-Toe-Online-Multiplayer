import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <PatternContainer>
      <PatternGrid />
    </PatternContainer>
  );
};

const PatternContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const PatternGrid = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(45deg);
  animation: moveGrid 20s linear infinite;

  @keyframes moveGrid {
    0% {
      transform: perspective(500px) rotateX(45deg) translateY(0);
    }
    100% {
      transform: perspective(500px) rotateX(45deg) translateY(30px);
    }
  }

  @media (min-width: 1440px) {
    width: 300%;
    height: 300%;
    top: -100%;
    left: -100%;
    background-size: 40px 40px;
  }

  @media (min-width: 2560px) {
    width: 400%;
    height: 400%;
    top: -150%;
    left: -150%;
    background-size: 50px 50px;
  }
`;

export default Pattern;
