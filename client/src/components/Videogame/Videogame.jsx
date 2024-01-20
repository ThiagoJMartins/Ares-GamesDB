import style from "./Videogame.module.scss";

const Videogame = ({ name, image, genres, released_date, rating, id }) => {
	return (
		<div>
			<div>
				<div>
					<span>{name}</span>
					{typeof id === "number" ? <span>#{id}</span> : <span></span>}
				</div>
				{image && <img src={image} alt={name} width="426px" height="240px" />}
				<div>
					{genres &&
						genres.map((genre, index) => {
							return <span key={index}>{genre.name}</span>;
						})}
				</div>
			</div>
		</div>
	);
};

export default Videogame;
