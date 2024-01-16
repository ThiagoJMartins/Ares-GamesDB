const { Videogame } = require("../db");

const GetAllVideogamesDB = async () => {
	const dataDB = await Videogame.findAll();

	return dataDB;
};

module.exports = GetAllVideogamesDB;
