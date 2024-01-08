require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const GetAllVideogames = async () => {
	let videogames = [];
	let pageNum = 1;

	while (videogames.length < 100) {
		const { data } = await axios.get(
			`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}&page_size=25`
		);

		videogames = [...videogames, ...data.results];
		pageNum++;
	}

	return videogames;
};

module.exports = GetAllVideogames;
