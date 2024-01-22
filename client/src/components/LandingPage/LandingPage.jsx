import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div>
			<span>Welcome to Ares-GamesDB</span>
			<p>A database of videogames create by Ares WebDev</p>
			<Link to="/home">
				<button>HOME</button>
			</Link>
		</div>
	);
};

export default LandingPage;
