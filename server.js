const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('frontend'));

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        // Check the secret code
        if (data.secretCode === 'your-secret-code') {
            socket.username = data.username;
            socket.join('chatroom'); // Optional: Use room name if needed
            io.to('chatroom').emit('message', { 
                username: 'Server', 
                message: `${data.username} has joined the chat`, 
                time: new Date().toLocaleTimeString() 
            });
        } else {
            socket.disconnect();
        }
    });

    socket.on('message', (message) => {
        io.to('chatroom').emit('message', { 
            username: socket.username, 
            message: message, 
            time: new Date().toLocaleTimeString() 
        });
    });

    socket.on('disconnect', () => {
        io.to('chatroom').emit('message', { 
            username: 'Server', 
            message: `${socket.username} has left the chat`, 
            time: new Date().toLocaleTimeString() 
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
