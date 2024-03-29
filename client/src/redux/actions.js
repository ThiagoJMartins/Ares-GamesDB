import axios from "axios";
import {
	GETALLVG,
	GETVGNAME,
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
const URL = import.meta.env.VITE_URL;
//*VIDEOGAMES

export function getVideogames() {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL}/videogames`);
			return dispatch({
				type: GETALLVG,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function getVideogameByName(name) {
	return async (dispatch) => {
		try {
			const fixedName = name.replaceAll(" ", "-");
			const { data } = await axios.get(`${URL}/videogames?name=${fixedName}`);
			console.log(data);
			return dispatch({
				type: GETVGNAME,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getVideogameById(id) {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL}/videogames/${id}`);

			return dispatch({
				type: GETVGDETAIL,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function postVideogame(newVg) {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(`${URL}/videogames`, newVg);
			return dispatch({
				type: POSTVG,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function resetVideogame() {
	return {
		type: RESETVG,
		payload: false,
	};
}

//*GENRES

export function getGenres() {
	return async function (dispatch) {
		try {
			const genresSearch = axios.get(`${URL}/genres`);
			return dispatch({
				type: GETGENRES,
				payload: (await genresSearch).data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//*PAGINATION

export function advancePage(value) {
	return {
		type: ADVANCEPAGE,
		payload: value,
	};
}

export function maxPage() {
	return {
		type: MAXPAGE,
	};
}
export function minPage() {
	return {
		type: MINPAGE,
	};
}

//*FILTER & ORDERS

export function filterGenres(genre) {
	return {
		type: FILTERGENRES,
		payload: genre,
	};
}

export function filterOrigin(origin) {
	return {
		type: FILTERORIGIN,
		payload: origin,
	};
}

export function orderAbc(order) {
	return {
		type: ORDERABC,
		payload: order,
	};
}

export function orderRating(rating) {
	return {
		type: ORDERRATING,
		payload: rating,
	};
}

export function reset() {
	return {
		type: RESET,
	};
}
