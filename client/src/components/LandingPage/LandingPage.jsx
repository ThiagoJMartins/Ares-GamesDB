import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div>
			<Link to="/home">
				<button>HOME</button>
			</Link>
		</div>
	);
};

export default LandingPage;