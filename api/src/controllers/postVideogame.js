const CreateInDB = require("../utils/CreateInDB");

const postVideogame = async (req, res) => {
	const {
		name,
		background_image,
		description,
		genres,
		platforms,
		released,
		metacritic,
	} = req.body;
	await CreateInDB(
		name,
		background_image,
		description,
		genres,
		platforms,
		released,
		metacritic
	);
	return res.status(201).json("Videogame successfully created");
};

module.exports = postVideogame;
