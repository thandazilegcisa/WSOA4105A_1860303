const button = document.querySelector('button');

button.addEventListener('mousedown', event => {
    button.textContent = `Click count: ${event.detail}`;
});