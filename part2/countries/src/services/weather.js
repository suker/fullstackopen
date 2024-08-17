import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY

const WEATHER_API = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&unis=metric`
