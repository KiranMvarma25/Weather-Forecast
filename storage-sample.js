const input = document.querySelector('input');
const names = document.getElementById('dropdown');
input.addEventListener('click', function() {
    names.style.display = 'block';
})

const h3 = document.querySelector('h3');
const button = document.querySelector('button');
button.addEventListener('click', async function(event) {
    event.preventDefault();
    h3.innerHTML = 'USA';

})