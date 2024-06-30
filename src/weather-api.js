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

async function processCurrentWeatherDataCelsius(location) {
  const allWeatherData = await fetchCurrentWeather(location);
  const currentWeatherDataCelsius = filterNeededCelsiusData(allWeatherData);
  return currentWeatherDataCelsius;
}

async function processCurrentWeatherDataFahrenheit(location) {
  const allWeatherData = await fetchCurrentWeather(location);
  const currentWeatherDataFahrenheit =
    filterNeededFahrenheitData(allWeatherData);
  return currentWeatherDataFahrenheit;
}

function filterNeededCelsiusData(allWeatherData) {
  return {
    name: allWeatherData.location.name,
    condition: allWeatherData.current.condition.text,
    temperature: `${allWeatherData.current.temp_c}°C`,
    feelsLike: `${allWeatherData.current.feelslike_c}°C`,
    wind: `${allWeatherData.current.wind_kph} kph`,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: `${allWeatherData.current.precip_mm} mm`,
  };
}

function filterNeededFahrenheitData(allWeatherData) {
  return {
    name: allWeatherData.location.name,
    condition: allWeatherData.current.condition.text,
    temperature: `${allWeatherData.current.temp_f}°F`,
    feelsLike: `${allWeatherData.current.feelslike_f}°F`,
    wind: `${allWeatherData.current.wind_mph} mph`,
    humidity: allWeatherData.current.humidity,
    uv: allWeatherData.current.uv,
    precip: `${allWeatherData.current.precip_in} in`,
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
  return threeDayForecastFahrenheit;
}

function filterDayForecastCelsius(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: `${forecastDay.day.avgtemp_c}°C`,
    maxTemp: `${forecastDay.day.maxtemp_c}°C`,
    minTemp: `${forecastDay.day.mintemp_c}°C`,
  };
}

function filterDayForecastFahrenheit(dayIndex, allForecastData) {
  const forecastDay = allForecastData.forecast.forecastday[dayIndex];
  return {
    condition: forecastDay.day.condition.text,
    date: forecastDay.date,
    avgTemp: `${forecastDay.day.avgtemp_f}°F`,
    maxTemp: `${forecastDay.day.maxtemp_f}°F`,
    minTemp: `${forecastDay.day.mintemp_f}°F`,
  };
}

export {
  processCurrentWeatherDataCelsius,
  processCurrentWeatherDataFahrenheit,
  processForecastDataFahrenheit,
  processForecastDataCelsius,
};
