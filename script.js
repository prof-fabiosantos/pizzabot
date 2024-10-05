async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    addMessageToChatBox("Usuário: " + userInput);
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch('https://fabiosantos-backend.hf.space/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        if (data && data.reply) {
            addMessageToChatBox("Chatbot: " + data.reply);
        } else {
            addMessageToChatBox("Chatbot: Resposta não encontrada.");
        }
    } catch (error) {
        addMessageToChatBox("Chatbot: Desculpe, ocorreu um erro ao processar sua solicitação.");
    }
}

function addMessageToChatBox(message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
