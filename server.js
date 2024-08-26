const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('frontend'));

io.on('connection', (socket) => {
    let room;

    socket.on('joinRoom', (data) => {
        room = data.room;
        socket.join(room);
        socket.username = data.username;

        io.to(room).emit('message', {
            username: 'System',
            message: `${data.username} has joined the room.`,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
    });

    socket.on('chatMessage', (msg) => {
        io.to(room).emit('message', {
            username: socket.username,
            message: msg,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
    });

    socket.on('disconnect', () => {
        io.to(room).emit('message', {
            username: 'System',
            message: `${socket.username} has left the room.`,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
    });
});

http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
