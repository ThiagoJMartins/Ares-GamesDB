import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameById, resetVideogame } from "../../redux/actions";
import Videogame from "../Videogame/Videogame";

const Detail = () => {
	const detail = useSelector((state) => state.vgDetail);
	const searching = useSelector((state) => state.searching);
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		dispatch(getVideogameById(id));
		if (searching) dispatch(resetVideogame());
	}, [id]);

	return (
		<div>
			{detail.name ? (
				<Videogame
					key={detail.id}
					id={detail.id}
					name={detail.name}
					image={detail.background_image}
					platforms={detail.platforms}
					description={detail.description}
					released={detail.released}
					rating={detail.metacritic}
					genres={detail.genres}
				/>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default Detail;
