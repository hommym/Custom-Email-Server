import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../atoms/Logo";
import ProtectedRoute from "../molecules/ProtectedRoute";

import { VscSettingsGear } from "react-icons/vsc";
import { HiMiniHomeModern } from "react-icons/hi2";
import { LuActivity } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";
import { GiTeamIdea } from "react-icons/gi";
import { FaPaintBrush } from "react-icons/fa";

const Component = ({ children }: { children: React.ReactNode; isAdmin?: boolean }) => {
	const { pathname } = useRouter();
	return (
		<div className="w-full h-screen flex items-start justify-start">
			{/* Navbar */}
			<aside className="w-1/5 h-screen border-r-[1px] pt-4 pr-0">
				<div className="w-full h-[15%] pl-8  flex items-center justify-start  gap-3">
					<Logo sx="w-auto !text-sm" textSx="!text-lg" />
				</div>
				<nav className="w-full h-[70%] pl-8  overflow-y-auto main">
					<Link href="/dashboard" className={`"w-full mb-5 flex items-center gap-2 ${pathname === "/dashboard" ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="w-8 h-8 flex items-center justify-center">
							<HiMiniHomeModern className="text-lg" />
						</span>
						<p className="text-[15px]">Start </p>
					</Link>
					<Link
						href="/dashboard/team"
						className={`"w-full mb-5 flex items-center gap-2 ${pathname.startsWith("/dashboard/team") ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="w-8 h-8 flex items-center justify-center">
							<GiTeamIdea className="text-lg" />
						</span>
						<p className="text-[15px]">My Team </p>
					</Link>
					<Link
						href="/dashboard/activity"
						className={`"w-full mb-5 flex items-center gap-2 ${pathname.startsWith("/dashboard/activity") ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="h-8 w-8 flex items-center justify-center">
							<LuActivity className="text-lg" />
						</span>
						<p className="text-[15px]">Activity</p>
					</Link>

					<Link
						href="/dashboard/audience"
						className={`"w-full mb-5 flex items-center gap-2 ${pathname.startsWith("/dashboard/audience") ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="h-8 w-8 flex items-center justify-center">
							<IoPeopleSharp className="text-lg" />
						</span>
						<p className="text-[15px]">Audience</p>
					</Link>

					<Link
						href="/dashboard/templates"
						className={`"w-full mb-5 flex items-center gap-2 ${pathname.startsWith("/dashboard/templates") ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="h-8 w-8 flex items-center justify-center">
							<FaPaintBrush className="text-lg" />
						</span>
						<p className="text-[15px]">Templates</p>
					</Link>

					<Link
						href="/dashboard/settings"
						className={`"w-full flex items-center gap-2 ${pathname.startsWith("/dashboard/settings") ? "bg-sec active" : "bg-slate-100"} px-4 py-2 rounded-l-full`}>
						<span className="w-8 h-8 flex items-center justify-center">
							<VscSettingsGear className="text-lg" />
						</span>
						<p className="text-[15px]">Settings</p>
					</Link>
				</nav>
				<div className="w-full flex items-center justify-start pl-6 gap-6 h-[15%] bg-[#F3F5FF]">
					<div className="w-12 flex items-center justify-center h-12 text-white bg-[#7E81FF] rounded-full"> T </div>
					<p className="text-xl font-medium">Ty</p>
				</div>
			</aside>
			<section className="w-4/5 h-screen overflow-auto">
				<div className="p-6 px-10 min-h-[90vh] bg-[#F3F5F8]">{children}</div>
			</section>
		</div>
	);
};

const Mainpage = ({ children, isAdmin = false, orgPage = false }: { children: ReactNode; isAdmin?: boolean; orgPage?: boolean }) => {
	return (
		<ProtectedRoute loginRequired={true} isAdmin={isAdmin} orgPage={orgPage}>
			<Component isAdmin={isAdmin}>{children}</Component>
		</ProtectedRoute>
	);
};

export default Mainpage;
