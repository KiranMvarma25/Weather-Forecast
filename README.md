# Weather-Forecast

Developed by M.Kiran Varma

Note : "MOST IMPORANT THING IS WHILE WORKING WITH TAILWIND CSS, TO GO WITH MOBILE FIRST APPROACH"

To create weather forecast application, these were the

key points :

1. Created a form with input and a button.

2. Created a sample output data which to be displayed by using css and set it to be display none.

3. A correct API with key, select what you want like by searching with city name or zip Code or with any info.

4. Created an eventlistner, used preventdefault it will not throw away the data, it will display the data there itself.

5. Used async function will not lead to any confusion, so I had used it.

6. Created some functions we needed for the project and name according to it.

7. Written an initial condition to fetch the api; 
  ->  if correct city name is entered goes into try block and fetches the data or if there is any problem with api it goes into catch and INVOKES the displayError FUNCTION.
  -> else, if correct city name is not entered it will print an error message.

8. In try block;
    Created an getWeatherData function -> for fetching data from api along with the help of key by city name.

    "WE NEED TO FETCH DATA AND TO SEE THE NAMES FROM OBJECTS, BECAUSE THEY WERE THE IMPORTANT ONE'S IN FETCHING". 

    Assigned this function to a variable and passed it as an argument to another function by name 
    displayWeatherInfo -> to display the data to the USER with a good UI.

9. In displayWeatherInfo;
    Initially created a variable name as an object assigned it to an argument and we need only some data that fetched from API.

10. Seperate function is created for display an emoji to show how the weather was with the help of Id from API.

11. Created an drop down (for seeing history data we entered) and got updated the drop down with the help of Local storage.

12. If clicked on the city name on drop down, data will be changed according to the value clicked.

13. Added suitable and appropriate errors such as Empty Search and Invalid City Name.

14. Added 5 Day Forecast Weather report with the help of forecast api and it's key, used a loop.

15. By default Forecast Api provides data upto 5 days, as they mentioned "You can search weather forecast for 5 days with data every 3 hours by 
     geographic coordinates. All weather data can be obtained in JSON and XML formats."

16. We need to set the condition according to it.

17. Added styles to the Forecast Data.

18. By using some in-build functions, created the option of search by current location.

19. Made adjustments according to different screen sizes.

20. Styled all parts.

21. Created an Sample display, shows some city names.