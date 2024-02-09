document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector(".city-input");
    const searchButton = document.querySelector("#searchButton");
    const locationDisplay = document.querySelector(".burdwan-Eay");
    const locationIcon = document.querySelector(".icon-location-xms");
    const suggestionsList = document.querySelector(".suggestions");
    const temperatureDisplay = document.querySelector(".c-SqT");
    const dateDisplay = document.querySelector(".aug-23-tue-SBF");
    const humidityDisplay = document.querySelector(".item-99-y8Z");
    const windSpeedDisplay = document.querySelector(".mph-9DP");
    const visibilityDisplay = document.querySelector(".km-YL5");
    const airPressureDisplay = document.querySelector(".hpa-Lmj");
    const username = "arun"; 

    const updateTime = () => {
        const timeDisplay = document.querySelector(".pm-Fho");
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = ((hours + 11) % 12 + 1); 
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; 
        timeDisplay.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    
    updateTime();
    setInterval(updateTime, 60000);

    cityInput.addEventListener("input", () => {
        const inputVal = cityInput.value.trim();
        suggestionsList.style.display = 'block'; 
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
                   
                    option.setAttribute('data-lat', item.lat);
                    option.setAttribute('data-lng', item.lng);
                    option.setAttribute('data-placeName', item.placeName);
                    suggestionsList.appendChild(option);
                });
            })
            .catch(() => {
                console.error("Error fetching suggestions");
                suggestionsList.innerHTML = '';
            });
    });

    
    suggestionsList.addEventListener('click', function(event) {
        if (event.target && event.target.tagName === 'LI') {
            const lat = event.target.getAttribute('data-lat');
            const lng = event.target.getAttribute('data-lng');
            const placeName = event.target.getAttribute('data-placeName');

            cityInput.value = placeName; 
            getWeatherData(lat, lng, placeName);

            suggestionsList.innerHTML = ''; 
            suggestionsList.style.display = 'none'; 
        }
    });

    searchButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;
        suggestionsList.innerHTML = ''; 
        suggestionsList.style.display = 'none'; 
        
    });

    const getWeatherData = (lat, lng, cityName) => {
        const api_key = "12ee85252afe4e4d9dfc93b6f7265924"; 
        const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${api_key}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.data && data.data.length > 0) {
                    const weatherData = data.data[0]; 
                    updateWeatherUI(weatherData, cityName);
                } else {
                    alert("Weather data not found.");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("An error occurred while fetching weather data");
            });
    };

    const updateWeatherUI = (weatherData, cityName) => {
        locationDisplay.textContent = cityName || weatherData.city_name;
        temperatureDisplay.textContent = `${weatherData.temp}°C`;
        humidityDisplay.textContent = `${weatherData.rh}%`;
        windSpeedDisplay.textContent = `${weatherData.wind_spd} m/s`;
        airPressureDisplay.textContent = `${weatherData.pres} hPa`;
        visibilityDisplay.textContent = `${weatherData.vis} km`;

        
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
});
