import { useDispatch } from "react-redux";
import { orderAbc, orderRating, reset } from "../../redux/actions";
import style from "./Orders.module.scss";

const Orders = () => {
	const dispatch = useDispatch();

	const handleOrderAbc = (event) => {
		dispatch(orderAbc(event.target.value));
	};

	const handleOrderRating = (event) => {
		dispatch(orderRating(event.target.value));
	};

	const handleReset = () => {
		dispatch(reset());
	};

	return (
		<div className={style.buttonContainer}>
			<button onClick={handleReset}>
				<span>Reset</span>
			</button>
			<button value="A-Z" onClick={handleOrderAbc}>
				<span>A-Z</span>{" "}
			</button>
			<button value="Z-A" onClick={handleOrderAbc}>
				<span>Z-A</span>{" "}
			</button>
			<button value="0-9" onClick={handleOrderRating}>
				<span>0-99</span>
			</button>
			<button value="9-0" onClick={handleOrderRating}>
				<span>99-0</span>
			</button>
		</div>
	);
};

export default Orders;
