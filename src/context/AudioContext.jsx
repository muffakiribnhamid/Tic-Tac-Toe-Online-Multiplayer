import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);
  const drawSoundRef = useRef(null);

  // Initialize audio elements
  useEffect(() => {
    console.log('Initializing audio...');
    
    const initAudio = () => {
      try {
        bgMusicRef.current = new Audio();
        bgMusicRef.current.src = '/gameaudio.mp3';
        clickSoundRef.current = new Audio('/click.mp3');
        winSoundRef.current = new Audio('/win.mp3');
        loseSoundRef.current = new Audio('/lose.mp3');
        drawSoundRef.current = new Audio('/draw.mp3');

        // Configure audio settings
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.3;
        
        clickSoundRef.current.volume = 0.5;
        winSoundRef.current.volume = 0.5;
        loseSoundRef.current.volume = 0.5;
        drawSoundRef.current.volume = 0.5;

        // Ensure music is paused by default
        bgMusicRef.current.pause();

        console.log('Audio elements created successfully');
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();

    // Cleanup
    return () => {
      console.log('Cleaning up audio...');
      [bgMusicRef, clickSoundRef, winSoundRef, loseSoundRef, drawSoundRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  const startBackgroundMusic = async () => {
    if (!bgMusicRef.current || isMuted || !isGameStarted) return;

    try {
      await bgMusicRef.current.play();
      setCanAutoplay(true);
      console.log('Background music started successfully');
    } catch (error) {
      setCanAutoplay(false);
      console.error('Failed to play background music:', error);
    }
  };

  const toggleMute = async () => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (newMuted) {
        bgMusicRef.current?.pause();
      } else if (isGameStarted && canAutoplay) {
        startBackgroundMusic();
      }
      return newMuted;
    });
  };

  const playSound = async (type) => {
    if (isMuted) return;

    const playSoundWithRetry = async (audioRef) => {
      if (!audioRef.current) return;
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setCanAutoplay(true);
      } catch (error) {
        setCanAutoplay(false);
        console.error('Error playing sound:', error);
      }
    };

    switch (type) {
      case 'click':
        await playSoundWithRetry(clickSoundRef);
        break;
      case 'win':
        await playSoundWithRetry(winSoundRef);
        break;
      case 'lose':
        await playSoundWithRetry(loseSoundRef);
        break;
      case 'draw':
        await playSoundWithRetry(drawSoundRef);
        break;
      default:
        break;
    }
  };

  const startGame = async () => {
    setIsGameStarted(true);
    if (!isMuted && canAutoplay) {
      await startBackgroundMusic();
    }
  };

  const endGame = () => {
    setIsGameStarted(false);
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
  };

  return (
    <AudioContext.Provider 
      value={{ 
        isMuted, 
        toggleMute, 
        playSound,
        startGame,
        endGame,
        canAutoplay,
        startBackgroundMusic,
        isGameStarted
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
