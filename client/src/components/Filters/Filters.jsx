import { useDispatch, useSelector } from "react-redux";
import { filterGenres, filterOrigin } from "../../redux/actions";

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
		<div>
			<select onChange={handleFilterGenres} value={selectGenre}>
				<option value={"allGenres"}>All Genres</option>
				{genres.map((genre) => (
					<option key={genre.id} value={genre.name}>
						{genre.name}
					</option>
				))}
			</select>
			<select onChange={handleFilterOrigin} value={selectOrigin}>
				<option value="ALL">All</option>
				<option value="API">Api</option>
				<option value="DB">DataBase</option>
			</select>
		</div>
	);
};

export default Filters;
