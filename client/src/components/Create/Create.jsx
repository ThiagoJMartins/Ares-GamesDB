import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, postVideogame } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validate from "../../utils/validate.js";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";
import style from "./Create.module.scss";

const Create = () => {
	const genres = useSelector((state) => state.genres);
	const platforms = useSelector((state) => state.platforms);
	const dispatch = useDispatch();

	const initialValues = {
		name: "",
		background_image: "",
		description: "",
		released: "",
		metacritic: "",
		platforms: [],
		genres: [],
	};

	const [gameData, setGameData] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [hasErrors, setHasErrors] = useState(true);

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (Array.isArray(gameData[name])) {
			setGameData({
				...gameData,
				[name]: gameData[name].includes(value)
					? [...gameData[name]]
					: [...gameData[name], value],
			});
		} else {
			setGameData({
				...gameData,
				[name]: value,
			});
		}
		const fieldErrors = validate(gameData, name, value);
		setErrors({
			...errors,
			[name]: fieldErrors[name],
		});

		setHasErrors(
			Object.values({ ...errors, [name]: fieldErrors[name] }).some(
				(fieldErrors) => !!fieldErrors
			)
		);
	};

	const handleSubmit = () => {
		const formErrors = validate(gameData);
		setErrors(formErrors);

		if (Object.values(formErrors).every((fieldErrors) => !fieldErrors)) {
			dispatch(postVideogame(gameData));
			alert("Videogame successfully created");
		}
	};

	const handleBlur = (event) => {
		const { name, value } = event.target;
		const fieldErrors = validate(gameData, name, value);
		setErrors({
			...errors,
			[name]: fieldErrors[name],
		});

		setHasErrors(
			Object.values({ ...errors, [name]: fieldErrors[name] }).some(
				(fieldErrors) => !!fieldErrors
			)
		);
	};

	return (
		<form method="post" className={style.container}>
			<div className={style.formContainer}>
				<InputField
					label="Name"
					name="name"
					type="text"
					placeholder="The-Witcher-3:-Wild-Hunt"
					onBlur={handleChange}
					onChange={handleChange}
					value={gameData.name}
					error={errors.name}
				/>
				<InputField
					label="Image"
					name="background_image"
					type="text"
					placeholder="https://example-image.com"
					onBlur={handleChange}
					onChange={handleChange}
					value={gameData.background_image}
					error={errors.background_image}
				/>
				<InputField
					label="Description"
					name="description"
					type="text"
					placeholder="The third game in a series, it holds nothing back..."
					onBlur={handleChange}
					onChange={handleChange}
					value={gameData.description}
					error={errors.description}
				/>
				<InputField
					label="Released Date"
					name="released"
					type="text"
					placeholder="2015-05-18"
					onBlur={handleChange}
					onChange={handleChange}
					value={gameData.released}
					error={errors.released}
				/>
				<InputField
					label="Rating"
					name="metacritic"
					type="number"
					placeholder="0 - 99"
					onBlur={handleChange}
					onChange={handleChange}
					value={gameData.metacritic}
					error={errors.metacritic}
				/>
				<SelectField
					label="Platforms"
					name="platforms"
					options={platforms}
					value={gameData.platforms[0] || "0"}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.platforms}
				/>
				{gameData.platforms?.map((plat, index) => {
					return (
						<sub className={style.render} key={index}>
							{plat}
						</sub>
					);
				})}
				<SelectField
					label="Genres"
					name="genres"
					options={genres}
					value={gameData.genres[0] || "0"}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.genres}
				/>
				{gameData.genres?.map((genre, index) => {
					return (
						<sub className={style.render} key={index}>
							{genre}
						</sub>
					);
				})}
				<Link to="/home">
					<button
						className={style.button}
						type="submit"
						onClick={handleSubmit}
						disabled={hasErrors}>
						Create
					</button>
				</Link>
			</div>
		</form>
	);
};

export default Create;
