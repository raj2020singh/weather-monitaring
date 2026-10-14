import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "2d3edd8f421461141ce79cb55a2452a";

  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      if (!city) {
        setError("Please enter a city ⚠️");
        return;
      }

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);

    } catch (err) {
      console.log(err.response?.data);
      setError("City not found ❌ or API not active");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center">
        Weather Dashboard 🌦️
      </h1>

      {/* SEARCH */}
      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-l-xl outline-none text-black w-64"
        />
        <button
          onClick={getWeather}
          className="bg-blue-700 px-5 rounded-r-xl hover:bg-blue-800 transition"
        >
          Search
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-center mt-6 text-red-300 text-lg">{error}</p>
      )}

      {/* WEATHER DATA */}
      {weather && (
        <div className="flex justify-center mt-12">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-72 text-center">

            <h2 className="text-2xl font-semibold">
              {weather.name}
            </h2>

            <p className="text-5xl mt-2">
              {weather.main.temp}°C
            </p>

            <p className="mt-2 text-lg">
              {weather.weather[0].main}
            </p>

            <p className="mt-4">💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {weather.wind.speed} km/h</p>
            <p>🌡 Pressure: {weather.main.pressure} hPa</p>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;