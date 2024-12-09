import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAudio } from '../context/AudioContext';
import AudioControl from './AudioControl';

const Footer = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <FooterWrapper>
      <AudioButton onClick={toggleMute}>
        {isMuted ? (
          <>
            <MusicIcon>🔇</MusicIcon>
            Play Music
          </>
        ) : (
          <>
            <MusicIcon>🎵</MusicIcon>
            Pause Music
          </>
        )}
      </AudioButton>
      <DevCredit>
        <span>Developed with</span>
        <HeartBeat>❤️</HeartBeat>
        <span>by</span>
        <DeveloperName>Muffakir ibn Hamid</DeveloperName>
      </DevCredit>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  border-top: 2px solid #956afa33;
`;

const beat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #956afa; }
  50% { text-shadow: 0 0 20px #956afa, 0 0 30px #6c42c9; }
  100% { text-shadow: 0 0 5px #956afa; }
`;

const HeartBeat = styled.span`
  display: inline-block;
  margin: 0 0.5rem;
  animation: ${beat} 1.5s infinite;
`;

const DevCredit = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  color: #956afa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeveloperName = styled.span`
  background: linear-gradient(135deg, #956afa 0%, #6c42c9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${glow} 3s infinite;
  font-weight: bold;
`;

const AudioButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #956afa 0%, #6c42c9 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 66, 201, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MusicIcon = styled.span`
  font-size: 16px;
`;

export default Footer;
