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
        if (data.secretCode === 'devanshbhaiya') {
            socket.username = data.username;
            socket.join('chatroom'); // Optional: Use room name if needed
            
            // Send success response to the user
            socket.emit('joinResponse', { success: true });

            // Notify others in the room
            io.to('chatroom').emit('message', { 
                username: 'Server', 
                message: `${data.username} has joined the chat`, 
                time: new Date().toLocaleTimeString() 
            });
        } else {
            // Send failure response
            socket.emit('joinResponse', { success: false });
        }
    });

    socket.on('message', (data) => {
        if (socket.rooms.has('chatroom')) {
            io.to('chatroom').emit('message', { 
                username: socket.username, 
                message: data.message, 
                time: new Date().toLocaleTimeString() 
            });
        }
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.to('chatroom').emit('message', { 
                username: 'Server', 
                message: `${socket.username} has left the chat`, 
                time: new Date().toLocaleTimeString() 
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
