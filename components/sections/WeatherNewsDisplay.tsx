import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCloud } from "react-icons/bs";
import { weatherAPI } from '../../helpers';

const WeatherNewsDisplay = () => {
	const [currentWeatherData, setCurrentWeatherData] = useState({name: '', main: {temp: '', temp_min: '', temp_max: '', feels_like: '', humidity: '', pressure: ''}, weather: [{description: ''}], wind: {speed: ''}});
	const [weatherForecastData, setWeatherForecastData] = useState<any>({dt_txt: '', pop: '', main: {}, rain: '', wind: {}, weather: [{}]});
	const [location, setLocation] = useState("");
	const [weatherAPIError, setWeatherAPIError] = useState('')

	useEffect(() => {
		setLocation('');

		weatherAPI.getLocationCurrentWeather()
			.then(weatherData => setCurrentWeatherData(weatherData));

		weatherAPI.getLocationWeatherForecast()
			.then(weatherData => setWeatherForecastData(weatherData));
	}, []);

	function handleInputChange(e: any) {
		e.preventDefault();
		setLocation(e.target.value)
	}

	function updateWeatherLocation() {
		weatherAPI.getLocationCurrentWeather(location)
			.then(weatherData => weatherData && setCurrentWeatherData(weatherData))
			.catch(error => {
				setWeatherAPIError('Weather data for current location is not available! Sorry!! :(');
				setTimeout(() => {
					setWeatherAPIError('');
				}, 3 * 1000)
			});

		weatherAPI.getLocationWeatherForecast(location)
			.then(weatherData => weatherData && setWeatherForecastData(weatherData))
			.catch(error => {});
	}

	return (
		<>
			<div className="">
				<div className="flex flex-col gap-4 md:flex-row px-4 md:px-0 py-2 pt-4">
					<div className="md:px-0 md:w-8/12">
						<label htmlFor="location" className="sr-only">
							Location: 
						</label>
						<input
							className="w-full py-2 px-4 outline-none border border-gray-300 text-lg text-gray-500"
							type="text"
							placeholder="Enter Location"
							value={location}
							onChange={handleInputChange}
						></input>
						{weatherAPIError && <p className="pt-2 text-red-600 font-semibold">{weatherAPIError}</p>}
					</div>
					<div className="flex gap-4 items-center md:pr-0 md:w-4/12">
						<button onClick={e => updateWeatherLocation()} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-lg text-white font-semibold h-max">
							Get Forecast
						</button>
					</div>
				</div>
			</div>
			<div className="w-full max-w-5xl mx-auto px-4 md:px-0 grid grid-cols-12">
				<div className=" col-span-12 md:grid md:grid-cols-12 pb-2">
					<h2 className="md:col-span-4 text-2xl font-bold text-gray-700 tracking-wide">
						{currentWeatherData.name && <span>{currentWeatherData.name}</span>} 
					</h2>
					<div className="md:col-span-8 md:pl-8 hidden md:flex md:flex-col md:justify-center gap-1 flex-1">
						<div className=" h-1 w-full bg-gray-300"></div>
						<div className=" h-1 w-full bg-gray-300"></div>
					</div>
				</div>

				<div className="relative col-span-12 md:col-span-4 md:border-t border-gray-300 py-2">
					<h3 className="text-xl font-bold text-gray-700">Weather Today</h3>
					<p className="py-2 text-3xl font-bold text-gray-600">{currentWeatherData.main.temp }{' '}<sup>o</sup>C</p>
					<p className="py-2 text-xl font-bold text-gray-500">
						<span>{currentWeatherData.main.temp_min }{' '}<sup>o</sup>C</span> / <span>{currentWeatherData.main.temp_max }{' '}<sup>o</sup>C</span>
					</p>
					<div className="pb-2">
						{currentWeatherData && (
							<>
								<p className="py-2">Feels like: { currentWeatherData.main.feels_like }{' '}<sup>o</sup>C</p>
								<p className="py-2">Humidity: {currentWeatherData.main.humidity}{' '}%</p>
								<p className="py-2">Pressure: {currentWeatherData.main.pressure}{' '}</p>
								<p className="py-2">Wind Speed: {currentWeatherData.wind.speed}{' '} Kph</p>
							</>
						)}
					</div>
					<div className="border-t py-2 relative">
						<h3 className="text-xl font-bold text-gray-700 w-full pb-2 flex items-end justify-between">
							<span className="">Weather Tomorrow</span>
							<span className="italic text-gray-700 text-sm h-full">{weatherForecastData.dt_txt.split(' ')[0]}</span>
						</h3>
						<div className="bg-gradient-to-br from-red-400 to-blue-400 p-4 rounded-lg relative">
							<div className="">
								<span className="flex flex-col md:justify-between md:flex-row">
									
								</span>
								<span className="">
									<p className="py-2 text-3xl font-bold text-gray-600">{weatherForecastData.main.temp }{' '}<sup>o</sup>C</p>
									<p className="py-2 text-xl font-bold text-gray-500">
										<span>{weatherForecastData.main.temp_min }{' '}<sup>o</sup>C</span> / <span>{weatherForecastData.main.temp_max }{' '}<sup>o</sup>C</span>
									</p>
									<p className="py-2">Feels like: { weatherForecastData.main.feels_like }{' '}<sup>o</sup>C</p>
									<p className="py-2">Humidity: {weatherForecastData.main.humidity}{' '}%</p>
									<p className="py-2">Pressure: {weatherForecastData.main.pressure}{' '}</p>
									<p className="py-2">Wind Speed: {weatherForecastData.wind.speed}{' '}Kph</p>
									<p className="py-2">Chance of rain: {weatherForecastData.pop * 100}{' '}%</p>
								</span>
							</div>
							<div className="absolute top-4 right-4 text-white flex flex-col items-end">
								<BsCloud size={70} className="stroke-current" />
								<p className="font-semibold capitalize">{ weatherForecastData.weather[0].description }</p>
							</div>
						</div>
					</div>
					<div className="absolute top-4 right-4 text-gray-500 flex flex-col items-end">
						<BsCloud size={70} className="stroke-current" />
						<p className="font-semibold capitalize">{ currentWeatherData.weather[0].description }</p>
					</div>
				</div>
				<div className="col-span-12 md:col-span-8 md:pl-8">
					{/* <div className="relative">
						<Image
							src={props.newsData[3].fields.thumbnail}
							alt={props.newsData[0].webTitle}
							width={1000}
							height={650}
							priority
						/>
						<Link href={props.newsData[0].webUrl} passHref>
							<div className="absolute bottom-0 w-full font-semibold text-2xl p-4 text-gray-700 hover:text-red-500 cursor-pointer bg-gray-200">
								{props.newsData[0].webTitle}
							</div>
						</Link> */}
					{/* </div> */}
					<div className="grid grid-cols-12 gap-4">
						{/* {props.newsData.map((article: any) => (
							<div
								key={article.id}
								className="bg-red-600 col-span-12 md:col-span-6 h-full"
							>
								<div className="w-full h-72 md:h-54 relative">
									<Image
										className="relative"
										src={article.fields.thumbnail}
										alt={article.webTitle}
										layout="fill"
										priority
									/>
								</div>
								<div className="w-full text-xl p-4 bg-gray-200">
									{article.webTitle}
								</div>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherNewsDisplay;
