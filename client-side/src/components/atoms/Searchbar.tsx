import React from "react";

import { IoSearchSharp } from "react-icons/io5";

interface ISearchBar {
	sx?: string;
	placeholder: string;
}

const Searchbar = ({ placeholder }: ISearchBar) => {
	return (
		<div className="w-full flex items-center justify-start h-16 rounded-[5px] gap-4 px-2 border-[1px]">
			<button className="w-8 h-8 flex items-center justify-center">
				<IoSearchSharp className="text-3xl" />
			</button>
			<input type="text" className="w-full h-full focus:outline-0 border-0 text-[20px] " placeholder={placeholder} />
		</div>
	);
};

export default Searchbar;
