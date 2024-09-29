function speakText() {
    const text = document.getElementById('text-input').value;
    
    const utterance = new SpeechSynthesisUtterance(text);
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                speechSynthesis.speak(utterance);
            });
        } else {
            speechSynthesis.speak(utterance);
        }
}