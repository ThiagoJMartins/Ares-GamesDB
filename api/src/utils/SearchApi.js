const axios = require("axios");

const searchApi = async () => {
	const URL =
		"https://api.rawg.io/api/games?key=e587de6a2fd4590a8fb02ac8f2db404";
	let videogameApiArr = [];

	await axios
		.get(`${URL}`)
		.then(async (response) => {
			let resultApiArr = response.data.results;

			let arrayPromises = [];
			resultApiArr.map((vg) => arrayPromises.push(axios.get(vg.url)));

			await Promise.all(arrayPromises)
				.then((videogames) => {
					videogameApiArr = videogames.map((vg) => {
						return {
							id: vg.data.id,
							name: vg.data.name,
							background_image: vg.data.background_image,
							description: vg.data.description,
							genres: vg.data.genres.map((genre) => genre.name),
							platforms: vg.data.platforms.map((plat) => plat.platform.name),
							released: vg.data.released,
							metacritic: vg.data.metacritic ?? 0,
						};
					});
				})
				.catch((error) => {
					return error;
				});
		})
		.catch((error) => {
			return error;
		});
	return videogameApiArr;
};

module.exports = searchApi;
