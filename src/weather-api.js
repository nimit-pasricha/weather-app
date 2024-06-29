// CURRENT WEATHER

async function fetchCurrentWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ecfed383b46d4625a7131757242806&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

async function processCurrentWeatherData(location) {
  const allWeatherData = await fetchCurrentWeather(location);
  const locationData = getLocationInformation(allWeatherData);
  const currentWeatherDataCelsius = getCurrentWeatherCelsius(allWeatherData);
  const currentWeatherDataFahrenheit =
    getCurrentWeatherFahrenheit(allWeatherData);

  console.log(locationData);
  console.log(currentWeatherDataCelsius);
  console.log(currentWeatherDataFahrenheit);
}

function getLocationInformation(allWeatherData) {
  return {
    name: allWeatherData.location.name,
  };
}

function getCurrentWeatherCelsius(allWeatherData) {
  return {
    condition: allWeatherData.current.condition.text,
    icon: allWeatherData.current.condition.icon,
    temperature: allWeatherData.current.temp_c,
    feelsLike: allWeatherData.current.feelslike_c,
    wind: allWeatherData.current.wind_kph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: allWeatherData.current.precip_mm,
  };
}

function getCurrentWeatherFahrenheit(allWeatherData) {
  return {
    condition: allWeatherData.current.condition.text,
    icon: allWeatherData.current.condition.icon,
    temperature: allWeatherData.current.temp_f,
    feelsLike: allWeatherData.current.feelslike_f,
    wind: allWeatherData.current.wind_mph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: allWeatherData.current.precip_mm,
  };
}

// FORECAST WEATHER

async function fetchForecast(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ecfed383b46d4625a7131757242806&q=${location}&days=3&aqi=no&alerts=yes`,
    { mode: "cors" }
  );
  const forcastData = await response.json();
  return forcastData;
}

async function processForecastData(location) {
  const allForecastData = await fetchForecast(location);
  const numberOfDaysForecast = 3;

  const threeDayForecastCelsius = [];
  for (let i = 0; i < numberOfDaysForecast; i++) {
    threeDayForecastCelsius.push(getOneDayForecastCelsius(i, allForecastData));
  }
  console.log(threeDayForecastCelsius);
  const threeDayForecastFahrenheit = [];
  for (let i = 0; i < numberOfDaysForecast; i++) {
    threeDayForecastFahrenheit.push(
      getOneDayForecastFahrenheit(i, allForecastData)
    );
  }
  console.log(threeDayForecastFahrenheit);
}

function getOneDayForecastCelsius(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: forecastDay.day.avgtemp_c,
    maxTemp: forecastDay.day.maxtemp_c,
    minTemp: forecastDay.day.mintemp_c,
  };
}

function getOneDayForecastFahrenheit(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: forecastDay.day.avgtemp_f,
    maxTemp: forecastDay.day.maxtemp_f,
    minTemp: forecastDay.day.mintemp_f,
  };
}

export { processCurrentWeatherData, processForecastData };
