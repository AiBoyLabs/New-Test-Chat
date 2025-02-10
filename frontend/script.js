// Replace the fetch URL with your actual Render.com backend URL
const API_URL = 'https://new-test-chat.onrender.com/api/chat';

// Section switching functions
function showChat() {
    const chatSection = document.getElementById('chat-section');
    const providersSection = document.getElementById('providers-section');
    
    chatSection.classList.add('active');
    providersSection.classList.remove('active');
}

function showProviders() {
    const chatSection = document.getElementById('chat-section');
    const providersSection = document.getElementById('providers-section');
    
    chatSection.classList.remove('active');
    providersSection.classList.add('active');
}

// Make sure event listeners are added after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat view
    showChat();

    // Add click listeners to buttons
    document.querySelector('.providers-button').addEventListener('click', showProviders);
    document.querySelector('.back-button').addEventListener('click', showChat);
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
