import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameById } from "../../redux/actions";

const Detail = () => {
	const videogame = useSelector((state) => state.videogames);
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		dispatch(getVideogameById(id));
	}, []);

	return (
		<div>
			<h2>{videogame.name}</h2>
			<img
				src={videogame.background_image}
				alt={`${videogame.name} image`}
				width="500px"
			/>
			<span>{videogame.metacritic}</span>
			<ul>
				{videogame.genres &&
					videogame.genres.map((genre) => {
						return <li key={genre.id}>{genre.name}</li>;
					})}
			</ul>
			<p>{videogame.description}</p>
			<span>{videogame.released}</span>
			<ul>
				{videogame.platforms?.map((platform, index) => {
					return <li key={index}>{platform}</li>;
				})}
			</ul>
		</div>
	);
};

export default Detail;
