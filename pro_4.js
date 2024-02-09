
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector(".city-input");
    const SButton = document.querySelector("#searchButton");
    const locationDisplay = document.querySelector(".burdwan-Eay");
    const suggestionsList = document.querySelector(".suggestions"); 
    const temperatureDisplay = document.querySelector(".c-SqT"); 
    const dateDisplay = document.querySelector(".aug-23-tue-SBF");   
    const humidityDisplay = document.querySelector(".item-99-y8Z");
    const windSpeedDisplay = document.querySelector(".mph-9DP");
    const apiKey = "b09b2f9027cc4252810a420aa10ba8d5";
    const username = "arun";

    const formatDate = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    
    cityInput.addEventListener("input", () => {
        const inputVal = cityInput.value.trim();
        if (!inputVal) {
            suggestionsList.innerHTML = '';
            return;
        }
        const suggestionUrl = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${inputVal}&maxRows=10&username=${username}&country=IN`;

        fetch(suggestionUrl)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = ''; 
                const postalCodes = data.postalCodes;

                postalCodes.forEach((item) => {
                    const option = document.createElement('li');
                    option.textContent = `${item.placeName}, ${item.adminName1}, ${item.countryCode}`;
                    option.addEventListener('click', () => {
                        cityInput.value = item.placeName; 
                        getCityCoordinates(item.placeName); 
                        suggestionsList.innerHTML = ''; 
                    });
                    suggestionsList.appendChild(option);
                });
            })
            .catch(() => {
                console.error("Error fetching suggestions");
                suggestionsList.innerHTML = '';
            });
    });

    SButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;
        getCityCoordinates(cityName);
        suggestionsList.innerHTML = ''; 
    });

    const getCityCoordinates = (cityName,lat, lng , username) => {
        
        const CityName_url = `http://api.geonames.org/countrySubdivisionJSON?lat=${lat}&lng=${lng}&username=${username}`;

        fetch(CityName_url)
            .then(res => res.json())
            .then(data => {
               
                if(data && data.adminCode1) {
                    const { lat, lng } = data;
                    getWeatherData( cityName ,lat, lng);
                } else {
                    alert("City not found ");
                }
            }).catch((error) => {
                console.error("Error fetching coordinates:", error);
                alert("An error occurred while fetching coordinates");
            });
    };

    

    const getWeatherData = (cityName, lat, lng) => {
       
        const Weather_url = `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lng}&username=${username}`;
        fetch(Weather_url)
            .then(response => response.json())
            .then(data => {
                if(data && data.weatherObservation) {
                    const weatherObservation = data.weatherObservation;
                    locationDisplay.textContent = weatherObservation.stationName || cityName; 
                    temperatureDisplay.textContent = `${weatherObservation.temperature}°C`;
                    dateDisplay.textContent = formatDate(new Date()); // Display current date
                    humidityDisplay.textContent = `${weatherObservation.humidity}%`;
                    windSpeedDisplay.textContent = `${weatherObservation.windSpeed} KT`;
                } else {
                    alert("Weather data not found");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("An error occurred while fetching weather data");
            });
    };
});
