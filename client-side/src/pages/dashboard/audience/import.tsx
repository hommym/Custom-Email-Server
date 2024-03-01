import React from "react";
import Link from "next/link";

import Mainpage from "@/components/atoms/layouts/Mainpage";

import { IoIosArrowBack } from "react-icons/io";

const importContacts = () => {
	return (
		<Mainpage>
			<Link href="/dashboard/audience" className="flex items-center gap-4 mt-8 text-lg text-sec">
				<button>
					<IoIosArrowBack className="!text-sec" />
				</button>
				<p className="text-sec">Overview</p>
			</Link>

			<h3 className="mt-6 text-2xl font-bold">Upload contacts</h3>

			<div className="mt-6 w-full border-[1px] bg-white overflow-hidden rounded-[5px] h-auto">
				{/* Step 1  */}
				<div className="bg-white border-b-[1px] flex items-start justify-start gap-8 w-full p-12 h-auto">
					<div className="w-12 h-12 bg-white flex items-center justify-center shadow-md shadow-black rounded-full">
						<p>1</p>
					</div>
					<div className="w-[95%]">
						<div className="w-full border-b-[1px] pb-10">
							<h3 className="text-lg mb-10 font-bold">Confirmation of terms</h3>
							<div className="flex items-center gap-3">
								<input type="checkbox" className="w-6 h-6" />
								<label htmlFor="" className="text-lg">
									I confirm these contacts have consented to receive my communications
								</label>
							</div>
						</div>

						<button className="block w-auto px-10 py-4 ml-auto mt-10 text-white text-lg rounded-[6px] bg-[red]">Continue</button>
					</div>
				</div>
				{/* Step 2 */}
				<div className="bg-white border-b-[1px] flex items-start justify-start gap-8 w-full p-12 h-auto">
					<div className="w-12 h-12 bg-white flex items-center justify-center shadow-md shadow-black rounded-full">
						<p>2</p>
					</div>
					<div className="w-[95%]">
						<div className="w-full border-b-[1px] pb-10">
							<h3 className="text-2xl mb-10 font-bold">How do you want to upload contacts?</h3>
							<div className="flex items-center gap-3 mb-3">
								<input type="radio" className="w-6 h-6" name="upload_format" />
								<label htmlFor="" className="" id="file">
									Upload contacts from file (zip, csv, json, xml)
								</label>
							</div>
							<div className="flex items-center gap-3">
								<input type="radio" className="w-6 h-6" />
								<label htmlFor="" className="">
									Type or copy and paste contacts
								</label>
							</div>
						</div>

						<button className="block w-auto px-10 py-4 ml-auto mt-10 text-white text-lg rounded-[6px] bg-[red]">Continue</button>
					</div>
				</div>
			</div>
		</Mainpage>
	);
};

export default importContacts;
