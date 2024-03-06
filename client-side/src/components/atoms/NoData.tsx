import React from "react";

import { VscSearchStop } from "react-icons/vsc";

const NoData = () => {
	return (
		<div className="w-full flex h-full flex-col justify-center items-center ">
			<div className="w-32 mb-4 h-32 bg-[#F8F8FC] rounded-full flex items-center justify-center">
				<VscSearchStop className="text-5xl opacity-50" />
			</div>
			<p className="font-medium opacity-90">It looks like there is no data to display.</p>
		</div>
	);
};

export default NoData;
