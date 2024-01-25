import { useParams } from "react-router-dom";
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
			{image && (
				<img
					className={style.image}
					src={image}
					alt={name}
					width="256px"
					height="144px"
				/>
			)}
			<div className={style.header}>
				<span className={style.name}>{name?.replaceAll("-", " ")}</span>
				{typeof id === "number" ? (
					<span className={style.id}>#{id}</span>
				) : (
					<span></span>
				)}
			</div>
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
			<div className={style.footer}>
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
				<div className={style.numberContainer}>
					<div className={style.rating}>{rating > 0 ? rating : "??"}</div>
					<div className={style.released}>
						{released ? released : "????-??-??"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Videogame;
