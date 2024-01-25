import { useDispatch, useSelector } from "react-redux";
import { minPage, advancePage, maxPage } from "../../redux/actions.js";
import style from "./Pagination.module.scss";

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
		<div className={style.container_pagination}>
			<section>
				<button className={style.button_page} onClick={onMinPage}>
					{"|<"}
				</button>
				<button className={style.button_page} onClick={backPage}>
					{"<"}
				</button>
			</section>
			<h3 className={style.page}>{actualPage}</h3>
			<section>
				<button className={style.button_page} onClick={nextPage}>
					{">"}
				</button>
				<button className={style.button_page} onClick={onMaxPage}>
					{">|"}
				</button>
			</section>
		</div>
	);
};

export default Pagination;
