import React, { useState } from "react";

import Mainpage from "@/components/atoms/layouts/Mainpage";
import Overview from "@/components/atoms/pages/audience/Overview";
import Unsubscribed from "@/components/atoms/pages/audience/Unsubscribed";

const index = () => {
	const [tab, setTab] = useState("unsubscribed");
	return (
		<Mainpage>
			<div className="w-full h-auto mt-7 flex items-center justify-between">
				<h3 className="text-4xl font-medium">Contacts</h3>
				{tab === "overview" && <button className="w-auto px-4 py-3 bg-[#32325c] rounded-[3px] text-xl font-medium text-white ">Add Contact</button>}
			</div>

			<nav className="w-full h-12 mt-4 border-b-[1px] flex items-center justify-start gap-4 ">
				<button className={`w-auto h-[calc(100%+2px)] text-xl font-medium px-4 border-b-[3px] ${tab === "overview" ? "border-sec" : "border-transparent"}`} onClick={() => setTab("overview")}>
					Overview
				</button>
				<button className={`w-auto h-[calc(100%+2px)] text-xl font-medium px-4 border-b-[3px] ${tab === "lists" ? "border-sec" : "border-transparent"}`} onClick={() => setTab("lists")}>
					Lists
				</button>
				<button
					className={`w-auto h-[calc(100%+2px)] text-xl font-medium px-4 border-b-[3px] ${tab === "unsubscribed" ? "border-sec" : "border-transparent"}`}
					onClick={() => setTab("unsubscribed")}>
					Unsubscribed
				</button>
			</nav>

			{/* Pages */}
			<div className="mt-12">
				{tab === "overview" && <Overview />}
				{tab === "unsubscribed" && <Unsubscribed />}
			</div>
		</Mainpage>
	);
};

export default index;
