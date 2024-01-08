const { Videogame, Genres } = require("../db");
const { Sequelize } = require("sequelize");

const seachDBByName = async (name) => {
	try {
		const findVideogame = await Videogame.findOne({
			where: Sequelize.where(
				Sequelize.fn("lower", Sequelize.col("videogame.name")),
				Sequelize.fn("lower", name)
			),
			include: {
				attributes: ["name"],
				model: Genres,
				through: {
					attributes: [],
				},
			},
		});
		return findVideogame;
	} catch (error) {
		return error;
	}
};

module.exports = seachDBByName;
