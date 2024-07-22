const form = document.querySelector('form');
const cityInput = document.querySelector(".cityInput");
const outputData = document.getElementById("outputData");
const API = "078092d86e224e14a642a355262f0195";



form.addEventListener('submit', async event =>  {
    event.preventDefault();
    const city = cityInput.value;
    
    if(city){
        try{
            const WeatherData = await getWeatherData(city);
            const forecastData = await getForecastData(city);
            displayWeatherInfo(weatherData);
            displayForecastInfo(forecastData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a City");
    }
})





async function getWeatherData() {

}





async function getForecastData(){

}





function displayWeatherInfo(){

}





function displayForecastInfo() {

}





function getWeatherEmoji() {

}



function displayError() {
    
}