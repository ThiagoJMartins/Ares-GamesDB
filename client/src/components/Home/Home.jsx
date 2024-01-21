import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogames, getGenres } from "../../redux/actions";
import style from "./Home.module.scss";
import Videogame from "../Videogame/Videogame";
import Pagination from "../Pagination/Pagination";
import Orders from "../Orders/Orders";
import Filters from "../Filters/Filters";

const Home = () => {
	const videogames = useSelector((state) => state.filteredVideogames);
	const genres = useSelector((state) => state.genres);
	const dispatch = useDispatch();
	const actualPage = useSelector((state) => state.actualPage);
	const totalVideogames = useSelector((state) => state.totalVideogames);
	const gamesByPage = useSelector((state) => state.gamesByPage);

	let start = (actualPage - 1) * gamesByPage;
	let end = start + gamesByPage;
	if (end > totalVideogames) end = totalVideogames;
	if (start < 0) start = 0;

	useEffect(() => {
		if (videogames.length === 0) {
			dispatch(getVideogames());
		}
		if (genres.length === 0) {
			dispatch(getGenres());
		}
	}, []);

	return (
		<div className={style.home}>
			<Orders />
			<Filters />
			{videogames
				.map((game) => {
					return (
						<Videogame
							key={game.id}
							id={game.id}
							name={game.name}
							image={game.background_image}
							genres={game.genres}
							released={game.released}
							rating={game.metacritic}
						/>
					);
				})
				.slice(start, end)}
			<div>
				<Pagination />
			</div>
		</div>
	);
};

export default Home;
