import {ConvertSpeechToText} from './ConvertSpeechToText.js';

(() => {
    const readyState = document.readyState;

    if (readyState === 'interactive' || readyState === "complete") {
        new ConvertSpeechToText();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            new ConvertSpeechToText();
        });
    }
})();
