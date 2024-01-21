const { Videogame, Genres } = require("../db");

const GetAllVideogamesDB = async () => {
	const dataDB = await Videogame.findAll({
		include: Genres,
	});

	return dataDB;
};

module.exports = GetAllVideogamesDB;
