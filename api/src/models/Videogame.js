const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("videogame", {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [2, 30],
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [10, 250],
			},
		},
		platforms: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [2, 30],
			},
		},
		background_image: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true,
			},
		},
		released: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isDate: true,
			},
		},
		metacritic: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
			validate: {
				min: 0,
				max: 99,
			},
		},
	});
};
