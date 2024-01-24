import {
	GETALLVG,
	GETVGNAME,
	GETVGID,
	POSTVG,
	GETVGDETAIL,
	RESETVG,
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
	backupVg: [],
	vgDetail: {},
	searching: false,
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

	const updateFilteredVideogames = (filteredVideogames) => ({
		...state,
		filteredVideogames,
		totalVideogames: filteredVideogames.length,
		actualPage: 1,
	});
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
				backupVg: allVg,
			};
		case GETVGNAME:
			return {
				...state,
				videogames: [...payload.data.db, ...payload.data.api],
				filteredVideogames: [...payload.data.db, ...payload.data.api],
				totalVideogames: [...payload.data.db, ...payload.data.api].length,
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
				filteredVideogames: [payload, ...state.videogames],
				totalVideogames: state.totalVideogames + 1,
			};
		case GETVGDETAIL:
			return {
				...state,
				vgDetail: payload,
				searching: true,
			};
		case RESETVG:
			return {
				...state,
				vgDetail: {},
				searching: false,
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
			let filterVg;
			if (payload === "allOrigins") {
				filterVg = state.videogames.filter((game) =>
					state.filterGenres
						? game.genres
								.map((genre) => genre.name)
								.includes(state.filterGenres)
						: true
				);
			} else {
				filterVg = combinatedFilters(state.filterGenres, payload);
			}
			return {
				...state,
				filteredVideogames: filterVg,
				totalVideogames: filterVg.length,
				actualPage: 1,
				filterGames: payload,
			};
		case ORDERABC:
			return updateFilteredVideogames(
				[...state.filteredVideogames].sort((a, b) =>
					a.name < b.name
						? payload === "A-Z"
							? -1
							: 1
						: a.name > b.name
						? payload === "Z-A"
							? -1
							: 1
						: 0
				)
			);
		case ORDERRATING:
			return updateFilteredVideogames(
				[...state.filteredVideogames].sort((a, b) =>
					payload === "0-9"
						? a.metacritic - b.metacritic
						: b.metacritic - a.metacritic
				)
			);
		case RESET:
			return {
				...state,
				videogames: state.backupVg,
				filteredVideogames: state.backupVg,
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
