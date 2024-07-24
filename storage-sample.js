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



// const inputValues = document.querySelector('input');
// const parent = document.getElementById('parent');


// document.querySelector('button').addEventListener('click',function (event) {
//     event.preventDefault();

//     let child = document.createElement('p');
//     for(let i=1; i<10; i++){
//         localStorage.setItem('City Name',inputValues.value);
//         let value = localStorage.getItem('City Name');
//         child.innerHTML = value;
//     }
//     inputValues.value='';
//     parent.appendChild(child);
//     parent.style.display = 'none';
//     parent.classList.add('parentDropDown');
// })

// inputValues.addEventListener('click', function(event) {
//     event.preventDefault();
//     parent.style.display = 'block';
// })



const cityName = "New York";

const API = "078092d86e224e14a642a355262f0195";


const url = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`)
             .then(response => response.json().then(result => console.log(result)));

console.log(url);



