export class ConvertSpeechToText {
    #startButton;
    #stopButton;
    #textOutput;
    #recognition;

    constructor() {
        this.#recognition = new webkitSpeechRecognition() || new SpeechRecognition();

        if (!this.#recognition) {
            throw new Error('Speech Recognition is not supported by your browser.')
        }

        this.#startButton = document.getElementById('start-button');
        this.#stopButton = document.getElementById('stop-button');
        this.#textOutput = document.getElementById('text-output');

        this.#recognition.interimResults = true;
        this.#recognition.continuous = true;
        this.#recognition.lang = "en-US";
        this.#recognition.maxAlternatives = 3;

        this.#startButton.addEventListener('click', this.#onStartRecording);

        this.#stopButton.addEventListener('click', this.#onStopRecording);

        this.#recognition.onresult = (event) => {
            this.#textOutput.textContent = event.results[event.results.length - 1][0].transcript;
        };

        this.#recognition.onend = () => {
            this.#startButton.disabled = false;
        };

        this.#recognition.onerror = (event) => {
            throw new Error(`Speech recognition error: ${event.error}`);
        };

        this.#recognition.onnomatch = () => {
            throw new Error('No speech was recognized.');
        };
    }

    #onStartRecording = () => {
        this.#recognition.start();
        this.#startButton.disabled = true;
    }

    #onStopRecording = () => {
        this.#recognition.stop();
        this.#startButton.disabled = false;
    }
}
