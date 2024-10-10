const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    const bmi = (weight / (height * height)).toFixed(2);

    if (!isNaN(bmi)) {
        const value = document.getElementById('value');
        let description = '';

        value.classList.add('attention');
        document.getElementById('infos').classList.remove('hidden');

        if (bmi < 18.5) {
            description = 'Cuidado! Você está abaixo do peso!';
        } else if (bmi >= 18.5 && bmi <= 25) {
            description = "Você está no peso ideal!";
            value.classList.remove('attention');
            value.classList.add('normal');
        } else if (bmi > 25 && bmi <= 30) {
            description = "Cuidado! Você está com sobrepeso!";
        } else if (bmi > 30 && bmi <= 35) {
            description = "Cuidado! Você está com obesidade moderada!";
        } else if (bmi > 35 && bmi <= 40) {
            description = "Cuidado! Você está com obesidade severa!";
        } else {
            description = "Cuidado! Você está com obesidade mórbida!";
        }

        value.textContent = bmi.replace('.', ',');
        document.getElementById('description').textContent = description;

        // Sintetizar voz
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Seu IMC é ${bmi.replace('.', ',')}. ${description}`;
            const voices = speechSynthesis.getVoices();
            // Selecione a primeira voz disponível
            utterance.voice = voices[4]; // Ajuste o índice se necessário
            utterance.rate = 1; // Velocidade da fala
            utterance.pitch = 1; // Tom da fala
            utterance.volume = 1; // Volume da fala

            speechSynthesis.speak(utterance);
        } else {
            alert('Seu navegador não suporta a funcionalidade de síntese de voz.');
        }
    }
});

// Removido para evitar erro, o evento 'keypress' deve ser corrigido.
form.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Corrigido para 'Enter'
        document.getElementById('calculate').click();
    }
});

// Service Worker
const CACHE_NAME = 'nome-do-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/logo.png'
];

// Instala o Service Worker e adiciona recursos ao cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Recursos em cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Responde a requisições de rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Retorna do cache
                }
                return fetch(event.request); // Faz a requisição de rede se não tiver no cache
            })
    );
});
