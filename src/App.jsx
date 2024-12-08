import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import Loader from './components/Loader'
import Pattern from './components/Pattern'
import styled from 'styled-components'
import HomeScreen from './components/HomeScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppWrapper>
      <Pattern />
      <MainContent>
        <HomeScreen/>
      </MainContent>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
`;

export default App
