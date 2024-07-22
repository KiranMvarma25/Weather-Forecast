const head = document.querySelector('h1');

document.querySelector('button').addEventListener('click', function() {
    head.innerHTML = 'world';
})