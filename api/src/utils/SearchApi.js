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
							image: vg.data.image,
							desc: vg.data.description,
							genres: vg.data.genres.map((genre) => genre.name),
							plats: vg.data.platforms.map((plat) => plat.platform.name),
							release: vg.data.released,
							rating: vg.data.metacritic,
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
