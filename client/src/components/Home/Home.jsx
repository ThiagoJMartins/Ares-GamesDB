import { useDispatch, useSelector, UseSelector } from "react-redux";
import { useEffect } from "react";
import Videogame from "../Videogame/Videogame";
import { getVideogames, getGenres } from "../../redux/actions";
import style from "./Home.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const Home = () => {
	const videogames = useSelector((state) => state.filteredVideogames);
	const dispatch = useDispatch();
	const currentPage = parseInt(useSelector((state) => state.currentPage));
	const itemsByPage = parseInt(useSelector((state) => state.itemsByPage));
	const totalVideogames = parseInt(
		useSelector((state) => state.totalVideogames)
	);

	let start = (currentPage - 1) * itemsByPage;
	let end = start + itemsByPage;
	if (end > totalVideogames) end = totalVideogames;
	if (start < 0) start = 0;

	useEffect(() => {
		if (videogames.length === 0) {
			dispatch(getVideogames());
			dispatch(getGenres());
		}
	}, []);

	return (
		<div>
			<div>
				<span>Ares-GamesDB</span>
			</div>
			<div>
				{videogames
					.map((videogame) => {
						return (
							<Link to={`/detail/${videogame.id}`} key={videogame.id}>
								<Videogame
									id={videogame.id}
									name={videogame.name}
									image={videogame.image}
									genres={videogame.genres}
									released_date={videogame.released_date}
									rating={videogame.rating}
									key={videogame.id}
								/>
							</Link>
						);
					})
					.slice(start, end)}
				<div>
					<Pagination />
				</div>
			</div>
		</div>
	);
};

export default Home;
