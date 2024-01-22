import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions.js";
//!----------------------------------------------------+/
import style from "./SearchBar.module.scss";
//!----------------------------------------------------+/

const SearchBar = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (search.length !== 0) {
			dispatch(getVideogameByName(search.toLowerCase()));
			setSearch("");
		}
	};

	return (
		<form className={style.searchbar}>
			<input
				type="text"
				name="search"
				value={search}
				onChange={handleChange}
				placeholder="The Witcher 3"
			/>
			<button
				className={style.searchbutton}
				type="submit"
				value="Submit"
				onClick={handleSubmit}>
				🔎
			</button>
		</form>
	);
};

export default SearchBar;
