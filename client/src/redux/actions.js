import axios from "axios";
import {
	GETVG,
	GETGENRES,
	FINDVG,
	RESET_SEARCH,
	MODIFYPAGE,
	BOTTOMPAGE,
	TOPAGE,
} from "./action-types.js";

export function getVideogames() {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("http://localhost:3001/videogames");

			return dispatch({
				type: GETVG,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getGenres() {
	return function (dispatch) {
		axios
			.get("http://localhost:3001/genres")
			.then((response) => {
				// ordenamiento alfabetico de los types
				response.data.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				}); //
				dispatch({
					type: GETGENRES,
					payload: response.data, // recibe un arreglo de pokemons
				});
			}) // cacth generar un dispatch un error
			.catch((error) => {
				console.log("Error connection BACK");
			});
	};
}

export function resetSearch() {
	return {
		type: RESET_SEARCH,
		payload: false,
	};
}

export function searchVideogame(name) {
	return async function (dispatch) {
		try {
			const vgSearch = axios.get(
				`http://localhost:3001/videogames?name=${name}`
			);
			return dispatch({
				type: FINDVG,
				payload: (await vgSearch).data,
			});
		} catch ({ response }) {
			alert(response.data.message);
		}
	};
}

// Pagination

export function modifyPage(value) {
	return {
		type: MODIFYPAGE,
		payload: value,
	};
}

export function topPage() {
	return {
		type: TOPAGE,
	};
}
export function bottomPage() {
	return {
		type: BOTTOMPAGE,
	};
}
