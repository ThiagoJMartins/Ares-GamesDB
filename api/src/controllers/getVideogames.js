const searchApiByName = require("../utils/searchApiByName");
const searchDBByName = require("../utils/searchDBByName");
const GetAllVideogames = require("../utils/GetAllVideogames");
const GetAllVideogamesDB = require("../utils/GetAllVideogamesDB");

const getVideogames = async (req, res) => {
	const { name } = req.query;

	if (name) {
		const data = {
			db: await searchDBByName(name),
			api: await searchApiByName(name),
		};

		if ((data.db.length === 0) & (data.api.length === 0)) {
			throw new Error("Videogames not found");
		} else {
			return res.status(200).json({ data });
		}
	}

	const data = {
		db: await GetAllVideogamesDB(),
		api: await GetAllVideogames(),
	};
	return res.status(200).json({ data });
};

module.exports = getVideogames;
