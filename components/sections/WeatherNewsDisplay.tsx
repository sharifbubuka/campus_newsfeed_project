import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { BsCloud } from "react-icons/bs";

const WeatherNewsDisplay = (props: any) => {
	const [location, setLocation] = useState({ country: "", city: "" });
	const [inputWeatherLocation, setInputWeatherLocation] = useState('');
	const [tempFormat, setTempFormat] = useState('c');
	const [currentWeather, setCurrentWeather] = useState({
		temp_c: '',
		temp_f: '',
		feelslike_c: '',
		feelslike_f: '',
		humidity: '',
		uv: '',
		wind_kph: '',
		condition: {
			text: ''
		}
	});
	const [weatherForecast, setWeatherForecast] = useState('')

	useEffect(() => {
		fetch("http://ip-api.com/json")
			.then((res) => res.json())
			.then((geoData) => {
				setLocation({
					country: geoData.country,
					city: geoData.city,
				});
				getCurrentWeather(geoData.country);
				console.log(geoData.country);
				getWeatherForecast(geoData.country);
			});
	}, []);

	function getCurrentWeather(location: string) {
		fetch(`https://api.weatherapi.com/v1/current.json?key=7bd63f3e9ca140a68ab183130220404&q=${location}&aqi=no`)
			.then(res => res.json())
			.then(weatherData => {
				setCurrentWeather(weatherData.current);
			})
	}

	function getWeatherForecast(location: string) {
		fetch(`https://api.weatherapi.com/v1/forecast.json?key=7bd63f3e9ca140a68ab183130220404&q=${location}&days=2&aqi=yes&alerts=no`)
			.then(res => res.json())
			.then(weatherForecastData => {
				setWeatherForecast(weatherForecastData.forecast.forecastday[1]);
				console.log(weatherForecast);
			})
	}

	function handleInputChange(e: any) {
		e.preventDefault();
		setInputWeatherLocation(e.target.value)
	}

	function getForecast() {
		getWeatherForecast(inputWeatherLocation);
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
							value={inputWeatherLocation}
							onChange={handleInputChange}
						></input>
					</div>
					<div className="flex gap-4 items-center md:pr-0 md:w-4/12">
						<button onClick={e => getForecast()} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-lg text-white font-semibold h-max">
							Get Forecast
						</button>
						<div className="flex md:flex-1 text-lg text-white gap-4">
							<button onClick={(e) => setTempFormat('c')} className="px-4 py-2 min-w w-1/2 bg-gray-400 hover:bg-gray-500 font-semibold">
								<sup>o</sup>C
							</button>
							<button onClick={(e) => setTempFormat('f')} className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-500 font-semibold">
								<sup>o</sup>F
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full max-w-5xl mx-auto px-4 md:px-0 grid grid-cols-12">
				<div className=" col-span-12 md:grid md:grid-cols-12 pb-2">
					<h2 className="md:col-span-4 text-xl tracking-wide">
						{location.city && <span>{location.city},</span>} 
						{location.country && <span>{' '}{location.country}</span>}
					</h2>
					<div className="md:col-span-8 md:pl-8 hidden md:flex md:flex-col md:justify-center gap-1 flex-1">
						<div className=" h-1 w-full bg-gray-300"></div>
						<div className=" h-1 w-full bg-gray-300"></div>
					</div>
				</div>

				<div className="relative col-span-12 md:col-span-4 md:border-t border-gray-300 py-2">
					<h3 className="text-xl font-bold">Current Conditions</h3>
					{currentWeather && <p className="py-2 text-lg font-bold">
						{tempFormat === 'c' ? currentWeather.temp_c: currentWeather.temp_f}<sup>o</sup>
						<span className="uppercase">{' '}{tempFormat}</span>
					</p>}
					<div className="">
						<p className="py-2">
							Feels like: {tempFormat === 'c' ? currentWeather.feelslike_c: currentWeather.feelslike_f }<sup>o</sup>
							<span className="uppercase">{' '}{tempFormat}</span>
						</p>
						<p className="py-2">Humidity: {currentWeather.humidity}%</p>
						<p className="py-2">UVIndex: {currentWeather.uv}</p>
						<p className="py-2">Wind Speed: {currentWeather.wind_kph} Kph</p>
					</div>
					<div className="border-t py-2 relative">
						<h3 className="text-xl font-bold">Weather Tomorrow</h3>
						<div className="absolute top-4 right-0 text-gray-500 flex flex-col items-end">
							{/* <img src={weatherForecast.forecastday[1]} alt="de" width={100} height={100} /> */}
						{/* <p className="font-semibold">{weatherForecast.forecastday.day.condition.text}</p> */}
					</div>
					</div>
					<div className="absolute top-4 right-0 text-gray-500 flex flex-col items-end">
						<BsCloud size={70} className="stroke-current" />
						<p className="font-semibold">{currentWeather.condition.text}</p>
					</div>
				</div>
				<div className="col-span-12 md:col-span-8 md:pl-8">
					<div className="relative">
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
						</Link>
					</div>
					<div className="grid grid-cols-12 gap-4">
						{props.newsData.map((article: any) => (
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
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherNewsDisplay;
