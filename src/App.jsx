import { useState } from 'react'
import './App.css'
import Pattern from './components/Pattern'
import styled from 'styled-components'
import HomeScreen from './components/HomeScreen'
import { AudioProvider } from './context/AudioContext'
import { SocketProvider } from './context/SocketContext'
import Footer from './components/Footer'
import SinglePlayerGame from './components/modes/SinglePlayerGame'
import AIGame from './components/modes/AIGame'
import OnlineGame from './components/modes/OnlineGame'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameConfig, setGameConfig] = useState(null);

  const handleModeSelect = (mode, config) => {
    setGameConfig(config);
    setCurrentScreen(mode);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'single':
        return <SinglePlayerGame onHome={() => setCurrentScreen('home')} />;
      case 'ai':
        return <AIGame onHome={() => setCurrentScreen('home')} />;
      case 'online':
        return <OnlineGame onHome={() => setCurrentScreen('home')} gameConfig={gameConfig} />;
      default:
        return <HomeScreen onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <AudioProvider>
      <SocketProvider>
        <AppWrapper>
          <Pattern />
          <MainContent>
            {renderScreen()}
          </MainContent>
          <Footer />
        </AppWrapper>
      </SocketProvider>
    </AudioProvider>
  )
}

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
`;

export default App
