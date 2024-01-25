import { Link, useParams } from "react-router-dom";
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
	const isParam = useParams();

	return (
		<div className={isParam.id ? style.containerDetail : style.container}>
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
					<img
						className={style.image}
						src={image}
						alt={name}
						width="256px"
						height="144px"
					/>
				</Link>
			)}
			<div className={style.plats}>
				{platforms &&
					platforms.map((platform, index) => {
						return (
							<span className={style.plat} key={index}>
								{platform}{" "}
							</span>
						);
					})}
			</div>
			<div className={style.descriptionContainer}>
				<div
					className={style.description}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
			<div className={style.numberContainer}>
				<div className={style.released}>{released}</div>
				<div className={style.rating}>{rating > 0 ? rating : "??"}</div>
			</div>

			<div className={style.genres}>
				{genres &&
					genres.map((genre) => {
						return (
							<li className={style.genre} key={genre.id}>
								{genre.name}{" "}
							</li>
						);
					})}
			</div>
		</div>
	);
};

export default Videogame;
