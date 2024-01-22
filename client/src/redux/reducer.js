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
};

const rootReducer = (state = initialState, { type, payload }) => {
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
				videogames: [...payload.data.db, ...payload.data.api],
			};
		case GETVGID:
			return {
				...state,
				videogames: payload,
			};
		case POSTVG:
			return {
				...state,
				videogames: [payload.data, ...state.videogames],
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
		case FILTERGENRES:
			let backupGenre = [...state.Videogames];
			if (payload !== "allGenres") {
				backupGenre = backupGenre.filter((game) => {
					const GenresDB = game.genres.map((genre) => genre.name.toUpperCase());
					return GenresDB.includes(payload);
				});
			}
			return {
				...state,
				filteredVideogames: backupGenre,
			};
		case FILTERORIGIN:
			let backupOrigin = [...state.Videogames];
			if (payload === "ALL") backupOrigin = state.videogames;
			if (payload === "API")
				backupOrigin = state.videogames.filter((game) => {
					return typeof game.id === "number";
				});
			if (payload === "DB")
				backupOrigin = state.videogames.filter((game) => {
					return typeof game.id !== "number";
				});
			return {
				...state,
				filteredVideogames: backupOrigin,
			};
		case ORDERABC:
			let ordererAbc = [...state.videogames];
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
			let ordererRating = [...state.videogames];
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
			};
		default:
			return state;
	}
};

export default rootReducer;
