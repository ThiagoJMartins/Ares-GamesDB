import React from "react";

const SelectField = ({
	label,
	name,
	options,
	value,
	onChange,
	onBlur,
	error,
}) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}>
				<option value="0">Select {label}</option>
				{options.map((option, index) => (
					<option key={index} value={option.name ? option.name : option}>
						{option.name ? option.name : option}
					</option>
				))}
			</select>
			{error && <p>{error}</p>}
		</div>
	);
};

export default SelectField;
