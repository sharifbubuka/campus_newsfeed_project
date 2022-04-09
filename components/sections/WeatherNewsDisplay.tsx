import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCloud } from "react-icons/bs";

const WeatherNewsDisplay = (props: any) => {
	return (
		<div className="w-full max-w-5xl mx-auto px-4 md:px-0 grid grid-cols-12">
			<div className=" col-span-12 md:grid md:grid-cols-12 pb-2">
				<h2 className="md:col-span-4 text-xl tracking-wide">{props.geoData.city}, {props.geoData.country}</h2>
				<div className="md:col-span-8 md:pl-8 hidden md:flex md:flex-col md:justify-center gap-1 flex-1">
					<div className=" h-1 w-full bg-gray-300"></div>
					<div className=" h-1 w-full bg-gray-300"></div>
				</div>
			</div>

			<div className="relative col-span-12 md:col-span-4 md:border-t border-gray-300 py-2">
				<h3 className="text-xl font-bold">Current Conditions</h3>
				<p className="">
					79<sup>o</sup>
				</p>
				<p className="">
					<sup>o</sup> / <span>67</span> <sup>o</sup>
				</p>
				<div className="">
					<p>
						Feels like: 81<sup>o</sup>
					</p>
					<p>Humidity: 59%</p>
					<p>
						FWind: 81 <sup>o</sup>
					</p>
				</div>
				<div className="absolute top-4 right-0 text-gray-500 flex flex-col items-end">
					<BsCloud size={70} className="stroke-current" />
					<p className="font-semibold">Partly Cloudy</p>
				</div>
			</div>
			<div className="col-span-12 md:col-span-8 md:pl-8">
                <div className="relative">
                    <Image src={props.newsData[3].fields.thumbnail} alt={props.newsData[0].webTitle} width={1000} height={650} priority />
                    <Link href={props.newsData[0].webUrl} passHref>
                        <div className="absolute bottom-0 w-full font-semibold text-2xl p-4 text-gray-700 hover:text-red-500 cursor-pointer bg-gray-200">
                            {props.newsData[0].webTitle}
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    {props.newsData.map((article: any) => (
                        <div key={article.id} className="bg-red-600 col-span-12 md:col-span-6 h-full">
                            <div className="w-full h-72 md:h-54 relative">
                                <Image className="relative" src={article.fields.thumbnail} alt={article.webTitle} layout="fill" priority />
                            </div>
                            <div className="w-full text-xl p-4 bg-gray-200">
                                    {article.webTitle}
                                </div>
                        </div>
                    ))}
                </div>
            </div>
		</div>
	);
};

export default WeatherNewsDisplay;