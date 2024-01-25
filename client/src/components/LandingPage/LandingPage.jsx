import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.scss";

const LandingPage = () => {
	return (
		<div className={style.container}>
			<h1>Welcome to Ares-GamesDB</h1>
			<div className={style.hit}>
				<div className={style.p}>
					<p>A comprehensive database of videogames created by Ares WebDev</p>
					<p>Discover, explore, and enjoy a world of gaming experiences.</p>
				</div>
				<img src="./ryu.gif" alt="Ryu" width="100px" />
			</div>
			<Link to="/home">
				<button className={style.start_btn}>Start</button>
			</Link>
		</div>
	);
};

export default LandingPage;
