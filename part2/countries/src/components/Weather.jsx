import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WEATHER_API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

const Weather = ({ lat, lon }) => {
	const [weatherData, setWeatherData] = useState({});

	const WEATHER_PARAMS = `${lat},${lon}?key=${API_KEY}`;

	useEffect(() => {
		axios.get(`${WEATHER_API}/${WEATHER_PARAMS}`).then((response) => {
            const { temp, windspeed } = response.data.currentConditions
            setWeatherData({
                temp: ((temp - 32) * 5/9).toFixed(2),
                windspeed: windspeed
            })

		})
        .catch(err => alert(`API error: ${err?.message}`))
	}, []);

	return (
		<div>
			<h1>Capital Weather</h1>
			<p>Temperature {weatherData.temp}º</p>
			<p>Wind {weatherData.windspeed} m/s</p>
		</div>
	);
};

export default Weather;
