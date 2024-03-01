import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { VscSettingsGear } from "react-icons/vsc";
import { HiMiniHomeModern } from "react-icons/hi2";
import { LuActivity } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";

const Mainpage = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useRouter();
	return (
		<div className="w-full h-screen flex items-start justify-start">
			{/* Navbar */}
			<aside className="w-1/5 h-screen border-r-[1px] pt-4 pr-0">
				<div className="w-full h-[15%] pl-8  flex items-center justify-start  gap-3">
					<button className="w-8 h-8 bg-[red]"></button>
					<Link href="/" className="text-[18px] font-medium">
						Elastic Email
					</Link>
				</div>
				<nav className="w-full h-[70%] pl-8  overflow-y-auto">
					<Link href="/dashboard" className={`"w-full mb-5 flex items-center gap-4 ${pathname === "/dashboard" ? "bg-sec active" : "bg-slate-100"} p-4 rounded-l-full`}>
						<span className="w-8 h-8 flex items-center justify-center">
							<HiMiniHomeModern className="text-2xl" />
						</span>
						<p>Start</p>
					</Link>
					<Link
						href="/dashboard/activity"
						className={`"w-full mb-5 flex items-center gap-4 ${pathname.startsWith("/dashboard/activity") ? "bg-sec active" : "bg-slate-100"} p-4 rounded-l-full`}>
						<span className="w-reen] flex items-center justify-center">
							<LuActivity className="text-2xl" />
						</span>
						<p>Activity</p>
					</Link>

					<Link
						href="/dashboard/audience"
						className={`"w-full mb-5 flex items-center gap-4 ${pathname.startsWith("/dashboard/audience") ? "bg-sec active" : "bg-slate-100"} p-4 rounded-l-full`}>
						<span className="w-reen] flex items-center justify-center">
							<IoPeopleSharp className="text-2xl" />
						</span>
						<p>Audience</p>
					</Link>

					<Link
						href="/dashboard/settings"
						className={`"w-full mb-5 flex items-center gap-4 ${pathname.startsWith("/dashboard/settings") ? "bg-sec active" : "bg-slate-100"} p-4 rounded-l-full`}>
						<span className="w-8 h-8 flex items-center justify-center">
							<VscSettingsGear className="text-2xl" />
						</span>
						<p>Settings</p>
					</Link>
				</nav>
				<div className="w-full flex items-center justify-start pl-6 gap-6 h-[15%] bg-[#F3F5FF]">
					<div className="w-12 flex items-center justify-center h-12 text-white bg-[#7E81FF] rounded-full"> T </div>
					<p className="text-xl font-medium">Ty</p>
				</div>
			</aside>
			<section className="w-4/5 h-screen overflow-auto">
				<div className="p-4 min-h-[90vh] bg-[#F3F5F8]">{children}</div>
			</section>
		</div>
	);
};

export default Mainpage;
