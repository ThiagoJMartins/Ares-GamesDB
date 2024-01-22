import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
//!----------------------------------------------------+/
import logo from "/logo.svg";
import style from "./Nav.module.scss";
//!----------------------------------------------------+/

const Nav = () => {
	return (
		<div className={style.nav}>
			<Link to="/">
				<img className={style.image} src={logo} alt="Ares_GamesDB" />
			</Link>
			<SearchBar />
			<div className={style.links}>
				<ul className={style.ul}>
					<li>
						<Link to="/create" className={style.li}>
							Create
						</Link>
					</li>
					<li>
						<Link to="/about" className={style.li}>
							About
						</Link>
					</li>
					<li>
						<Link to="/home" className={style.li}>
							Home
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Nav;
