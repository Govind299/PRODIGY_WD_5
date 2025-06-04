const apiKey = 'f1963f021d5e462da38172553250406'; // Replace with your WeatherAPI key

async function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert("Please enter a city name.");
  fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported.");
  }
}

async function fetchWeather(url) {
  const card = document.getElementById("weatherCard");
  card.innerHTML = "<p class='loading'>Loading...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(data.error.message);

    const weatherHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>${data.current.condition.text}</strong></p>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon">
      <p>🌡️ Temp: ${data.current.temp_c}°C (feels like ${data.current.feelslike_c}°C)</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
    `;
    card.innerHTML = weatherHTML;

  } catch (error) {
    card.innerHTML = `<p class='loading'>Error: ${error.message}</p>`;
  }
}
