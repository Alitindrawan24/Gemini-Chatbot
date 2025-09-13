// Generate a unique session ID for this browser session
const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

// Display session info
document.getElementById('session-info').textContent = `Session: ${sessionId.slice(-8)}`

document
  .getElementById("chat-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const userInput = document.getElementById("user-input");
    const message = userInput.value;
    if (!message.trim()) return;
    userInput.value = "";

    // Remove empty state if it exists
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
      emptyState.remove();
    }

    displayMessage(message, "user");

    // Disable input while processing
    userInput.disabled = true;
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    displayMessage("Thinking...", "bot", true);
    const reply = await sendMessage(message);
    displayMessage(reply, "bot");
    
    // Re-enable input
    userInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send';
    userInput.focus();
  });

// Add clear chat functionality
function clearChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">💬</div>
      <div class="empty-state-text">Start a conversation</div>
      <div class="empty-state-subtext">Ask me anything and I'll help you out!</div>
    </div>
  `;
  
  // Clear the session on the server
  fetch(`/api/chat/${sessionId}`, {
    method: "DELETE",
  }).catch(error => {
    console.error("Error clearing chat session:", error);
  });
}

async function sendMessage(message) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Failed to get response.";
  }
}

function displayMessage(message, sender, isTemporary) {
    // Remove any existing temporary messages
    const tempMessages = document.getElementsByClassName("is_temporary");
    while (tempMessages.length > 0) {
      tempMessages[0].remove();
    }
    
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    if (isTemporary) {
        messageDiv.classList.add("is_temporary");
    }
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
