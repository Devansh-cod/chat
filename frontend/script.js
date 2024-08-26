const socket = io('https://your-app-name.herokuapp.com');

function joinChat() {
    const username = document.getElementById('username').value;
    const secretCode = document.getElementById('secretCode').value;

    if (secretCode === 'devanshbhaiya') {
        // Hide the login form and show the chat interface
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';

        // Join the chat room
        socket.emit('join', { username, secretCode });
    } else {
        alert('Invalid secret code!');
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    socket.emit('message', message);
    document.getElementById('messageInput').value = '';
}

// Handle incoming messages
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username} (${data.time}): ${data.message}`;
    messagesDiv.appendChild(messageElement);
});
