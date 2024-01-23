import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div>
			<h1>Welcome to Ares-GamesDB</h1>
			<p>A comprehensive database of videogames created by Ares WebDev</p>
			<p>Discover, explore, and enjoy a world of gaming experiences.</p>
			<Link to="/home">
				<button>Explore Now</button>
			</Link>
		</div>
	);
};

export default LandingPage;
