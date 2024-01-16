const { Videogame, Genres } = require("../db");

const CreateInDB = async (
	name,
	image,
	description,
	genres,
	platform,
	released_date,
	rating
) => {
	const newGame = await Videogame.create({
		name,
		image,
		description,
		platform,
		released_date,
		rating,
	});

	const genresVG = await Promise.all(
		genres.map(async (genre) => {
			const [genreVG] = await Genres.findOrCreate({ where: { name: genre } });
			return genreVG;
		})
	);
	await newGame.setGenres(genresVG);
};

module.exports = CreateInDB;
