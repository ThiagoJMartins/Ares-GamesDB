import { useDispatch, useSelector } from "react-redux";
import { minPage, advancePage, maxPage } from "../../redux/actions.js";

const Pagination = () => {
	const actualPage = useSelector((state) => state.actualPage);
	const dispatch = useDispatch();

	function backPage(e) {
		dispatch(advancePage(-1));
	}

	function nextPage(e) {
		dispatch(advancePage(1));
	}

	function onMaxPage(e) {
		dispatch(maxPage());
	}

	function onMinPage(e) {
		dispatch(minPage());
	}

	return (
		<div>
			<section>
				<button onClick={onMinPage}>{"|<"}</button>
				<button onClick={backPage}>{"<"}</button>
			</section>
			<h3>{actualPage}</h3>
			<section>
				<button onClick={nextPage}>{">"}</button>
				<button onClick={onMaxPage}>{">|"}</button>
			</section>
		</div>
	);
};

export default Pagination;
