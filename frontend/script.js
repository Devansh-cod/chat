const socket = io('https://www.simplecart.online');

function joinChat() {
    const username = document.getElementById('username').value;
    const secretCode = document.getElementById('secretCode').value;

    // Send join request with username and secret code
    socket.emit('join', { username, secretCode });
}

// Handle join response
socket.on('joinResponse', (response) => {
    if (response.success) {
        // Hide the login form and show the chat interface
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    } else {
        alert('Invalid secret code!');
    }
});

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    socket.emit('message', { message });
    document.getElementById('messageInput').value = '';
}

// Handle incoming messages
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username} (${data.time}): ${data.message}`;
    messagesDiv.appendChild(messageElement);
});
