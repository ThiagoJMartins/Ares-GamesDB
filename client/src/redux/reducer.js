import {
	GETALLVG,
	GETVGNAME,
	GETVGID,
	POSTVG,
	GETGENRES,
	ADVANCEPAGE,
	MINPAGE,
	MAXPAGE,
	FILTERGENRES,
	FILTERORIGIN,
	ORDERABC,
	ORDERRATING,
	RESET,
} from "./action-types.js";

const initialState = {
	videogames: [],
	genres: [],
	platforms: [],
	//*PAGINATION
	actualPage: 1,
	totalVideogames: 0,
	gamesByPage: 15,
	//*FILTER
	filteredVideogames: [],
	filterGames: false,
	filterGenres: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
	const combinatedFilters = (filterGenre, filterOrigin) => {
		let filterVg = [...state.videogames];
		if (filterGenre && filterGenre !== "allGenres") {
			filterVg = filterVg.filter((game) => {
				const extractGenre = game.genres.map((genre) => {
					return genre.name;
				});
				return extractGenre.includes(filterGenre);
			});
		}

		if (filterOrigin === "DB")
			filterVg = filterVg.filter((game) => isNaN(game.id));
		if (filterOrigin === "API")
			filterVg = filterVg.filter((game) => !isNaN(game.id));

		return filterVg;
	};
	switch (type) {
		//*VIDEOGAMES
		case GETALLVG:
			const allVg = [...payload.data.db, ...payload.data.api];
			const platformsVg = allVg.map((game) => game.platforms);
			const flatPlats = platformsVg.flat();
			const allPlats = [...new Set(flatPlats)];
			return {
				...state,
				videogames: allVg,
				filteredVideogames: allVg,
				totalVideogames: allVg.length,
				platforms: allPlats,
			};
		case GETVGNAME:
			return {
				...state,
				filteredVideogames: [...payload.data.db, ...payload.data.api],
				totalVideogames: state.filteredVideogames.length,
				actualPage: 1,
			};
		case GETVGID:
			return {
				...state,
				videogames: payload,
			};
		case POSTVG:
			return {
				...state,
				videogames: [payload, ...state.videogames],
				filteredVideogames: [payload, ...state.filteredVideogames],
				totalVideogames: state.totalVideogames + 1,
			};
		//*GENRES
		case GETGENRES:
			return {
				...state,
				genres: payload,
			};
		//*PAGINATION
		case ADVANCEPAGE:
			let value = payload;
			if (state.actualPage + value < 1) {
				value = 0;
			}
			if (
				state.actualPage + value >
				Math.ceil(state.totalVideogames / state.gamesByPage)
			) {
				value = 0;
			}
			return {
				...state,
				actualPage: state.actualPage + value,
			};
		case MINPAGE:
			return {
				...state,
				actualPage: 1,
			};
		case MAXPAGE:
			return {
				...state,
				actualPage:
					state.totalVideogames === 0
						? 1
						: Math.ceil(state.totalVideogames / state.gamesByPage),
			};
		//*FILTER & ORDER
		case FILTERGENRES: {
			let filterVg = combinatedFilters(payload, state.filterGames);
			return {
				...state,
				filteredVideogames: filterVg,
				totalVideogames: filterVg.length,
				actualPage: 1,
				filterGenres: payload,
			};
		}
		case FILTERORIGIN:
			let filterVg = combinatedFilters(state.filterGenres, payload);
			return {
				...state,
				filteredVideogames: filterVg,
				totalVideogames: filterVg.length,
				actualPage: 1,
				filterGames: payload,
			};
		case ORDERABC:
			let ordererAbc = [...state.filteredVideogames];
			ordererAbc.sort((a, b) => {
				if (a.name < b.name) return payload === "A-Z" ? -1 : 1;
				if (a.name > b.name) return payload === "Z-A" ? -1 : 1;
				return 0;
			});
			return {
				...state,
				filteredVideogames: ordererAbc,
				totalVideogames: ordererAbc.length,
				actualPage: 1,
			};
		case ORDERRATING:
			let ordererRating = [...state.filteredVideogames];
			ordererRating.sort((a, b) => {
				if (payload === "0-9") return a.metacritic - b.metacritic;
				if (payload === "9-0") return b.metacritic - a.metacritic;
			});
			return {
				...state,
				filteredVideogames: ordererRating,
				totalVideogames: ordererRating.length,
				actualPage: 1,
			};
		case RESET:
			return {
				...state,
				filteredVideogames: state.videogames,
				totalVideogames: state.videogames.length,
				actualPage: 1,
				filterGenres: false,
				filterGames: false,
			};
		default:
			return state;
	}
};

export default rootReducer;
