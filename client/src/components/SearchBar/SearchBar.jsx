import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSearch, searchVideogame } from "../../redux/actions.js";
//!----------------------------------------------------+/
import style from "./SearchBar.module.scss";
//!----------------------------------------------------+/

const SearchBar = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const vgFound = useSelector((state) => state.vgFound);
	const findVg = useSelector((state) => state.findVg);

	useEffect(() => {
		if (findVg) {
			dispatch(resetSearch());
			navigate(`/detail/${vgFound.id}`);
		}
	}, [vgFound]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (search.length > 0) {
			dispatch(searchVideogame(search.toLocaleLowerCase()));
			setSearch("");
		}
	};

	const onChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<div>
			<div>
				<div>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							value={search}
							onChange={onChange}
							placeholder="Find your videogame"
						/>
					</form>
					<button type="submit">🔎</button>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
