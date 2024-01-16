const CreateInDB = require("../utils/CreateInDB");

const postVideogame = async (req, res) => {
	const { name, image, description, genres, platform, released_date, rating } =
		req.body;
	console.log("xd");
	await CreateInDB(
		name,
		image,
		description,
		genres,
		platform,
		released_date,
		rating
	);
	return res.status(201).json("Videogame successfully created");
};

module.exports = postVideogame;
