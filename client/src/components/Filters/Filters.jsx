import { useDispatch, useSelector } from "react-redux";
import { filterGenres, filterOrigin } from "../../redux/actions";
import style from "./Filters.module.scss";

const Filters = () => {
	const selectGenre = useSelector((state) => state.filterGenres);
	const selectOrigin = useSelector((state) => state.filterGames);
	const genres = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	const handleFilterGenres = (event) => {
		dispatch(filterGenres(event.target.value));
	};

	const handleFilterOrigin = (event) => {
		dispatch(filterOrigin(event.target.value));
	};

	return (
		<div className={style.filterContainer}>
			<select
				className={style.selectFilter}
				onChange={handleFilterGenres}
				value={selectGenre}>
				<option value={"allGenres"}>All Genres</option>
				{genres.map((genre) => (
					<option key={genre.id} value={genre.name}>
						{genre.name}
					</option>
				))}
			</select>
			<div></div>
			<select
				className={style.selectFilter}
				onChange={handleFilterOrigin}
				value={selectOrigin}>
				<option value="ALL">All Origins</option>
				<option value="API">Api</option>
				<option value="DB">DataBase</option>
			</select>
		</div>
	);
};

export default Filters;
