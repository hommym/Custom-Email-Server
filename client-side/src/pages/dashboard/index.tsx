import React from "react";
import Link from "next/link";

import Mainpage from "@/components/layouts/Mainpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import { FaQuestion } from "react-icons/fa6";
import { GrDomain } from "react-icons/gr";
import { FaPaintBrush } from "react-icons/fa";

const index = () => {
	return (
		<Mainpage>
			<main className="py-12 ">
				<h3 className="text-xl text-deep-text mb-4">Hello Ty,</h3>
				<p className="font-bold opacity-80">It's good to have you here!</p>

				<div className="bg-[#EDEEFF] p-5 border-[1px] mt-4 flex items-center justify-between">
					<div className="w-full">
						<h3 className="mb-4">Boost your email deliverability!</h3>
						<p className="text-sm">
							If you want your emails to always reach the inbox - validate your sending domain. It will help email providers recognize your emails as trustworthy and deliver them to your
							subscribers' inboxes. Learn more
						</p>
					</div>
					<PrimaryButton text="Go to Domains" sx="!w-[200px] !font-medium" href="/dashboard/domains" />
				</div>

				<section className="mt-12">
					<h3 className="text-lg text-deep-text font-medium mb-4">
						Integrate your app or website <span className="text-sm opacity-70">(coming soon...)</span>
					</h3>

					<div className="grid grid-cols-2 ">
						<div className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
							<button className="w-10 h-10 flex items-center justify-center">
								<FaPaintBrush />
							</button>
							<p className="font-medium">Connect to SMTP API</p>
						</div>

						<div className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
							<button className="w-10 h-10 flex items-center justify-center">
								<FaQuestion />
							</button>
							<p className="font-medium">Configure Webhooks</p>
						</div>
						<div className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
							<button className="w-10 h-10 flex items-center justify-center">
								<GrDomain />
							</button>
							<p className="font-medium">Connect to HTTP API</p>
						</div>
						<div className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
							<button className="w-10 h-10 flex items-center justify-center">
								<FaQuestion />
							</button>
							<p className="font-medium">Configure inbound processing</p>
						</div>
					</div>
				</section>

				<section className="mt-12">
					<h3 className="text-lg text-deep-text font-medium mb-4">Your quick start guide</h3>

					<Link href="/" className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
						<button className="w-10 h-10 flex items-center justify-center">
							<FaPaintBrush />
						</button>
						<p className="font-medium">Create template</p>
					</Link>
					<Link href="/dashboard/templates/new" className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
						<button className="w-10 h-10 flex items-center justify-center">
							<GrDomain />
						</button>
						<p className="font-medium">Verify Domain</p>
					</Link>
					<Link href="/" className="w-full bg-white hover:bg-[#EDEEFF] p-4 flex items-center justify-start gap-4 shadow-md border-[1px]">
						<button className="w-10 h-10 flex items-center justify-center">
							<FaQuestion />
						</button>
						<p className="font-medium">Get advice</p>
					</Link>
				</section>
			</main>
		</Mainpage>
	);
};

export default index;
