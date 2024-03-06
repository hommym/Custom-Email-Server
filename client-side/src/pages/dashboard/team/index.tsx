import React from "react";

import Mainpage from "@/components/layouts/Mainpage";
import Link from "next/link";

const index = () => {
	return (
		<Mainpage>
			<main className="py-6 min-h-[92vh]">
				<div className="flex items-center justify-between">
					<h3 className="text-3xl font-bold">Your Team Members</h3>
					<Link href="/dashboard/team/new" className="w-auto px-4 py-2 border-[1px] rounded-[5px] hover:bg-slate-200">
						Add New Member
					</Link>
				</div>

				<div className="mt-12 flex items-center border-y-[1px] justify-between">
					<div className="w-[10%] text-sm font-bold h-12 flex items-center justify-center border-l-[1px]">Status</div>
					<div className="w-[40%] text-sm font-bold  h-12 flex items-center justify-center border-l-[1px]">Email</div>
					<div className="w-[35%] text-sm font-bold h-12 flex items-center justify-center border-l-[1px]">Fullname</div>
					<div className="w-[25%] text-sm font-bold h-12 flex items-center justify-center border-x-[1px]"></div>
				</div>

				<>
					{[1, 2, 3, 4, 5].map((_it, index) => (
						<div className={`flex items-center border-y-[1px] justify-between`}>
							<div className="w-[10%] text-sm h-12 flex items-center justify-center border-l-[1px]">Status</div>
							<div className="w-[40%] text-sm h-12 flex items-center justify-center border-l-[1px]">Email</div>
							<div className="w-[35%] text-sm h-12 flex items-center justify-center border-l-[1px]">Fullname</div>
							<Link href="/dashboard/team/:memberId/status" className="text-sec hover:underline w-[25%] text-sm h-12 flex items-center justify-center border-x-[1px]">
								Change status
							</Link>
						</div>
					))}
				</>
			</main>
		</Mainpage>
	);
};

export default index;
