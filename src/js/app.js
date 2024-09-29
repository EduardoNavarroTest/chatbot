// Reemplaza tu API key aquí
const apiKey = 'AIzaSyAcd-8GMR2OKSYRdTXIlqx33aJ3p0Nu9wA';

function formatText(text) {
    // Reemplazar **Texto** por <strong>Texto</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Reemplazar *texto* por <em>texto</em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return text;
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const welcomeMessage = "¡Hola! ¿En qué puedo ayudarte hoy?";
    displayMessage(welcomeMessage, 'bot-message');
}

// Llama a la función de bienvenida cuando se carga la página
window.onload = function () {
    showWelcomeMessage();
};



document.getElementById('chat-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input');
    const message = userInput.value;

    // Mostrar el mensaje del usuario
    displayMessage(message, 'user-message');

    // Limpiar el campo de texto
    userInput.value = '';

    try {
        // Enviar la consulta a la API de Google Gemini usando fetch
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [
                        {
                            text: message
                        }
                    ]
                }]
            })
        });

        const data = await response.json();



        // Verificar si hay candidatos en la respuesta
        if (data) {
            const botReply = formatText(data.candidates[0].content.parts[0].text) || "No puedo procesar tu solicitud en este momento.";
            displayMessage(botReply, 'bot-message');
        } else {

            displayMessage("Lo siento, no pude entender tu consulta.", 'bot-message');
        }
    } catch (error) {
        console.error('Error con la API de Google Gemini:', error);
        displayMessage("Hubo un error con la API, intenta nuevamente.", 'bot-message');
    }
});

// Función para mostrar mensajes en la ventana de chat// Función para mostrar mensajes en la ventana de chat// Función para mostrar mensajes en la ventana de chat
function displayMessage(message, className) {
    const chatWindow = document.getElementById('chat-window');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(className === 'user-message' ? 'user-message-container' : 'bot-message-container');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerHTML = message; // Cambia innerText por innerHTML
    
    messageContainer.appendChild(messageElement);
    chatWindow.appendChild(messageContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

