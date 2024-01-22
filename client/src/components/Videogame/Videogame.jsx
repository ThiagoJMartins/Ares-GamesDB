import { Link } from "react-router-dom";
import style from "./Videogame.module.scss";

const Videogame = ({ id, name, image, genres, released, rating }) => {
	return (
		<div className={style.container}>
			<div className={style.header}>
				<span className={style.name}>{name}</span>
				{typeof id === "number" ? (
					<span className={style.id}>#{id}</span>
				) : (
					<span></span>
				)}
			</div>
			{image && (
				<Link to={`/videogame/${id}`}>
					<img src={image} alt={name} width="256px" height="144px" />
				</Link>
			)}
			<div className={style.genres}>
				{genres &&
					genres.map((genre) => {
						return <span key={genre.id}>{genre.name} </span>;
					})}
			</div>
			<div className={style.released}>{released}</div>
			<div className={style.rating}>{rating}</div>
		</div>
	);
};

export default Videogame;
