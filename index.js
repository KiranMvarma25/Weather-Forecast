// Worked on this project nearly for 10 days before starting this Main One, also created another weather app(weather for that day), not a forecast one.
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
// const API = "078092d86e224e14a642a355262f0195";
const parent = document.getElementById('parent');
const outputForecastData = document.getElementById('outputForecastData');


const currentLocationButton = document.getElementById('currentLocation');


//  Displays some City Names continuosly.
const displayCityNames = document.getElementById('displayCityNames');
displayCityNames.classList.add('displayCityNames');


setInterval(() => {
    displayCityNames.textContent="New York";
},1000);

setInterval(()=>{
    displayCityNames.textContent='Hyderabad';
},2000);


setInterval(()=>{
    displayCityNames.textContent='London';
},3000);


setInterval(()=>{
    displayCityNames.textContent='Sydney';
},4000);


setInterval(()=>{
    displayCityNames.textContent='Pennsylvania';
},5000);


setInterval(()=>{
    displayCityNames.textContent='Tokyo';
},6000);


setInterval(()=>{
    displayCityNames.textContent='Bengaluru';
},7000);


// simple is that writing the same code mostly for the current location functionality, change in url to get the data by lat and lon.

currentLocationButton.addEventListener('click', function(event) {       // To get data by current location, by using latitude and longitude is the Good one.
    event.preventDefault();
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocation);      // lat and lon coordinates will be send to the displayCurrentLocationData and it will be the data.
    }
    else{
        window.alert("Cannot Retrieve");
    }
})


function currentLocation(position) {

    const lat = position.coords.latitude;                               // storing coordinates in varaiable and passing it to another function to get the data.
    const lon = position.coords.longitude;
    
    displayCurrentLocationData(lat, lon);
}

async function displayCurrentLocationData(lat, lon) {
    //const apiKey = '078092d86e224e14a642a355262f0195';
    const apiKey = "da047c990502641398390859c447b121";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error("Could not fetch weather data");
        }
        const weatherData = await weatherResponse.json();
        displayWeatherInfo(weatherData);

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error("Could not fetch forecast data");
        }
        const forecastData = await forecastResponse.json();
        displayForecastInfo(forecastData);
    } catch (error) {
        console.log(error);
        displayError("Could not fetch weather data");
    }
}




form.addEventListener('submit', async event =>  {
    event.preventDefault();                                          // Displays the output, if we not use this, data will be displayed only for a 0.01sec.
    const city = cityInput.value;    
    
    if(city){
        try{
            const weatherData = await getWeatherData(city);          // City has been taken here and passed to a variable.
            displayWeatherInfo(weatherData);                         // That variable has been passed to displayWeatherInfo function.
            const forecastData = await getForecastData(city);4       // Fetching 5 day Forecast weather data.
            displayForecastInfo(forecastData);                       // Displaying 5 day Forecast weather data.
        }
        catch(error){
            console.log(error);
            displayError("Enter a Valid City Name...");
            if(!error)
                displayError(error);
        }
    }
    else{
        if(cityInput.value === ''){
            displayError("Enter a City Name...");                         // If city name was not entered, invokes the displayError function.
        }
    }


    let child = document.createElement('p');                          
    localStorage.setItem('City Name',cityInput.value);               // Localstorge is used to set the value with cityInput.value.
    let value = localStorage.getItem('City Name');                   // Getitem is used to extract the value from the localstorage of the browser.
    child.innerHTML = value;
    console.log(value);                                              // Can verify the entered city name in console.
    
    
    cityInput.value='';
    child.classList.add('childDropDown')
    parent.classList.add('parentDropDown');
    
    parent.appendChild(child);

    
    if(city != ''){                                              // If empty is entered dropdown is not created.
        dropdownData();                                         // City name invocation is coded here to display after the data is added, intially not to display the empty dropdown.          
    }

    useSearchedDropDownCity(child);                         // After the city names entered into the dropdown History, this function helps use us to have the access of searching the data there itself without being reentering the data.


});


function dropdownData() {                                   // Entered city name will be shown in dropdown for entering / clicking  each time.
    cityInput.addEventListener('click', function(event) {
        event.preventDefault();
    
        parent.classList.add('displayParent');
        
    })
}



function useSearchedDropDownCity(child) {                   // With this, if we click on the data from dropdown (history) it will go to the input field,cleared and it will shows the clicked data from dropdown history.
    child.addEventListener('click', async function(event) {
        event.preventDefault();

        const city = child.innerHTML;
        cityInput.value = city;

        try {                                               // We may or may not use this block, if we not use this block, functionality will be --> clicking on dropdown history data, sends the value to the input and clicking on button it will gives the weather data.
            const weatherData = await getWeatherData(city); // Simple trick is that we are using this functions again to get the output immediately. Like the previous point.
            displayWeatherInfo(weatherData);
            const forecastData = await getForecastData(city);
            displayForecastInfo(forecastData);
            cityInput.value='';
        } catch (error) {
            console.log(error);
            displayError("Enter a Valid City Name...");
        }

    })
}



