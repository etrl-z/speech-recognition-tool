debugger
const startButton = document.getElementById('startButton');
const copyButton = document.getElementById('copyButton');
const textArea = document.getElementById('textInput');

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
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        textArea.value += transcript;
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
}

copyButton.onclick = () => {
    navigator.clipboard.writeText(textArea.value).then(function () {
        alert('Copied to clipboard!');
    }, function (error) {
        console.error('Copy text Error: ', error);
    });
}
