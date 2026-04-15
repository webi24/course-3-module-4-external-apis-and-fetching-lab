// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Function 1: Fetch the data from the API

async function fetchWeatherAlerts(state) {
  if (!state) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = "Please enter a state abbreviation.";
    errorDiv.classList.remove("hidden");
    return;
  }

  fetch(`${weatherApi}${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather alerts data:", data);
      const errorDiv = document.getElementById("error-message");
      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");
      displayAlerts(data);
      document.getElementById("state-input").value = "";
    })
    .catch((error) => {
      console.log(error.message);
      const errorDiv = document.getElementById("error-message");
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    });
}

function displayAlerts(data) {
  const alerts = data.features;
  const count = alerts.length;
  const title = data.title || "Weather Alerts";

  const alertsDisplay = document.getElementById("alerts-display");
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${title}: ${count}`;
  alertsDisplay.appendChild(summary);

  alerts.forEach((alert) => {
    const headline = alert.properties.headline;
    const listItem = document.createElement("p");
    listItem.textContent = headline;
    alertsDisplay.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("fetch-alerts");
  button.addEventListener("click", () => {
    const state = document.getElementById("state-input").value;
    fetchWeatherAlerts(state);
  });
});