async function getWeatherData(city) {
    //const API = "078092d86e224e14a642a355262f0195";
    const API = "da047c990502641398390859c447b121";
    //const API = "20cf6d47e6ca1eef15066909958f73f0";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;   // City passed an argument to this function, city and key is paased into this url and it fetches all the data.
    const response = await fetch(apiUrl);
    if (!response.ok) {                                                                 // If there is any problem with the url if prints the below statement.
        throw new Error("Could not fetch weather data");
    }
    return await response.json();                                                       // Else fetches the data.
}





async function getForecastData(city){
   
    const API = "da047c990502641398390859c447b121";
    //const API = "078092d86e224e14a642a355262f0195";                                            // Key of Url
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;    // Url of 5 day Forecast Data.
   
    const response = await fetch(apiUrl);
    if (!response.ok) {                                                                 // If there is any problem with the url if prints the below statement.
        throw new Error("Could not fetch weather data");
    }
    return await response.json();   
}





function displayWeatherInfo(data){                // weatherData or data has all the data fetched form url, we don't need all the data.
    console.log(data);
                                                  // So we had created an object type Variable.
    const { name: city,                           // We need to get the correct object names first of all by fetching the data and to observe the names of the object for Example {city:New York}.
        main: { temp, humidity },
        wind : { speed },                 
        weather: [{ description, id }] } = data;
    
    outputData.textContent = '';
    outputData.classList.add('displayOutputData');


    const date = new Date();                                // To display current date.
    const _date = date.getDate();
    const month = date.getMonth() + 1;                      // I had used + 1, bcoz it is showing last month.
    const year = date.getFullYear();
    
    // const dayMonthYearChild = document.createElement('p');
    // dayMonthYearChild.textContent = `${day}-${month}-${year}`;
    // outputData.classList.add('para');
    
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('h2');
    const humidityDisplay = document.createElement('h2');
    const windDisplay = document.createElement('h2');
    const descDisplay = document.createElement('h2');
    const weatherEmoji = document.createElement('h1');

    cityDisplay.textContent = `${city} (${_date}-${month}-${year})`;
    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;   // Temp is fetched in Kelvin this is the formula to convert it into Celsius and ° is created by using alt + 0176 and toFixed is used to get upto 2 decimal points.
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    windDisplay.textContent = `Wind: ${speed} M/s`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);         // Here getWeatherEmoji function is invoked to display emoji.

    cityDisplay.classList.add('para');
    tempDisplay.classList.add('para');
    humidityDisplay.classList.add('para');
    windDisplay.classList.add('para');
    descDisplay.classList.add('para');
    weatherEmoji.classList.add('para');
    

    outputData.appendChild(cityDisplay);
    outputData.appendChild(tempDisplay);
    outputData.appendChild(humidityDisplay);
    outputData.appendChild(windDisplay);
    outputData.appendChild(descDisplay);
    outputData.appendChild(weatherEmoji);    
}




function displayForecastInfo(data) {
    console.log(data);
    outputForecastData.textContent = '';          // Clear previous forecast data.

    const forecastList = data.list;  // Extracting the forecast list.
                                                        // Coorection is that i starts from 8, if not it prints current day weather data again.
// As the task is stating to display forecast of any time of that time.
// For every 3 hours it will update the data 8(present day) + 7 (21 hours of next day) = prints next day weather.
    for(let i = 8; i < forecastList.length; i += 7) {  // i+=8, bcoz data is provided for 3 hours, 24 hours per day divide we will get 8 hours.
        const forecast = forecastList[i];              // It increements for next day.             
        const date = new Date(forecast.dt_txt);        // dt = date and time.        

        const { main: { temp, humidity },                           // So we had created an object type Variable.
                wind: {speed},
                weather: [{ description, id }] } = forecast;        // We need to get the correct object names first of all by fetching the data and to observe the names of the object for Example {city:New York}.

        const forecastDaily = document.createElement('div');        // Creating parent for 5 day forecast child.
        forecastDaily.classList.add('forecastParent');

        const dateDisplay = document.createElement('p');
        const tempDisplay = document.createElement('p');
        const humidityDisplay = document.createElement('p');
        const windDisplay = document.createElement('p');
        const descDisplay = document.createElement('p');
        const weatherEmoji = document.createElement('h4');

        dateDisplay.textContent = date.toLocaleDateString();
        tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;   // Temp is fetched in Kelvin this is the formula to convert it into Celsius and ° is created by using alt + 0176 and toFixed is used to get upto 2 decimal points.
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        windDisplay.textContent = `Wind: ${speed} M/S`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);         // Here getWeatherEmoji function is invoked to display emoji.

        dateDisplay.classList.add('forecastPara');
        tempDisplay.classList.add('forecastPara');
        humidityDisplay.classList.add('forecastPara');
        windDisplay.classList.add('forecastPara');
        descDisplay.classList.add('forecastPara');
        weatherEmoji.classList.add('forecastPara');

        forecastDaily.appendChild(dateDisplay);
        forecastDaily.appendChild(tempDisplay);
        forecastDaily.appendChild(humidityDisplay);
        forecastDaily.appendChild(windDisplay);
        forecastDaily.appendChild(descDisplay);
        forecastDaily.appendChild(weatherEmoji);

        outputForecastData.appendChild(forecastDaily);

    }
    
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
