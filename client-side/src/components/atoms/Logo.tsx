import React from "react";
import Link from "next/link";

import { RxLoop } from "react-icons/rx";

const Logo = ({ sx = "", textSx = "" }: { sx?: string; textSx?: string }) => {
	return (
		<Link href="/" className={`${sx} w-[300px] h-[40px] flex items-center justify-center gap-3`}>
			<div className="w-10 h-10 flex items-center justify-center">
				<RxLoop className="text-3xl text-deep-text" />
			</div>
			<h3 className={`${textSx} text-deep-text font-bold text-[28px]`}>Company Name</h3>
		</Link>
	);
};

export default Logo;
