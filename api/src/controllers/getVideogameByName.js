const searchApiByName = require("../utils/searchApiByName.js");
const searchDBByName = require("../utils/searchDBByName.js");
const GetAllVideogames = require("../utils/GetAllVideogames.js");

const getVideogamesByName = async (req, res) => {
	try {
		const { name } = req.query;
		if (name) {
			let findVideogame = await searchApiByName(name);

			if (findVideogame.error) {
				findVideogame = await searchDBByName(name);

				if (!findVideogame) {
					return res.status(404).json({ message: findVideogame });
				}
			}
			return res.status(200).json(findVideogame);
		}
		const allVideogames = await GetAllVideogames;
		return res.status(200).json(allVideogames);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogamesByName;
