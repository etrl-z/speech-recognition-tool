const startButton = document.getElementById('startButton');
const textArea = document.getElementById('textInput');

let accumulatedText = ''; // Variable to store accumulated text

startButton.onclick = () => {
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.onresult = (e) => {
        let transcript = '';
        for (let i = 0; i < e.results.length; ++i) {
            transcript += e.results[i][0].transcript;
        }
        accumulatedText += transcript + ' '; // Append the new transcript to the accumulated text
        textArea.innerHTML = accumulatedText; // Update the text area with the accumulated text
    };

    recognition.onerror = (e) => {
        console.error('Speech Recognition Error: ', e.error);
    };

    recognition.onend = () => {
        if (speech) {
            recognition.start(); // Restart recognition if speech is still true
        }
    };

    if (speech) {
        recognition.start();
    }
};
