document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');
  
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' }
  ];
  
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = (userInput.scrollHeight) + 'px';
  });
  
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
    
    addMessageToUI('user', userMessage);
    
    messages.push({ role: 'user', content: userMessage });
    
    userInput.value = '';
    userInput.style.height = 'auto';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingIndicator);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      typingIndicator.remove();
      
      const assistantMessage = data.choices[0].message.content;
      
      addMessageToUI('assistant', assistantMessage);
      
      messages.push({ role: 'assistant', content: assistantMessage });
      
    } catch (error) {
      console.error('Error:', error);
      
      typingIndicator.remove();
      
      addMessageToUI('system', `Error: ${error.message || 'Failed to communicate with the server'}`);
    }
  });
  
  function addMessageToUI(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    let formattedContent = content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    
    messageContent.innerHTML = `<p>${formattedContent}</p>`;
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  userInput.focus();
});
