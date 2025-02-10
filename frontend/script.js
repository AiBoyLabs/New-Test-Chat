// Replace the fetch URL with your actual Render.com backend URL
const API_URL = 'https://new-test-chat.onrender.com/api/chat';

// Add these functions at the top of your script.js
function showChat() {
    document.getElementById('chat-section').classList.add('active');
    document.getElementById('providers-section').classList.remove('active');
}

function showProviders() {
    document.getElementById('chat-section').classList.remove('active');
    document.getElementById('providers-section').classList.add('active');
}

// Initialize chat view
document.addEventListener('DOMContentLoaded', function() {
    showChat(); // Show chat by default
});

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat('You: ' + message, 'user');
    input.value = '';

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response with typing effect
        addMessageToChat('Fashion AI: ' + data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.remove();
        addMessageToChat('Error: Failed to get response', 'error');
    }
}

function addMessageToChat(message, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = `message ${type}-message`;
    
    // Add animation class
    messageElement.style.animation = 'messageIn 0.3s ease-out forwards';
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingElement;
}

// Add event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add click handler for the back button
document.querySelector('.back-button').addEventListener('click', showChat); 
