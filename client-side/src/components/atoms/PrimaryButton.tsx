import Link from "next/link";
import React from "react";

interface IButton {
	text: string;
	href?: string;
	sx?: string;
	isLoading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit";
}

const PrimaryButton = ({ href, text, sx = "", disabled, isLoading, type = "button" }: IButton) => {
	const style = `${sx} w-full flex items-center justify-center ${disabled || isLoading ? "opacity-30 bg-sec" : "bg-sec text-white hover:opacity-70"}  h-12 rounded-[5px] text-white font-light`;
	return (
		<>
			{href && (
				<Link href={href} className={style}>
					{text}
				</Link>
			)}

			{!href && (
				<button className={style} disabled={disabled} type={type}>
					{text}
				</button>
			)}
		</>
	);
};

export default PrimaryButton;
