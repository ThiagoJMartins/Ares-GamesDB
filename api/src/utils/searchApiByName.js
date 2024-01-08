require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const searchApiByName = async (name) => {
	const URL = "https://api.rawg.io/api/games?search=";
	try {
		const { data } = await axios.get(
			`${URL}${name}&key=${API_KEY}&page_size=15`
		);
		return data.results;
	} catch (error) {
		return { error: error };
	}
};

module.exports = searchApiByName;
