import React, { ReactNode } from "react";

import Header from "../molecules/Header";

const Staticpage = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full min-h-screen relative">
			<Header />
			{children}
			<footer className="bg-[#F8F8FC] h-auto py-4 relative pb-20">
				<div className="w-full max-w-5xl mx-auto flex items-center justify-between">
					<p className="text-sm"> &copy; Company Name Inc, 2024</p>
				</div>
			</footer>
		</div>
	);
};

export default Staticpage;
