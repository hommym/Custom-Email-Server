import React from "react";
import Link from "next/link";

import { GiProgression } from "react-icons/gi";

const Overview = () => {
	return (
		<main className="flex pb-12  w-full justify-between gap-8 items-stretch ">
			<article className="w-2/5 h-auto">
				{/* Summary */}
				<section className="w-full bg-white rounded-[5px] h-auto border-[1px]">
					<div className="py-6 px-8 border-b-[1px]">
						<h3 className="font-medium text-xl">Summary</h3>
					</div>

					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<div className="w-1/2 ">
							<h3 className="text-xl font-medium mb-2">0</h3>
							<p className="text-[16px] text-sec">All contacts</p>
						</div>
						<div className="w-1/2">
							<h3 className="text-xl font-medium mb-2">0</h3>
							<p className="text-sm">Subscribed</p>
						</div>
					</div>
					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<p>New Contacts Today</p>
						<p className="text-[18px]">0</p>
					</div>
				</section>

				{/* Recent growth */}
				<section className="w-full mt-8 bg-white rounded-[5px] h-auto border-[1px]">
					<div className="py-6 px-8 border-b-[1px]">
						<h3 className="font-medium text-xl">Recent growth</h3>
						<p className="text-sm opacity-90">Changes in audience in the last 30 days.</p>
					</div>

					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<p>New Contacts</p>
						<p className="text-[18px]">0</p>
					</div>
					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<p>Unsubscribed</p>
						<p className="text-[18px]">0</p>
					</div>
				</section>

				{/* Audience performance */}
				<section className="w-full mt-8 bg-white rounded-[5px] h-auto border-[1px]">
					<div className="py-6 px-8 border-b-[1px]">
						<h3 className="font-medium text-xl">Audience performance</h3>
						<p className="text-sm opacity-90">Last 6 months.</p>
					</div>

					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<p>Avg. open rate</p>
						<p className="text-[18px]">
							<span className="text-[16px]">0.00</span> %
						</p>
					</div>
					<div className="py-6 px-8 border-b-[1px] flex items-end justify-between gap-4">
						<p>Avg. click rate</p>
						<p className="text-[18px]">
							<span className="text-[16px]">0.00</span> %
						</p>
					</div>
				</section>
			</article>

			<article className="w-3/5">
				{/* Contact growth */}
				<section className="w-full bg-white rounded-[5px] h-[70vh] border-[1px]">
					<div className="py-6 px-8 border-b-[1px] flex items-center justify-between">
						<h3 className="font-medium text-xl">Contacts growth</h3>
						<p className="w-auto px-2 py-[2px] rounded-full text-sm bg-slate-200">In last 6 months</p>
					</div>

					<div className=""></div>
				</section>

				<section className="w-full mt-6 rounded-[5px] border-[1px] gap-2 bg-white h-auto">
					<div className="px-8 bg-[#EAECFB] py-8 gap-3 flex items-stretch justify-between">
						<div className="w-3/5">
							<h3 className="text-xl mb-2 font-medium">Account storage</h3>
							<p className="text-[16px]">
								Each upload of your contacts will consume your storage limit.{" "}
								<Link href="/" className="text-sec font-medium hover:underline">
									Upgrade
								</Link>{" "}
								your current plan to increase the limit.
							</p>
						</div>
						<div className="w-2/5 flex items-center justify-center h-auto">
							<GiProgression className="text-7xl opacity-80" />
						</div>
					</div>
					<div className="w-full p-8">
						<div className="flex mb-3 items-stretch justify-between">
							<div className="w-3/5">
								<p className="text-[18px]">Contacts limits</p>
							</div>
							<p>
								<span>0</span> of 1,000
							</p>
						</div>
						<div className="w-full h-[5px] rounded-full bg-slate-200">
							<div className="h-full bg-sec rounded-full" style={{ width: `${60}%` }}></div>
						</div>
					</div>
				</section>
			</article>
		</main>
	);
};

export default Overview;
