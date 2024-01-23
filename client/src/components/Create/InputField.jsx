import React from "react";

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
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
			/>
			{error && <p>{error}</p>}
		</div>
	);
};

export default InputField;
