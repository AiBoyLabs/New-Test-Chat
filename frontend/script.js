document.getElementById('send').addEventListener('click', async () => {
    const input = document.getElementById('input').value;
    if (!input) return;

    const messages = document.getElementById('messages');
    messages.innerHTML += `<div class="message user-message">${input}</div>`;

    const response = await fetch('https://your-render-url.com/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    messages.innerHTML += `<div class="message bot-message">${data.reply}</div>`;
});
