import Link from "next/link";
import React from "react";
import Loading from "./Loading";

interface IButton {
	text: string;
	href?: string;
	sx?: string;
	isLoading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit";
	handleClick?: (e: any) => void;
}

const PrimaryButton = ({ href, text, sx = "", disabled, isLoading, type = "button", handleClick }: IButton) => {
	const style = `${sx} w-full flex items-center justify-center ${disabled || isLoading ? "opacity-70 bg-sec" : "bg-sec text-white hover:opacity-70"}  h-12 rounded-[5px] text-white font-light`;
	return (
		<>
			{href && (
				<Link href={href} className={style}>
					{text}
				</Link>
			)}

			{!href && (
				<button className={style} disabled={disabled || isLoading} type={type} onClick={(e) => (handleClick ? handleClick(e) : "")}>
					{isLoading ? <Loading sx="h-7 w-7" stroke="#fff" /> : text}
				</button>
			)}
		</>
	);
};

export default PrimaryButton;
