async function getCurrentWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ecfed383b46d4625a7131757242806&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return weatherData;
}

async function processCurrentWeatherData(location) {
  const allWeatherData = await getCurrentWeather(location);
  const locationData = {
    name: allWeatherData.location.name,
    country: allWeatherData.location.country,
    localTime: allWeatherData.location.localtime,
  };
  const currentWeatherDataCelsius = {
    condition: allWeatherData.current.condition.text,
    icon: allWeatherData.current.condition.icon,
    temperature: allWeatherData.current.temp_c,
    feelsLike: allWeatherData.current.feelslike_c,
    wind: allWeatherData.current.wind_kph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    isDay: allWeatherData.current.is_day,
  };

  const currentWeatherDataFahrenheit = {
    condition: allWeatherData.current.condition.text,
    icon: allWeatherData.current.condition.icon,
    temperature: allWeatherData.current.temp_f,
    feelsLike: allWeatherData.current.feelslike_f,
    wind: allWeatherData.current.wind_mph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    isDay: allWeatherData.current.is_day,
  };
  console.log(locationData);
  console.log(currentWeatherDataCelsius);
  console.log(currentWeatherDataFahrenheit);
}

async function getForcast(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ecfed383b46d4625a7131757242806&q=${location}&days=3&aqi=no&alerts=yes`,
    { mode: "cors" }
  );
  const forcastData = await response.json();
  console.log(forcastData);
  return forcastData;
}

export { processCurrentWeatherData, getForcast };
