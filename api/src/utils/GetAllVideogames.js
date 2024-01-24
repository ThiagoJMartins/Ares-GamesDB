require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const GetAllVideogames = async () => {
	let videogames = [];
	let pageNum = 1;

	while (videogames.length < 100) {
		const { data } = await axios.get(
			`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}&page_size=15`
		);

		videogames = [...videogames, ...data.results];
		pageNum++;
	}

	const gamesFiltered = videogames.map((game) => {
		const {
			id,
			name,
			background_image,
			parent_platforms,
			description,
			metacritic,
			released,
			genres,
		} = game;

		const platforms = parent_platforms.map(
			(platform) => platform.platform.name
		);

		return {
			id,
			name,
			background_image,
			platforms,
			description,
			metacritic,
			released,
			genres,
		};
	});

	return gamesFiltered;
};

module.exports = GetAllVideogames;
