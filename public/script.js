document
  .getElementById("chat-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const userInput = document.getElementById("user-input");
    const message = userInput.value;
    userInput.value = "";

    displayMessage(message, "user");

    displayMessage("Gemini thinking...", "bot", true);
    const reply = await sendMessage(message);
    displayMessage(reply, "bot");
  });

async function sendMessage(message) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
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
    document.getElementsByClassName("is_temporary")[0]?.remove()
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    if (isTemporary) {
        messageDiv.classList.add("is_temporary");
    }
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
