import React from "react";
import style from "./InputField.module.scss";

const InputField = ({
	label,
	name,
	type,
	placeholder,
	onBlur,
	onChange,
	value,
	error,
}) => {
	return (
		<div className={style.container}>
			<label htmlFor={name} className={style.label}>
				{label}
			</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				className={style.input}
			/>
			{error && <p className={style.error}>{error}</p>}
		</div>
	);
};

export default InputField;
