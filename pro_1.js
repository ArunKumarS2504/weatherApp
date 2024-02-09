// //  const url = `http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=5&appid=403a86602bf5702b368be28d0606ce0f`
// // //api key= `403a86602bf5702b368be28d0606ce0f`
// // `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

//http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=r&maxRows=10&username=arun&country=IN

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector(".city-input");
    const SButton = document.querySelector("#searchButton");
    const locationDisplay = document.querySelector(".burdwan-Eay"); 
    const temperatureDisplay = document.querySelector(".c-SqT"); 
    const dateDisplay = document.querySelector(".aug-23-tue-SBF"); 
    
    const humidityDisplay = document.querySelector(".item-99-y8Z");
    const windSpeedDisplay = document.querySelector(".mph-9DP");
    const airPressureDisplay = document.querySelector(".hpa-Lmj");
    const visibilityDisplay = document.querySelector(".km-YL5");
    const hourlyForecast= document.querySelector("#auto-group-jrht-ceh");
    const API_KEY = "12ee85252afe4e4d9dfc93b6f7265924";

    const formatDate = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const getWeatherDetails = (cityName, lat, lon) => {
        const WEATHER_API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`;
        fetch(WEATHER_API)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const weatherData = data.data[0];
                    locationDisplay.textContent = cityName; 
                    temperatureDisplay.textContent = `${weatherData.temp}°C`;
                    dateDisplay.textContent = formatDate(new Date());
                    humidityDisplay.textContent = `${weatherData.rh}%`;
                    windSpeedDisplay.textContent = `${weatherData.wind_spd} m/s`;
                    airPressureDisplay.textContent = ` ${weatherData.pres} hPa`;
                    visibilityDisplay.textContent = `${weatherData.vis} km`;
                } else {
                    throw new Error('No weather data found');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("An error occurred while fetching the weather forecast. Please check the console for more details.");
            });
    };

    const getCityCoordinates = () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;

       
        getWeatherDetails(cityName, 35.7796, -78.6382);
    };

    SButton.addEventListener("click", getCityCoordinates);
});



//------------------*********************---------------------------------------




// document.addEventListener('DOMContentLoaded', () => {
//     const cityInput = document.querySelector(".city-input");
//     const SButton = document.querySelector("#searchButton");
//     const locationDisplay = document.querySelector(".burdwan-Eay");
//     const temperatureDisplay = document.querySelector(".c-SqT");
//     const dateDisplay = document.querySelector(".aug-23-tue-SBF");
//     const humidityDisplay = document.querySelector(".item-99-y8Z");
//     const windSpeedDisplay = document.querySelector(".mph-9DP");
//     const airPressureDisplay = document.querySelector(".hpa-Lmj");
//     const visibilityDisplay = document.querySelector(".km-YL5");
//     const hourlyForecastContainer = document.querySelector("#auto-group-jrht-ceh"); // Assuming this is your hourly forecast container
//     const API_KEY = "12ee85252afe4e4d9dfc93b6f7265924";

//     const formatDate = (date) => {
//         const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(date).toLocaleDateString('en-US', options);
//     };

//     const getWeatherDetails = (cityName, lat, lon) => {
//         const CURRENT_WEATHER_API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`;
//         fetch(CURRENT_WEATHER_API)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data && data.data && data.data.length > 0) {
//                     const weatherData = data.data[0];
//                     locationDisplay.textContent = cityName; // Update with searched city name
//                     temperatureDisplay.textContent = `${weatherData.temp}°C`;
//                     dateDisplay.textContent = formatDate(new Date()); // Using current date as fallback
//                     humidityDisplay.textContent = `${weatherData.rh}%`;
//                     windSpeedDisplay.textContent = `${weatherData.wind_spd} m/s`;
//                     airPressureDisplay.textContent = `${weatherData.pres} hPa`;
//                     visibilityDisplay.textContent = `${weatherData.vis} km`;
//                 } else {
//                     throw new Error('No weather data found');
//                 }
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert("An error occurred while fetching the weather forecast. Please check the console for more details.");
//             });
//     };

//     const getHourlyForecast = (cityName) => {
//         const HOURLY_FORECAST_API = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${cityName}&key=${API_KEY}&hours=48`;
//         fetch(HOURLY_FORECAST_API)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 hourlyForecastContainer.innerHTML = ''; // Clear previous forecasts
//                 data.data.forEach((forecast, index) => {
//                     if (index % 2 === 0) { // Displaying data for every 2 hours
//                         const time = new Date(forecast.timestamp_local).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
//                         const forecastDiv = document.createElement('div');
//                         forecastDiv.textContent = `${time}: ${forecast.temp}°C`;
//                         hourlyForecastContainer.appendChild(forecastDiv);
//                     }
//                 });
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert("An error occurred while fetching the hourly forecast. Please check the console for more details.");
//             });
//     };

//     const getCityCoordinatesAndWeather = (cityName) => {
//         // Placeholder for latitude and longitude retrieval; adjust as necessary
//         const lat = 35.7796; // Example latitude; replace with actual logic to fetch lat/lon based on city name
//         const lon = -78.6382; // Example longitude
//         getWeatherDetails(cityName, lat, lon);
//         getHourlyForecast(cityName);
//     };

//     SButton.addEventListener("click", () => getCityCoordinatesAndWeather(cityInput.value.trim()));
// });


//----------------------------************************-------------------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//     const cityInput = document.querySelector(".city-input");
//     const SButton = document.querySelector("#searchButton");
//     const locationDisplay = document.querySelector(".burdwan-Eay");
//     const temperatureDisplay = document.querySelector(".c-SqT");
//     const dateDisplay = document.querySelector(".aug-23-tue-SBF");
//     const humidityDisplay = document.querySelector(".item-99-y8Z");
//     const windSpeedDisplay = document.querySelector(".mph-9DP");
//     const airPressureDisplay = document.querySelector(".hpa-Lmj");
//     const visibilityDisplay = document.querySelector(".km-YL5");
//     const hourlyForecastContainer = document.querySelector("#auto-group-jrht-ceh"); // Assuming this is your hourly forecast container
//     const API_KEY = "12ee85252afe4e4d9dfc93b6f7265924";

//     const formatDate = (date) => {
//         const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(date).toLocaleDateString('en-US', options);
//     };

//     const getWeatherDetails = (cityName, lat, lon) => {
//         const CURRENT_WEATHER_API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`;
//         fetch(CURRENT_WEATHER_API)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data && data.data && data.data.length > 0) {
//                     const weatherData = data.data[0];
//                     locationDisplay.textContent = cityName; // Update with searched city name
//                     temperatureDisplay.textContent = `${weatherData.temp}°C`;
//                     dateDisplay.textContent = formatDate(new Date()); // Using current date as fallback
//                     humidityDisplay.textContent = `${weatherData.rh}%`;
//                     windSpeedDisplay.textContent = `${weatherData.wind_spd} m/s`;
//                     airPressureDisplay.textContent = `${weatherData.pres} hPa`;
//                     visibilityDisplay.textContent = `${weatherData.vis} km`;
//                 } else {
//                     throw new Error('No weather data found');
//                 }
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert("An error occurred while fetching the weather forecast. Please check the console for more details.");
//             });
//     };

//     const getHourlyForecast = (cityName) => {
//         const HOURLY_FORECAST_API = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${cityName}&key=${API_KEY}&hours=48`;
//         fetch(HOURLY_FORECAST_API)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 hourlyForecastContainer.innerHTML ="a"; // Clear previous forecasts
//                 data.data.forEach((forecast, index) => {
//                     if (index % 2 === 0) { // Displaying data for every 2 hours
//                         const time = new Date(forecast.timestamp_local).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
//                         const forecastDiv = document.createElement('div');
//                         forecastDiv.textContent = `${time}: ${forecast.temp}°C`;
//                         hourlyForecastContainer.appendChild(forecastDiv);
//                     }
//                 });
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert("An error occurred while fetching the hourly forecast. Please check the console for more details.");
//             });
//     };

//     const getCityCoordinatesAndWeather = (cityName) => {
//         getWeatherDetails(cityName, lat,lon); // Directly using placeholder coordinates for simplicity
//         getHourlyForecast(cityName);
//     };

//     SButton.addEventListener("click", () => getCityCoordinatesAndWeather(cityInput.value.trim()));
// });

