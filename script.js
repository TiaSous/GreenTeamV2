const mqtt = require('mqtt');

document.addEventListener('DOMContentLoaded', function() {
    const mainButton = document.getElementById('mainButton');

    mainButton.addEventListener('click', function() {
        console.log('Button clicked');
    });
});