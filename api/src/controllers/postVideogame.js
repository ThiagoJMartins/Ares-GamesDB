const { Videogame, Genres } = require("../db");
const searchApiByName = require("../utils/searchApiByName");
const searchDBByName = require("../utils/searchDBByName");

const postVideogame = async (req, res) => {
	const { name, image, desc, genres, plats, release, rating } = req.body;

	if (!name || !image) {
		return res.status(404).json({ error: "Name and image required" });
	}

	let NotAvailableVideogame = await searchApiByName(name);

	if (NotAvailableVideogame.error) {
		NotAvailableVideogame = await searchDBByName(name);
	}

	if (NotAvailableVideogame) {
		return res
			.status(400)
			.json({ error: "The name of the videogame already exists" });
	}

	try {
		const newVideogame = await Videogame.create(req.body);

		if (newVideogame && genres && Array.isArray(genres)) {
			const promises = genres.map(async (gen) => {
				let genre = await Genres.findAll({
					where: { name: gen.name },
				});

				return newVideogame.setTypes(genre);
			});

			await Promise.all(promises);
		}

		let resultVideogame = await Videoame.findAll({
			where: {
				name: name,
			},
			include: [
				{
					model: Genres,
					attributes: ["id", "name"],
				},
			],
		});

		return res.status(201).json(resultVideogame[0]);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = postVideogame;
