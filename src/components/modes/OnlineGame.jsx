import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { useSocket } from '../../context/SocketContext';

const OnlineGame = ({ onHome }) => {
  const { socket } = useSocket();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    socket.on('gameStart', ({ symbol }) => {
      console.log('Game started, you are:', symbol);
      setPlayerSymbol(symbol);
      setIsMyTurn(symbol === 'X');
      setGameStarted(true);
    });

    socket.on('moveMade', ({ index, symbol }) => {
      setSquares(prev => {
        const newSquares = [...prev];
        newSquares[index] = symbol;
        return newSquares;
      });
      setIsMyTurn(true);
    });

    return () => {
      socket.off('gameStart');
      socket.off('moveMade');
    };
  }, [socket]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (!gameStarted || !isMyTurn || squares[index] || winningLine) return;

    const newSquares = [...squares];
    newSquares[index] = playerSymbol;
    setSquares(newSquares);
    setIsMyTurn(false);

    socket.emit('makeMove', {
      roomId,
      index,
      symbol: playerSymbol
    });

    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinningLine(winner);
      setScores(prev => ({
        ...prev,
        [playerSymbol]: prev[playerSymbol] + 1
      }));
    }
  };

  const resetGame = () => {

    // it should reset the game and the board on the server
    // it should also reset the game and the board on the client
    socket.emit('resetGame', { roomId });
    setSquares(Array(9).fill(null));
    setWinningLine(null);
    setIsMyTurn(playerSymbol === 'X');
    setGameStarted(false);
    setRoomId('');
  };

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(newRoomId);
    socket.emit('joinRoom', newRoomId);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('joinRoom', roomId.trim());
    }
  };

  if (!gameStarted) {
    return (
      <GameContainer>
        <Title>Multiplayer</Title>
        <p className='text-white'>Share this room id : {roomId}</p>
        <GameInfo>
          <input
            type="text"
          
            className="w-full black bg-transparent border border-white rounded-md p-2 text-black"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <div className="flex gap-5">
          <Button onClick={joinRoom} text="Join Room" />
          <Button onClick={createRoom} text="Create Room" />
          </div>
          <Button onClick={onHome} text="Back to Menu" />
        </GameInfo>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Title>Multiplayer</Title>
      <GameInfo>
        <StatusMessage>
          {winningLine 
            ? `Winner: ${squares[winningLine[0]]}` 
            : `You are ${playerSymbol} - ${isMyTurn ? 'Your turn' : "Opponent's turn"}`}
        </StatusMessage>
        <ScoreBoard>
          <ScoreItem>X: {scores.X}</ScoreItem>
          <ScoreItem>O: {scores.O}</ScoreItem>
        </ScoreBoard>
        <RoomInfo>Use This Id To Invite Your Friend: <span style={{ color: '#956afa', textDecoration: 'underline' }}>{roomId}</span></RoomInfo>
        <BoardContainer>
          {squares.map((square, index) => (
            <Square
              key={index}
              highlight={winningLine?.includes(index)}
              onClick={() => handleClick(index)}
            >
              {square}
            </Square>
          ))}
        </BoardContainer>
        <Button onClick={onHome} text="Back to Menu" />
        <Button onClick={resetGame} text="Play Again" />
      </GameInfo>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  color: #956afa;
  font-size: 24px;
  font-weight: bold;
`;

const GameInfo = styled.div`
  color: #956afa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #956afa;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-align: center;
    width: 200px;
  }
`;

const StatusMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 10px;
`;

const ScoreItem = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  background: rgba(149, 106, 250, 0.1);
  padding: 10px;
  border-radius: 10px;
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.highlight ? 'rgba(149, 106, 250, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.highlight ? '#956afa' : 'rgba(149, 106, 250, 0.3)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: #956afa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(149, 106, 250, 0.2);
  }
`;

const RoomInfo = styled.p`
  font-size: 14px;
  color: #956afa;
  margin-top: 10px;
`;

export default OnlineGame;