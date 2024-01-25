import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions";
import style from "./Home.module.scss";
import Videogame from "../Videogame/Videogame";
import Pagination from "../Pagination/Pagination";
import Orders from "../Orders/Orders";
import Filters from "../Filters/Filters";

const Home = () => {
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.filteredVideogames);
	const actualPage = useSelector((state) => state.actualPage);
	const totalVideogames = useSelector((state) => state.totalVideogames);
	const gamesByPage = useSelector((state) => state.gamesByPage);

	const start = Math.max((actualPage - 1) * gamesByPage, 0);
	const end = Math.min(start + gamesByPage, totalVideogames);

	useEffect(() => {
		loadInitialData();
	}, [dispatch, videogames]);

	const loadInitialData = () => {
		if (videogames.length === 0) {
			dispatch(getVideogames());
			dispatch(getGenres());
		}
	};

	const renderVideogames = () => {
		{
			return videogames.length !== 0 ? (
				videogames
					.slice(start, end)
					.map((game, index) => (
						<Videogame
							key={index}
							id={game.id}
							name={game.name}
							image={game.background_image}
							genres={game.genres}
							released={game.released}
							rating={game.metacritic}
						/>
					))
			) : (
				<div className={style.sonic}>
					<img
						src="./sonic.gif"
						alt="Sonic Loading"
						width="300px"
						height="300px"
					/>
				</div>
			);
		}
	};

	return (
		<div className={style.home}>
			<div className={style.optionsBar}>
				<div className={style.orderBar}>
					<Orders />
				</div>
				<div className={style.filterBar}>
					<Filters />
				</div>
			</div>
			<div
				className={videogames.length !== 0 ? style.videogames : style.loading}>
				{renderVideogames()}
			</div>
			<div className={style.pagination}>
				<Pagination />
			</div>
		</div>
	);
};

export default Home;
