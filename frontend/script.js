const socket = io();

function joinRoom() {
    const room = document.getElementById('room').value;
    const username = document.getElementById('username').value;

    if (room && username) {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';

        socket.emit('joinRoom', { room, username });
    }
}

socket.on('message', (msg) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    messageElement.innerHTML = `
        <strong>${msg.username}</strong>
        <span>${msg.message}</span>
        <span class="timestamp">${msg.date} ${msg.time}</span>
    `;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const message = document.getElementById('message-input').value;
    if (message.trim()) {
        socket.emit('chatMessage', message);
        document.getElementById('message-input').value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
