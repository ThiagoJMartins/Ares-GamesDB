const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server listening to port ${PORT}`); // eslint-disable-line no-console
	});
});
