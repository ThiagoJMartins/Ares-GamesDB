require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const searchApiById = async (id) => {
	const URL = "https://api.rawg.io/api/games";
	try {
		const findVideogameId = await axios.get(`${URL}/${id}?key=${API_KEY}`);

		if (findVideogameId) {
			let vg = findVideogameId;
			return {
				id: vg.data.id,
				name: vg.data.name,
				background_image: vg.data.background_image,
				description: vg.data.description,
				genres: vg.data.genres,
				platforms: vg.data.platforms.map((plat) => plat.platform.name),
				released: vg.data.released,
				metacritic: vg.data.metacritic,
			};
		} else {
			return null;
		}
	} catch (error) {
		return { error: error };
	}
};

module.exports = searchApiById;
