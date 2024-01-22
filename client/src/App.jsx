import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";

function App() {
	const { pathname } = useLocation();
	return (
		<div>
			{pathname !== "/" && <Nav />}
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/videogame/:id" element={<Detail />} />
				<Route path="/create" element={<Create />} />
			</Routes>
		</div>
	);
}

export default App;
