import axios from "axios";
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

//*VIDEOGAMES

export function getVideogames() {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("http://localhost:3001/videogames");

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
			const { data } = await axios.get(
				`http://localhost:3001/videogames?name=${name}`
			);

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
			const { data } = await axios.get(
				`http://localhost:3001/videogames/${id}`
			);

			return dispatch({
				type: GETVGID,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function postVideogame() {
	return async (dispatch) => {
		try {
			const { data } = await axios.post("http://localhost:3001/videogames");

			return dispatch({
				type: POSTVG,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//*GENRES

export function getGenres() {
	return async function (dispatch) {
		try {
			const genresSearch = axios.get(`http://localhost:3001/genres`);
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
