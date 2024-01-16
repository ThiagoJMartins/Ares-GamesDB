const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const seachDBByName = async (name) => {
	try {
		const findVideogame = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: Genres,
		});
		return findVideogame;
	} catch (error) {
		return error;
	}
};

module.exports = seachDBByName;
