// Worked on this project nearly for 10 days, also created another weather app(weather for that day), not a forecast one.
// Practiced on async functions.
// Revised tailwind CSS and GIT.
// Worked on this fetch and on api.
// Also Open Weather described about these.

// Tried and succeed by running this code to know the exact names and things fetched by API.

// const cityName = "New York";

// const API = "078092d86e224e14a642a355262f0195";


// const url = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`)
//             .then(response => response.json().then(result => console.log(result)));


//          -->>>>  OUTPUT --<<<<

//             {
//                 coord: { lon: -74.006, lat: 40.7143 },
//                 weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' } ], 
//                 base: 'stations',
//                 main: {
//                   temp: 295.7,
//                   feels_like: 296.18,
//                   temp_min: 293.46,
//                   temp_max: 296.64,
//                   pressure: 1018,
//                   humidity: 83,
//                   sea_level: 1018,
//                   grnd_level: 1018
//                 },
//                 visibility: 10000,
//                 wind: { speed: 1.54, deg: 210 },
//                 clouds: { all: 0 },
//                 dt: 1721646874,
//                 sys: {
//                   type: 1,
//                   id: 4610,
//                   country: 'US',
//                   sunrise: 1721641426,
//                   sunset: 1721694052
//                 },
//                 timezone: -14400,
//                 id: 5128581,
//                 name: 'New York',
//                 cod: 200
//               }


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


const form = document.querySelector('form');
const cityInput = document.querySelector(".cityInput");
const outputData = document.getElementById("outputData");
const API = "078092d86e224e14a642a355262f0195";



form.addEventListener('submit', async event =>  {
    event.preventDefault();                                          // Displays the output, if we not use this, data will be displayed only for a 0.01sec.
    const city = cityInput.value;
    
    if(city){
        try{
            const weatherData = await getWeatherData(city);          // City has been taken here and passed to a variable.
            displayWeatherInfo(weatherData);                         // That variable has been passed to displayWeatherInfo function.
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a City");                         // If city name was not entered, invokes the displayError function.
    }
});





async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;   // City passed an argument to this function, city and key is paased into this url and it fetches all the data.
    const response = await fetch(apiUrl);
    if (!response.ok) {                                                                 // If there is any problem with the url if prints the below statement.
        throw new Error("Could not fetch weather data");
    }
    return await response.json();                                                       // Else fetches the data.
}





async function getForecastData(){

}





function displayWeatherInfo(data){                // weatherData or data has all the data fetched form url, we don't need all the data.
    console.log(data);
                                                  // So we had created an object type Variable.
    const { name: city,                           // We need to get the correct object names first of all by fetching the data and to observe the names of the object for Example {city:New York}.
        main: { temp, humidity },                 
        weather: [{ description, id }] } = data;
    
    outputData.textContent = '';
    outputData.classList.add('displayOutputData');

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature : ${(temp - 273.15).toFixed(2)}°C`;   // Temp is fetched in Kelvin this is the formula to convert it into Celsius and ° is created by using alt + 0176 and toFixed is used to get upto 2 decimal points.
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);         // Here getWeatherEmoji function is invoked to display emoji.

    cityDisplay.classList.add('para');
    tempDisplay.classList.add('para');
    humidityDisplay.classList.add('para');
    descDisplay.classList.add('para');
    weatherEmoji.classList.add('para');

    outputData.appendChild(cityDisplay);
    outputData.appendChild(tempDisplay);
    outputData.appendChild(humidityDisplay);
    outputData.appendChild(descDisplay);
    outputData.appendChild(weatherEmoji);    
}





function displayForecastInfo() {

}





function getWeatherEmoji(weatherId) {                  // Press window + ; to get emoji's.
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):    // According to the Id which is fetched from api, displaying the emoji according to the current weather condition and I had know about these ranges from Open WEather free API provider.
            return '⚡';
        case (weatherId >= 300 && weatherId < 400):
            return '🌦️';
        case (weatherId >= 500 && weatherId < 600):
            return '🌨️';
        case (weatherId >= 600 && weatherId < 700):
            return '❄️';
        case (weatherId >= 700 && weatherId < 800):
            return '🌁';
        case (weatherId == 800):
            return '☀️';
        case (weatherId >= 801 && weatherId < 810):
            return '🌤️';
        default:
            return "❔";
    }
}



function displayError(message) {                            // Invokes the function, if correct city name is not entered or empty spaced is entered
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML=message;
    
    outputData.textContent = '';
    outputData.classList.add('displayOutputData');
    outputData.appendChild(errorMessage);
}