async function getWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ecfed383b46d4625a7131757242806&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

export { getWeather };
