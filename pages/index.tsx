import type { NextPage } from "next";
import { GetStaticProps } from "next";
import WeatherLocationSelector from "../components/sections/WeatherLocationSelector";
import WeatherNewsDisplay from "../components/sections/WeatherNewsDisplay";

type Props = {
	geoData: Object,
  newsData: Object
};

const Home: NextPage = (props: Props & any) => {
	return (
		<div className="">
			<main className="max-w-5xl mx-auto flex flex-col">
				{/* Weather Selector */}
				<WeatherLocationSelector />

				{/* Weather Display */}
				<WeatherNewsDisplay geoData={props.geoData} newsData={props.newsData} />

				{/* Latest News */}
			</main>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const geoResponse = await fetch('http://ip-api.com/json');
    const geoData = await geoResponse.json();
    
    let newsData;
    if (geoData) {
      const newsResponse = await fetch(`https://content.guardianapis.com/search?show-fields=thumbnail&q=${geoData.country}&api-key=953c5261-fc5a-4883-b9bd-2be80d8f95ff`);
      const { response } = await newsResponse.json();
      newsData = response.results;
      console.log(newsData);
      
    }
  
	return {
		props: {
      geoData,
      newsData
    }
	};
};
