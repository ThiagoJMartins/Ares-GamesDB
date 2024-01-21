const { Videogame, Genres } = require("../src/db");

const searchDB = async () => {
	try {
		const videogamesArr = await Videogame.findAll({
			include: {
				attributes: ["name"],
				model: Genres,
				through: {
					attributes: [],
				},
			},
		});

		return videogamesArr;
	} catch (error) {
		return error;
	}
};

module.exports = searchDB;
