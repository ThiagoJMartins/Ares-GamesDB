import React from "react";
import style from "./SelectField.module.scss";

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
		<div className={style.container}>
			<label htmlFor={name} className={style.label}>
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={style.select}>
				<option className={style.option} value="0">
					Select {label}
				</option>
				{options.map((option, index) => (
					<option
						className={style.option}
						key={index}
						value={option.name ? option.name : option}>
						{option.name ? option.name : option}
					</option>
				))}
			</select>
			{error && <p className={style.error}>{error}</p>}
		</div>
	);
};

export default SelectField;
