const { Videogame, Genres } = require("../db");

const seachDBById = async (id) => {
	try {
		const findVideogameId = await Videogame.findOne({
			where: {
				id: id,
			},
			include: {
				attributes: ["name"],
				model: Genres,
			},
		});
		return findVideogameId;
	} catch (error) {
		return null;
	}
};

module.exports = seachDBById;
