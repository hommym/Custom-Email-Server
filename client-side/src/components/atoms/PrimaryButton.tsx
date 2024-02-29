import Link from "next/link";
import React from "react";

interface IButton {
	text: string;
	href?: string;
	sx?: string;
	isLoading?: boolean;
	disabled?: boolean;
}

const PrimaryButton = ({ href, text, sx = "", disabled, isLoading }: IButton) => {
	const style = `${sx} w-full ${disabled || isLoading ? "opacity-30 bg-sec" : "bg-sec text-white hover:opacity-70"}  h-12 rounded-[5px] text-white font-bold`;
	return (
		<>
			{href && (
				<Link href={href} className={style}>
					{text}
				</Link>
			)}

			<button className={style} disabled={disabled}>
				{text}
			</button>
		</>
	);
};

export default PrimaryButton;
