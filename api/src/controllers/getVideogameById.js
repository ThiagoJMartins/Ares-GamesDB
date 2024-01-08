const searchApiById = require("../utils/searchApiById");
const searchDBById = require("../utils/searchDBById");

const getVideogameById = async (req, res) => {
	const { idVideogame } = req.params;
	try {
		if (idVideogame) {
			let findVideogameId = null;

			if (!isNaN(idVideogame)) {
				findVideogameId = await searchApiById(idVideogame);
			} else {
				findVideogameId = await searchDBById(idVideogame);
			}

			if (findVideogameId) {
				return res.status(200).json(findVideogameId);
			}
		}
		return res.status(404).json({ message: "ID not found" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameById;
