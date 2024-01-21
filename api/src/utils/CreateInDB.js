const { Videogame, Genres } = require("../db");

const CreateInDB = async (
	name,
	background_image,
	description,
	genres,
	platforms,
	released,
	metacritic
) => {
	const newGame = await Videogame.create({
		name,
		background_image,
		description,
		platforms,
		released,
		metacritic,
	});

	const genresVG = await Promise.all(
		genres.map(async (genre) => {
			const [genreVG] = await Genres.findOrCreate({ where: { name: genre } });
			return genreVG;
		})
	);
	await newGame.setGenres(genresVG);

	const data = await Videogame.findOne({
		where: { name: name },
		include: Genres,
	});

	return data;
};

module.exports = CreateInDB;
