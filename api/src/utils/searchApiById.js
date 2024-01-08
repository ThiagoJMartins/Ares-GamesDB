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
				image: vg.data.background_image,
				desc: vg.data.description,
				genres: vg.data.genres.map((genre) => genre.name),
				plats: vg.data.platforms.map((plat) => plat.platform.name),
				release: vg.data.released,
				rating: vg.data.metacritic,
			};
		} else {
			return null;
		}
	} catch (error) {
		return { error: error };
	}
};

module.exports = searchApiById;
