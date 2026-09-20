const startButton = document.getElementById('startButton');
const copyButton = document.getElementById('copyButton');
const textArea = document.getElementById('textInput');

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
let isListening = false;
let finalTranscript = '';

if (!SpeechRecognition) {
    startButton.disabled = true;
    alert('Your browser does not support Speech Recognition.');
} else {
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
        let interimTranscript = '';

        for (const result of event.results) {
            const transcript = result[0].transcript;

            if (result.isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        textArea.value = finalTranscript + interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        isListening = false;
        startButton.textContent = 'START';
    };

    recognition.onend = () => {
        isListening = false;
        startButton.textContent = 'START';
    };
}

startButton.onclick = () => {
    if (!recognition) return;

    if (isListening) {
        recognition.stop();
        return;
    }

    finalTranscript = textArea.value;
    
    recognition.start();
    isListening = true;
    startButton.textContent = 'STOP';
};

copyButton.onclick = async () => {
    try {
        await navigator.clipboard.writeText(textArea.value);
        copyButton.textContent = 'COPIED!';

        setTimeout(() => {
            copyButton.textContent = 'COPY';
        }, 1000);
    } catch (error) {
        console.error('Copy text error:', error);
    }
};
