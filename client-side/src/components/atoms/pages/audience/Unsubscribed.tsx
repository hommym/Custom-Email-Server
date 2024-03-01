import React from "react";

import Searchbar from "../../Searchbar";
import NoData from "../../NoData";

const Unsubscribed = () => {
	return (
		<main className="pb-24">
			{/* Unsubscribed reasons */}
			<div>
				<h3 className="text-4xl">Unsubscribe reasons</h3>

				<div className="mt-10 grid grid-cols-2 bg-white gap-x-16 rounded-[5px] py-12 px-6 pt-6">
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between pb-6">
						<p className="font-bold text-slate-500 text-[16px]">Unknown</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between py-6">
						<p className="font-bold text-slate-500 text-[16px]">Irrelevant content</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between py-6">
						<p className="font-bold text-slate-500 text-[16px]">No longer want</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between py-6">
						<p className="font-bold text-slate-500 text-[16px]">Too frequent</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between py-6">
						<p className="font-bold text-slate-500 text-[16px]">Never consented</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
					<div className="w-full  p-4 border-b-[1px] flex items-center justify-between py-6">
						<p className="font-bold text-slate-500 text-[16px]">Deceptive content</p>
						<p className="text-lg">
							<span className="text-slate-500 font-bold ml-2">0%</span> 0
						</p>
					</div>
				</div>
			</div>

			<div className="mt-12">
				<h3 className="text-4xl">Unsubscribe contacts</h3>
				<section className="mt-10  bg-white  rounded-[5px] py-12 px-6 pt-6">
					<div className="w-full h-12  mb-4 flex items-center justify-between">
						<div className="w-[250px] ">
							<select name="" id="" className="w-full text-xl border-[1px] px-3 rounded-[5px] focus:outline-0 h-16">
								<option value="7days">Last 7 days</option>
								<option value="14_days">Last 14 days</option>
								<option value="30_days">Last 30 days</option>
								<option value="3_months">Last 3 months</option>
								<option value="6_months">Last 6 months</option>
								<option value="1_year">Last 1 year</option>
								<option value="all">All</option>
							</select>
						</div>
						<div className="w-2/5 h-12">
							<Searchbar sx="" placeholder="Search for contact" />
						</div>
					</div>

					<div className="w-full min-h-[50vh] mt-12">
						<div className="w-full flex items-center justify-start border-b-[1px] pb-2 gap-5">
							<p className="w-1/3 opacity-70 font-medium">Email</p>
							<p className="w-1/3 opacity-70 font-medium">Date</p>
							<p className="w-1/3 opacity-70 font-medium">Unsubscribe reason</p>
						</div>

						<div className="w-full h-[50vh]">
							<NoData />
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Unsubscribed;
