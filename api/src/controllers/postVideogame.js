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
	const data = await CreateInDB(
		name,
		background_image,
		description,
		genres,
		platforms,
		released,
		metacritic
	);
	return res.status(201).json(data);
};

module.exports = postVideogame;
