// CURRENT WEATHER

async function fetchCurrentWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ecfed383b46d4625a7131757242806&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return weatherData;
}

async function processCurrentWeatherDataCelsius() {
  const allWeatherData = await fetchCurrentWeather(location);
  const currentWeatherDataCelsius = filterNeededCelsiusData(allWeatherData);
  console.log(currentWeatherDataCelsius);
  return currentWeatherDataCelsius;
}

async function processCurrentWeatherDataFahrenheit() {
  const allWeatherData = await fetchCurrentWeather(location);
  const currentWeatherDataFahrenheit =
    filterNeededFahrenheitData(allWeatherData);
  console.log(currentWeatherDataFahrenheit);
  return currentWeatherDataFahrenheit;
}

function filterNeededCelsiusData(allWeatherData) {
  return {
    condition: allWeatherData.current.condition.text,
    temperature: allWeatherData.current.temp_c,
    feelsLike: allWeatherData.current.feelslike_c,
    wind: allWeatherData.current.wind_kph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: allWeatherData.current.precip_mm,
  };
}

function filterNeededFahrenheitData(allWeatherData) {
  return {
    condition: allWeatherData.current.condition.text,
    temperature: allWeatherData.current.temp_f,
    feelsLike: allWeatherData.current.feelslike_f,
    wind: allWeatherData.current.wind_mph,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: allWeatherData.current.precip_in,
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

async function processForecastDataCelsius(location) {
  const allForecastData = await fetchForecast(location);
  const numberOfDaysForecast = 3;

  const threeDayForecastCelsius = [];
  for (let i = 0; i < numberOfDaysForecast; i++) {
    threeDayForecastCelsius.push(filterDayForecastCelsius(i, allForecastData));
  }
  console.log(threeDayForecastCelsius);
  return threeDayForecastCelsius;
}

async function processForecastDataFahrenheit(location) {
  const allForecastData = await fetchForecast(location);
  const numberOfDaysForecast = 3;

  const threeDayForecastFahrenheit = [];
  for (let i = 0; i < numberOfDaysForecast; i++) {
    threeDayForecastFahrenheit.push(
      filterDayForecastFahrenheit(i, allForecastData)
    );
  }
  console.log(threeDayForecastFahrenheit);
  return threeDayForecastFahrenheit;
}

function filterDayForecastCelsius(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: forecastDay.day.avgtemp_c,
    maxTemp: forecastDay.day.maxtemp_c,
    minTemp: forecastDay.day.mintemp_c,
  };
}

function filterDayForecastFahrenheit(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: forecastDay.day.avgtemp_f,
    maxTemp: forecastDay.day.maxtemp_f,
    minTemp: forecastDay.day.mintemp_f,
  };
}

export {
  processCurrentWeatherDataCelsius,
  processCurrentWeatherDataFahrenheit,
  processForecastDataFahrenheit,
  processForecastDataCelsius,
};
