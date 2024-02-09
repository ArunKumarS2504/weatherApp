document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector(".city-input");
    const searchButton = document.querySelector("#searchButton");
    const locationDisplay = document.querySelector(".burdwan-Eay");
    const suggestionsList = document.querySelector(".suggestions");
    const temperatureDisplay = document.querySelector(".c-SqT");
    const dateDisplay = document.querySelector(".aug-23-tue-SBF");
    const humidityDisplay = document.querySelector(".item-99-y8Z");
    const windSpeedDisplay = document.querySelector(".mph-9DP");
    const visibilityDisplay = document.querySelector(".km-YL5");
    const airPressureDisplay = document.querySelector(".hpa-Lmj");
    const username = "arun"; // Use your GeoNames API username

    cityInput.addEventListener("input", () => {
        const inputVal = cityInput.value.trim();
        suggestionsList.style.display = 'block'; // Ensure suggestions are visible for new inputs
        if (!inputVal) {
            suggestionsList.innerHTML = '';
            return;
        }
        const suggestionUrl = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${inputVal}&maxRows=10&username=${username}&country=IN`;

        fetch(suggestionUrl)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = ''; // Clear existing suggestions
                const postalCodes = data.postalCodes;
                postalCodes.forEach((item) => {
                    const option = document.createElement('li');
                    // Set text content for readability
                    option.textContent = `${item.placeName}, ${item.adminName1}, ${item.countryCode}`;
                    // Store data attributes for lat, lng, and placeName
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

    // Event delegation for click events on suggestion list items
    suggestionsList.addEventListener('click', function(event) {
        if (event.target && event.target.tagName === 'LI') {
            const lat = event.target.getAttribute('data-lat');
            const lng = event.target.getAttribute('data-lng');
            const placeName = event.target.getAttribute('data-placeName');

            cityInput.value = placeName; // Update input with selected city name
            getWeatherData(lat, lng, placeName); // Fetch and display weather data

            suggestionsList.innerHTML = ''; // Clear suggestions after selection
            suggestionsList.style.display = 'none'; // Hide suggestions list
        }
    });

    searchButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;
        suggestionsList.innerHTML = ''; // Clear suggestions
        suggestionsList.style.display = 'none'; // Hide suggestions list
        // Perform a new search based on the input value
        // This might involve additional logic to fetch lat, lng for the cityName, similar to the suggestion click logic
    });

    const getWeatherData = (lat, lng, cityName) => {
        const api_key = "12ee85252afe4e4d9dfc93b6f7265924"; // Use your actual Weatherbit API Key
        const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${api_key}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const weatherData = data.data[0]; // Use the first weather data entry
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

        // Update the date display
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
});
