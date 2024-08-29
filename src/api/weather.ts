export const GET = async (props) => {
    const { city = "London" } = props;

    try {
        // Get coordinates for the city using Nominatim API
        const locationResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
        );

        if (!locationResponse.ok) {
            throw { message: "Error fetching location data", status: locationResponse.status };
        }

        const locationData = await locationResponse.json();

        if (!locationData.length) {
            throw { message: "City not found", status: 404 };
        }

        const { lat, lon } = locationData[0];

        // Fetch weather data using Open-Meteo API
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        if (!weatherResponse.ok) {
            throw { message: "Error fetching weather data", status: weatherResponse.status };
        }

        const weatherData = await weatherResponse.json();
        return {
            city: city,
            temperature: weatherData.current_weather.temperature,
            weather_state: weatherData.current_weather.weathercode,
            wind_speed: weatherData.current_weather.windspeed,
        };
    } catch (error) {
        throw { message: error.message || "Network error", status: 500 };
    }
};
