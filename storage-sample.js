// const input = document.querySelector('input');
// const names = document.getElementById('dropdown');
// input.addEventListener('click', function() {
//     names.style.display = 'block';
// })

// const h3 = document.querySelector('h3');
// const button = document.querySelector('button');
// button.addEventListener('click', async function(event) {
//     event.preventDefault();
//     h3.innerHTML = 'USA';

// })



const inputValues = document.querySelector('input');
const parent = document.getElementById('parent');


document.querySelector('button').addEventListener('click',function (event) {
    event.preventDefault();

    let child = document.createElement('p');
    for(let i=1; i<10; i++){
        localStorage.setItem('City Name',inputValues.value);
        let value = localStorage.getItem('City Name');
        child.innerHTML = value;
    }
    parent.appendChild(child);
})