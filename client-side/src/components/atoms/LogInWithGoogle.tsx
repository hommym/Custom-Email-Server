import React from "react";

import { FcGoogle } from "react-icons/fc";

const LogInWithGoogle = () => {
	return (
		<button className="w-[180px] flex items-center gap-2 mt-5 h-10 p-[3px] bg-[#1a73e8] rounded-[3px] overflow-hidden">
			<div className="w-9 rounded-l-[3px] h-full bg-white flex items-center justify-center">
				<FcGoogle className="text-2xl" />
			</div>
			<p className="text-sm text-white font-medium">Sign in with Google</p>
		</button>
	);
};

export default LogInWithGoogle;
