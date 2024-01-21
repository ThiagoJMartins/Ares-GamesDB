import { Link } from "react-router-dom";
//!----------------------------------------------------+/
import logo from "/logo.svg";
//!----------------------------------------------------+/

const Nav = () => {
	return (
		<div>
			<div>
				<div>
					<Link to="/">
						<img src={logo} alt="Ares_GamesDB" width="100px" />
					</Link>
					<div>
						<ul>
							<li>
								<Link to="/home">Home</Link>
							</li>
							<li>
								<Link to="/create">Create</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
