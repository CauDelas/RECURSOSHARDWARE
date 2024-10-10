// Lógica de cálculo do IMC e manipulação de DOM
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!isNaN(weight) && !isNaN(height) && height > 0) {
        const bmi = (weight / (height * height)).toFixed(2);
        const value = document.getElementById('value');
        const infos = document.getElementById('infos');
        let description = '';

        value.classList.remove('attention', 'normal');
        infos.classList.remove('hidden');

        if (bmi < 18.5) {
            description = 'Cuidado! Você está abaixo do peso!';
            value.classList.add('attention');
        } else if (bmi >= 18.5 && bmi <= 25) {
            description = "Você está no peso ideal!";
            value.classList.add('normal');
        } else if (bmi > 25 && bmi <= 30) {
            description = "Cuidado! Você está com sobrepeso!";
            value.classList.add('attention');
        } else if (bmi > 30 && bmi <= 35) {
            description = "Cuidado! Você está com obesidade moderada!";
            value.classList.add('attention');
        } else if (bmi > 35 && bmi <= 40) {
            description = "Cuidado! Você está com obesidade severa!";
            value.classList.add('attention');
        } else {
            description = "Cuidado! Você está com obesidade mórbida!";
            value.classList.add('attention');
        }

        value.textContent = bmi.replace('.', ',');
        document.getElementById('description').textContent = description;
    }
});

// Service Worker (registro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('ServiceWorker registrado com sucesso no escopo: ', registration.scope);
        }).catch(function(error) {
            console.log('Falha ao registrar o ServiceWorker: ', error);
        });
    });
}
