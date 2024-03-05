import React from "react";

interface LoadingProps {
	stroke?: string;
	sx?: string;
}

const Loading: React.FC<LoadingProps> = ({ stroke = "#2D2F7A", sx = "" }) => {
	return (
		<>
			<div className="w-auto h-auto justify-center items-center">
				<svg className={`animate-spin -ml-1 mr-3 h-10 w-10 text-white ${sx}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="4"></circle>
					<path fill={stroke} d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 018 8h-1.5a.5.5 0 010-1h1a.5.5 0 010 1h-1a8 8 0 01-8-8V2.5a.5.5 0 00-1 0V4a8 8 0 01-8 8z"></path>
				</svg>
			</div>
		</>
	);
};

export default Loading;
