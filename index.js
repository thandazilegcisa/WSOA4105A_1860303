const button = document.querySelector('button');

button.addEventListener('onmousedown', event => {
    button.textContent = `Click count: ${event.detail}`;
});