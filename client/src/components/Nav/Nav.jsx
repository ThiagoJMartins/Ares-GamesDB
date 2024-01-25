import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
//!----------------------------------------------------+/
import star from "/star.gif";
import style from "./Nav.module.scss";
//!----------------------------------------------------+/

const Nav = () => {
	const { pathname } = useLocation();

	return (
		<div className={style.nav}>
			<Link to="/">
				<img className={style.image} src={star} alt="Ares_GamesDB" />
			</Link>
			{pathname === "/home" && <SearchBar />}
			<div className={style.links}>
				<ul className={style.ul}>
					<li>
						<Link to="/create" className={style.li}>
							Create
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
