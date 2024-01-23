import { Link } from "react-router-dom";
import style from "./Videogame.module.scss";

const Videogame = ({
	id,
	name,
	image,
	platforms,
	description,
	genres,
	released,
	rating,
}) => {
	return (
		<div className={style.container}>
			<div className={style.header}>
				<span className={style.name}>{name?.replaceAll("-", " ")}</span>
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
			<div className={style.plats}>
				{platforms &&
					platforms.map((platform, index) => {
						return <span key={index}>{platform} </span>;
					})}
			</div>
			<div className={style.description}>
				<div dangerouslySetInnerHTML={{ __html: description }} />
			</div>
			<div className={style.released}>{released}</div>
			<div className={style.rating}>{rating}</div>
			<div className={style.genres}>
				{genres &&
					genres.map((genre) => {
						return <span key={genre.id}>{genre.name} </span>;
					})}
			</div>
		</div>
	);
};

export default Videogame;
