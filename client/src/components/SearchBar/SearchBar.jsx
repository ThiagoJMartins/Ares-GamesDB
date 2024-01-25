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
				className={style.search}
				placeholder="The Witcher 3: Wild Hunt..."
			/>
		</form>
	);
};

export default SearchBar;
