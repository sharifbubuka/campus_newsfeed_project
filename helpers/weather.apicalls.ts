import axios from 'axios';

export async function getLocationCurrentWeather(location: string = "Uganda") {
    const response = await axios({url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=f8504abe6e01c1d06386e380802e8cba`});    
    const data = response.data;
    if (response.status !== 200) throw ('Weather for location provided is not available');
    return {
        name: data.name,
        main: data.main,
        weather: data.weather,
        wind: data.wind,
    };
}

export async function getLocationWeatherForecast(location: string = "Uganda") {
    const response = await axios({url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=f8504abe6e01c1d06386e380802e8cba`});
    if (response.status !== 200) throw new Error('Weather forecast for location provided is not available');
    const data = response.data.list[8];
    return data;
}