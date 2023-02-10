import './App.css';
import Hindex from './homePage/Hindex';
import Index from './login_register/Index'
import CurrentWeather from './homePage/CurrentWeather/CurrentWeather.jsx';
import { useState } from 'react'
import Forecast from "./homePage/CurrentWeather/forcast/Forcast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./homePage/CurrentWeather/api";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(searchData);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };


  const [Loged, setLoged] = useState(false);

  const OutPut = (name, chkState) => {
    console.log("here");
    setLoged(chkState);
  }
  if (Loged) {
    return (
      <div>
        <Index handleLogin={OutPut}></Index>
      </div>
    )
  }
  else
  {
    return (
      <div className="App">
        <Hindex searchChange={handleSearchChange}></Hindex>
        <div id="result">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </div>
      </div>
    );
  }
}

export default App;
