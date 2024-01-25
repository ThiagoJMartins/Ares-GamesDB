const validate = (data, name) => {
	let errors = {};

	const errorMessage = (field, message) => {
		errors[field] = message;
	};

	const isNotEmpty = (field, value) => {
		if (!value) errorMessage(field, `${field} cannot be empty`);
	};

	const isNotEmptyArray = (field, value) => {
		if (!value || value.length === 0)
			errorMessage(field, `${field} must have at least one element selected`);
	};

	const isValidURL = (field, value) => {
		const urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/;
		if (!urlPattern.test(value))
			errorMessage(field, `${field} must be a valid URL`);
	};

	const isInRange = (field, value, min, max) => {
		if (value < min || value > max) {
			errorMessage(field, `${field} must be between ${min} and ${max}`);
		}
	};

	switch (name) {
		case "name":
			isNotEmpty("name", data.name);
			isInRange("name", data.name, 2, 30);
			break;

		case "background_image":
			isNotEmpty("background_image", data.background_image);
			isValidURL("background_image", data.background_image);
			break;

		case "description":
			isNotEmpty("description", data.description);
			isInRange("description", data.description, 10, 250);
			break;

		case "released":
			isNotEmpty("released", data.released);
			break;

		case "metacritic":
			isNotEmpty("metacritic", data.metacritic);
			isInRange("metacritic", data.metacritic, 0, 99);
			break;

		case "platforms":
			isNotEmptyArray("platforms", data.platforms);
			break;

		case "genres":
			isNotEmptyArray("genres", data.genres);
			break;

		default:
			break;
	}

	return errors;
};

export default validate;
