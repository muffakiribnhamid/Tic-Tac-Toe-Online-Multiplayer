const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:5174", // Ensure this matches your frontend URL
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174", // Ensure this matches your frontend URL
    methods: ["GET", "POST"]
  }
});

let waitingPlayer = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    console.log(`User ${socket.id} is trying to join room: ${roomId}`);
    socket.join(roomId);

    if (waitingPlayer && waitingPlayer.roomId === roomId) {
      io.to(waitingPlayer.id).emit('gameStart', { symbol: 'X' });
      io.to(socket.id).emit('gameStart', { symbol: 'O' });
      waitingPlayer = null;
    } else {
      waitingPlayer = { id: socket.id, roomId };
    }
  });

  socket.on('makeMove', ({ roomId, index, symbol }) => {
    console.log(`Move made in room ${roomId} by ${symbol} at index ${index}`);
    socket.to(roomId).emit('moveMade', { index, symbol });
  });

  socket.on('resetGame', ({ roomId }) => {
    console.log(`Resetting game in room ${roomId}`);
    socket.to(roomId).emit('resetGame');
    socket.emit('resetGame');
    console.log(`Resetting game in room ${roomId}`);
    // console.log(`Resetting game in room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (waitingPlayer && waitingPlayer.id === socket.id) {
      waitingPlayer = null;
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});