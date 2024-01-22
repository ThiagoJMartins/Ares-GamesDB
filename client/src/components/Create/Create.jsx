import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, postVideogame } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Create = () => {
	const genres = useSelector((state) => state.genres);
	const platforms = useSelector((state) => state.platforms);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getVideogames());
	}, []);

	const [gameData, setGameData] = useState({
		name: "",
		background_image: "",
		description: "",
		released: "",
		metacritic: "",
		platforms: [],
		genres: [],
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (Array.isArray(gameData[name])) {
			if (gameData[name].includes(value)) {
				setGameData({ ...gameData });
			} else {
				setGameData({
					...gameData,
					[name]: [...gameData[name], value],
				});
			}
		} else {
			setGameData({
				...gameData,
				[name]: value,
			});
		}
	};

	const handleBlur = (event) => {
		handleChange(event);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(postVideogame(gameData));
		alert("Videogame successfully created");
	};

	return (
		<form method="post">
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				placeholder="The Witcher 3: Wild Hunt"
				onBlur={handleBlur}
				onChange={handleChange}
				value={gameData.name}
			/>
			<label htmlFor="image">Image</label>
			<input
				type="text"
				name="background_image"
				placeholder="https://example-image.com"
				onBlur={handleBlur}
				onChange={handleChange}
				value={gameData.background_image}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				placeholder="The third game in a series, it holds nothing back..."
				onBlur={handleBlur}
				onChange={handleChange}
				value={gameData.description}
			/>
			<label htmlFor="released_date">Released date</label>
			<input
				type="text"
				name="released"
				placeholder="2015-05-18"
				onBlur={handleBlur}
				onChange={handleChange}
				value={gameData.released}
			/>
			<label htmlFor="rating">Rating</label>
			<input
				type="text"
				name="metacritic"
				placeholder="0-99"
				onBlur={handleBlur}
				onChange={handleChange}
				value={gameData.metacritic}
			/>
			<label htmlFor="platforms">Platforms</label>
			<select id="platsSelect" name="platforms" onChange={handleBlur}>
				<option value="0">Select Platforms</option>
				{platforms.map((platform, index) => {
					return (
						<option key={index} value={platform}>
							{platform}
						</option>
					);
				})}
			</select>
			<label htmlFor="genres">Genres</label>
			<select id="genresSelect" name="genres" onChange={handleBlur}>
				<option value="0">Select Genres</option>
				{genres.map((genre) => {
					return (
						<option key={genre.id} value={genre.name}>
							{genre.name}
						</option>
					);
				})}
			</select>
			<Link to="/home">
				<button type="submit" value="Create" onClick={handleSubmit}>
					Create
				</button>
			</Link>
		</form>
	);
};

export default Create;
