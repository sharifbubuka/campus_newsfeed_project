import type { NextPage } from "next";
import { GetStaticProps } from "next";
import WeatherNewsDisplay from "../components/sections/WeatherNewsDisplay";

type Props = {
	geoData: Object;
	newsData: {
		fields: "";
	}[];
};

const Home: NextPage = (props: Props & any) => {
	return (
		<div className="">
			<main className="max-w-5xl mx-auto flex flex-col">
				<WeatherNewsDisplay />
			</main>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	// const newsResponse = await fetch(`https://content.guardianapis.com/search?show-fields=thumbnail&q=Uganda&api-key=953c5261-fc5a-4883-b9bd-2be80d8f95ff`);

	// const { response } = await newsResponse.json();
	// const newsData = response;
	// console.log(newsData);

	return {
		props: {
		},
	};
};
