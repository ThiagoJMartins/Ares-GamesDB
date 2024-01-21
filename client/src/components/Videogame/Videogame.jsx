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
			{image && <img src={image} alt={name} width="256px" height="144px" />}
			<div className={style.genres}>
				{genres &&
					genres.map((genre) => {
						return <span key={genre.id}>{genre.name ?? genre} </span>;
					})}
			</div>
			<div className={style.released}>{released}</div>
			<div className={style.rating}>{rating}</div>
		</div>
	);
};

export default Videogame;
