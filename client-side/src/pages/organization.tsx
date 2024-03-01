import React, { useState } from "react";
import Link from "next/link";

import PrimaryButton from "@/components/atoms/PrimaryButton";

import { IoMdCheckmark } from "react-icons/io";

interface IOrgData {
	name: string;
	employeesCount: number;
	businessType: string;
	logo: string;
}

const organization = () => {
	const [completed, setCompleted] = useState(true);
	const [orgData, setOrgData] = useState<IOrgData>({
		name: "",
		employeesCount: 0,
		businessType: "",
		logo: "",
	});
	return (
		<div className="bg-bg w-full h-auto">
			<section className="w-full max-w-5xl p-12 flex items-center flex-col h-auto mx-auto">
				<div className="flex mb-6 items-center gap-3">
					<div className="w-10 h-10 bg-[green]"></div>
					<h3 className="font-medium text-3xl">Elastic Email</h3>
				</div>

				{!completed && (
					<>
						<div className="flex mb-16 items-center gap-3">
							<h3 className="font-medium text-2xl">Organization Setup</h3>
						</div>

						<div className="w-full h-auto p-6 bg-[#F3F5FF] mt-8 border-[1px] flex items-center justify-between">
							<div className="w-4/5 px-6 h-auto">
								<h3 className="text-xl font-medium mb-2">Hello Ty</h3>
								<p>Let's set up your account. We know your time is valuable, but please fill these up , to continue.</p>
							</div>
							<div className="w-1/5 bg-[red] h-24"></div>
						</div>
						{/* Form */}
						<form className="w-full h-auto p-12 bg-white mt-8 border-[1px] ">
							<div className="relative mb-6">
								<label className="font-medium text-[17px]">Enter Organization's name</label>
								<input type="text" className="w-full h-12 px-2 focus:outline-0 border-[1px] text-sm rounded-[5px]" placeholder="Please enter your company's name" />
							</div>

							<div className="">
								<p className="mb-4 text-[17px] font-medium">How many employees work at your organization?</p>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="employees-count" />
									<label htmlFor="" className="text-[15px] font-light">
										I'm self-employed
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="employees-count" />
									<label htmlFor="" className="text-[15px] font-light">
										2 - 5 people
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="employees-count" />
									<label htmlFor="" className="text-[15px] font-light">
										6 - 10 people
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="employees-count" />
									<label htmlFor="" className="text-[15px] font-light">
										11 - 20 people
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="employees-count" />
									<label htmlFor="" className="text-[15px] font-light">
										more than 21 people
									</label>
								</div>
							</div>

							{/* Kind of busniess */}
							<div className="mt-8">
								<p className="mb-4 text-[17px] font-medium">What kind of business best describes your company?</p>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Blogger or influencer
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										E-commerce business
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Saas Company
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Educational Institution
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Start-up
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Marketing agency
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" />
									<label htmlFor="" className="text-[15px] font-light">
										Non-profit organization
									</label>
								</div>
								<div className="flex items-center gap-2 mb-4">
									<input type="radio" className="h-4 w-4" name="business_type" value={"0"} />
									<label htmlFor="" className="text-[15px] font-light">
										Other
									</label>
								</div>
								{orgData?.businessType === "other" && (
									<div className="relative">
										<p className="absolute right-0 -top-6 opacity-50 text-sm">optional</p>
										<input type="text" className="w-full h-12 px-2 focus:outline-0 border-[1px] text-sm rounded-[5px]" placeholder="Please share your company description" />
									</div>
								)}
							</div>

							{/* Image field */}
							<div className="w-full ">
								<label className="w-full flex items-center">Upload company's logo</label>
								<input type="file" accept="image/*" />
							</div>

							<div className="h-[1px] bg-[rgb(226,232,240)] mt-8"></div>

							<button className="block mt-8 w-[120px] h-12 rounded-[5px] text-white hover:bg-opacity-70 bg-[#32325C] ml-auto">Continue</button>
						</form>
					</>
				)}

				{completed && (
					<>
						<div className="w-48 flex items-center justify-center h-48 rounded-full border-[2px] border-[#32325c] my-16">
							<IoMdCheckmark className="text-5xl" />
						</div>
						<h3 className="text-3xl font-medium mb-5">Welcome to Elastic Email, Ty!</h3>
						<p className="w-3/5 opacity-80 mb-8 text-center">
							We appreciate your input and look forward to working with you. If you have any questions or suggestions, please do not hesitate to{" "}
							<Link href="/contact-us" className="text-sec hover:underline">
								contact us.
							</Link>
						</p>

						<PrimaryButton text="Let's Start" href="/" sx="!w-[120px] " />
					</>
				)}
			</section>
		</div>
	);
};

export default organization;
