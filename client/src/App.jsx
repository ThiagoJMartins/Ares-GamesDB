import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Home from "./components/Home/Home";

function App() {
	const { pathname } = useLocation();
	return (
		<div>
			{pathname !== "/" && <Nav />}
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	);
}

export default App;
