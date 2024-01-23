import { Link, NavLink } from "react-router-dom";
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
						<NavLink
							to="/create"
							className={style.li}
							activeClassName={style.activeLink}>
							Create
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about"
							className={style.li}
							activeClassName={style.activeLink}>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/home"
							className={style.li}
							activeClassName={style.activeLink}>
							Home
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Nav;
