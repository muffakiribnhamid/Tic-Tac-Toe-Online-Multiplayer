import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';
import AudioControl from './AudioControl';
import { useAudio } from '../context/AudioContext';
import NameInput from './NameInput';

const HomeScreen = ({ onModeSelect }) => {
  const { playSound } = useAudio();
  const [showNameInput, setShowNameInput] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [generatedRoomId, setGeneratedRoomId] = useState('');
  const [name, setName] = useState('');

  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setGeneratedRoomId(newRoomId);
    setRoomId(newRoomId);
  };

  const handleModeSelect = (mode) => {
    playSound('click');
    if (mode === 'online') {
      setShowNameInput(true);
    } else {
      onModeSelect(mode);
    }
  };

  const handleNameSubmit = () => {
    playSound('click');
    onModeSelect('online', { playerName: name, roomId });
  };

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  if (showNameInput) {
    return (
      <div className='flex justify-center items-center h-screen'>
      <Button text="Start an Online Game"  onClick={handleNameSubmit} />
      </div>
    );
  }

  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <ButtonContainer>
        <Button 
          onClick={() => handleModeSelect('single')}
          text="Single Player"
        />
        <Button 
          onClick={() => handleModeSelect('ai')}
          text="Play vs AI"
        />
        {/* <Button  */}
          {/* onClick={() => handleModeSelect('online')} */}
          {/* text="Online Multiplayer" */}
        {/* /> */}
      </ButtonContainer>
      <AudioControl />
    </Container>
  );
};

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px #956afa;
  }
  50% {
    text-shadow: 0 0 20px #956afa, 0 0 30px #6c42c9;
  }
  100% {
    text-shadow: 0 0 5px #956afa;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #956afa;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite, ${glow} 3s ease-in-out infinite;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const RoomIdDisplay = styled.div`
  font-size: 1.5rem;
  color: #956afa;
  margin-top: 1rem;
`;

const RoomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #956afa;
  border-radius: 10px;
  background: rgba(149, 106, 250, 0.1);
  color: #956afa;
  font-size: 1.2rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px rgba(149, 106, 250, 0.3);
    background: rgba(149, 106, 250, 0.15);
  }

  &::placeholder {
    color: rgba(149, 106, 250, 0.5);
  }
`;

export default HomeScreen;
