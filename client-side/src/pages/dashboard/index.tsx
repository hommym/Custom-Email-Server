import React from "react";

import Mainpage from "@/components/layouts/Mainpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";

const index = () => {
	return (
		<Mainpage>
			<main>
				<h3 className="text-3xl mb-4">Hello Ty,</h3>
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
			</main>
		</Mainpage>
	);
};

export default index;
