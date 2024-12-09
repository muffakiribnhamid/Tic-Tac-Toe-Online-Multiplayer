import React from 'react';
import styled from 'styled-components';
import { useAudio } from '../context/AudioContext';

const AudioControl = () => {
  const { isMuted, toggleMute, canAutoplay, startBackgroundMusic } = useAudio();

  const handlePlayClick = async () => {
    await startBackgroundMusic();
  };

  return (
    <ControlWrapper>
      <AudioButton 
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <i className="fas fa-volume-mute"></i>
        ) : (
          <i className="fas fa-volume-up"></i>
        )}
      </AudioButton>
      {!canAutoplay && !isMuted && (
        <PlayButton onClick={handlePlayClick}>
          <i className="fas fa-play"></i>
          <span>Play Music</span>
        </PlayButton>
      )}
    </ControlWrapper>
  );
};

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AudioButton = styled.button`
  background: none;
  border: none;
  color: #956afa;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #6c42c9;
  }
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #956afa 0%, #6c42c9 100%);
  border: none;
  border-radius: 20px;
  color: white;
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 1.5s infinite;

  i {
    font-size: 0.8rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(149, 106, 250, 0.4);
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
  }
`;

export default AudioControl;
