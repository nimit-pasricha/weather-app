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

export { searchForLocation };
