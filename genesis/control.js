const playBtn = document.getElementById('playBtn');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const progressFill = document.getElementById('progressFill');
const currentText = document.getElementById('currentText');

let isPlaying = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let currentIndex = 0;
let verses = [];

function initVerses() {
    const verseElements = document.querySelectorAll('.verse');
    verses = Array.from(verseElements).map(el => el.textContent);
}

function getEnglishVoice() {
    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => 
        voice.lang.startsWith('en')
    );
    return englishVoices.length > 0 ? englishVoices[0] : voices[0];
}

function speak(index) {
    if (index >= verses.length) {
        stopPlayback();
        return;
    }

    currentIndex = index;
    const text = verses[index];

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'en-US';
    currentUtterance.rate = parseFloat(speedRange.value);
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;

    const voice = getEnglishVoice();
    if (voice) {
        currentUtterance.voice = voice;
    }

    currentUtterance.onstart = function() {
        currentText.textContent = text;
        highlightVerse(index);
        updateProgress();
    };

    currentUtterance.onend = function() {
        if (isPlaying) {
            speak(index + 1);
        }
    };

    currentUtterance.onerror = function() {
        if (isPlaying && index + 1 < verses.length) {
            speak(index + 1);
        }
    };

    speechSynthesis.speak(currentUtterance);
}

function highlightVerse(index) {
    document.querySelectorAll('.verse').forEach((el, i) => {
        el.style.backgroundColor = i === index ? 'rgba(139, 90, 43, 0.3)' : 'rgba(139, 90, 43, 0.1)';
        el.style.borderLeftColor = i === index ? '#c9a227' : '#8b6914';
    });
}

function updateProgress() {
    const progress = (currentIndex / verses.length) * 100;
    progressFill.style.width = progress + '%';
}

function togglePlay() {
    if (!speechSynthesis) {
        currentText.textContent = 'Your browser does not support speech synthesis';
        return;
    }

    if (!verses.length) {
        initVerses();
    }

    if (isPlaying) {
        stopPlayback();
    } else {
        startPlayback();
    }
}

function startPlayback() {
    isPlaying = true;
    playBtn.classList.add('playing');
    playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        <span>Pause</span>
    `;
    speak(currentIndex);
}

function stopPlayback() {
    isPlaying = false;
    playBtn.classList.remove('playing');
    playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
        <span>Play Audio</span>
    `;
    speechSynthesis.cancel();
    currentText.textContent = 'Playback stopped';
    document.querySelectorAll('.verse').forEach(el => {
        el.style.backgroundColor = 'rgba(139, 90, 43, 0.1)';
        el.style.borderLeftColor = '#8b6914';
    });
}

speedRange.addEventListener('input', function() {
    speedValue.textContent = this.value + 'x';
    if (currentUtterance) {
        currentUtterance.rate = parseFloat(this.value);
    }
});

window.addEventListener('load', initVerses);

speechSynthesis.onvoiceschanged = function() {
    initVerses();
};