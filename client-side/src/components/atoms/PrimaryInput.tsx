import { register } from "module";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

interface IInput {
	name: string;
	label: string;
	// register: any;
	type?: string;
	id: string;
	errorMsg?: boolean;
}

const PrimaryInput = ({ id, name, label, type = "text", errorMsg }: IInput) => {
	const [actualType, setActualType] = useState(type);

	const toggleType = () => {
		setActualType((prev) => (prev === "text" ? "password" : "text"));
	};
	return (
		<div className="w-full mb-6">
			<label htmlFor={id} className="block font-medium">
				{label}
			</label>
			<div className="w-full bg-[red] rounded-full flex items-center relative justify-between">
				<input type={actualType} className="w-full rounded-[5px] relative  h-12 border-[1px] px-2"></input>
				{type === "password" && (
					<button
						type="button"
						className="w-8 h-8 bg-transparent rounded-full transition-all duration-100 hover:bg-slate-200 absolute z-[2] right-1 flex items-center justify-center text-[]"
						onClick={toggleType}>
						{actualType === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				)}
			</div>
			{errorMsg && <p>This is a test</p>}
		</div>
	);
};

export default PrimaryInput;
