import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameById, resetVideogame } from "../../redux/actions";
import Videogame from "../Videogame/Videogame";
import sonic from "/sonic.gif";
import style from "./Detail.module.scss";

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
		<div className={detail.name ? style.detailContainer : style.loading}>
			{detail.name ? (
				<Videogame
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
				<div className={style.sonic}>
					<img src={sonic} alt="Sonic Loading" width="300px" height="300px" />
				</div>
			)}
		</div>
	);
};

export default Detail;
