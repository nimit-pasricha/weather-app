import { processCurrentWeatherData, processForecastData } from "./weather-api";

function searchForLocation() {
  const locationSearch = document.querySelector("input#location-search");
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await processCurrentWeatherData(locationSearch.value);
    await processForecastData(locationSearch.value);
  });
}

async function getWeatherIcon(location) {
  const response = await processCurrentWeatherData(location);
  const icon = response.icon;
  console.log(icon);
}

export { searchForLocation, getWeatherIcon };
