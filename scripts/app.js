import Alpine from 'alpinejs';

window.Alpine = Alpine;

// State Manajemen Global ArCubo
Alpine.data('arcuboApp', () => ({
    currentMode: 'mindar', // 'mindar' atau 'alvaar'
    selectedPlanet: 'bumi',
    planets: [],
    loading: true,

    async init() {
        try {
            const res = await fetch('/data/planets.json');
            const data = await res.json();
            this.planets = Object.values(data);
            this.loading = false;
        } catch (e) {
            console.error("Gagal memuat data planet:", e);
        }
    },

    setMode(mode) {
        this.currentMode = mode;
    }
}));

// State Kuis dengan Alpine.js
Alpine.data('quizApp', () => ({
    currentQuestion: 0,
    score: 0,
    answers: [],

    submitAnswer(idx, isCorrect) {
        if (isCorrect) this.score += 10;
        this.currentQuestion++;
    }
}));

Alpine.start();
