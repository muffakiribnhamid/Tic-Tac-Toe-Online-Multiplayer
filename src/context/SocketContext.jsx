import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext();

// Initialize the socket connection
const socket = io('http://localhost:3001'); // Ensure this matches your server URL

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    socket.on('gameStart', (data) => {
      console.log('Game started with opponent:', data.opponent);
      setGameStarted(true);
      setOpponent(data.opponent);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('gameStart');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, gameStarted, opponent }}>
      {children}
    </SocketContext.Provider>
  );
};