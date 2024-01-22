import { useDispatch } from "react-redux";
import { orderAbc, orderRating, reset } from "../../redux/actions";

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
		<div>
			<button onClick={handleReset}>Reset</button>
			<button value="A-Z" onClick={handleOrderAbc}>
				A-Z
			</button>
			<button value="Z-A" onClick={handleOrderAbc}>
				Z-A
			</button>
			<button value="0-9" onClick={handleOrderRating}>
				0-99
			</button>
			<button value="9-0" onClick={handleOrderRating}>
				99-0
			</button>
		</div>
	);
};

export default Orders;
