const axios = require("axios");
const { Genres } = require("../db");
require("dotenv").config();
const API_KEY = process.env;

const getGenres = async (req, res) => {
	try {
		const GenresArr = await Genres.findAll();

		if (GenresArr.length === 0) {
			try {
				const URL = "https://api.rawg.io/api/genres";
				const { data } = await axios.get(`${URL}?key=${API_KEY}`);
				const GenresArr = data.results.map((genre) => genre.name);
				await Genres.bulkCreate(GenresArr);
				res.status(200).json(GenresArr);
			} catch (error) {
				return error;
			}
		} else {
			return res.status(200).json(GenresArr);
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = getGenres;
