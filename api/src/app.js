require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const videogames = require("./routes/videogames.js");
const genres = require("./routes/genre");
const cors = require("cors");
const { ACCEPTED_ORIGINS } = process.env;

require("./db.js");

const server = express();

server.name = "API";

server.disable("x-powered-by");
server.use(morgan("dev"));
server.use(express.json());
server.use(
	cors({
		origin: (origin, callback) => {
			if (ACCEPTED_ORIGINS.includes(origin) || !origin)
				return callback(null, true);
			return callback(new Error("Not autorized access"));
		},
	})
);
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use("/videogames", videogames);
server.use("/genres", genres);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
