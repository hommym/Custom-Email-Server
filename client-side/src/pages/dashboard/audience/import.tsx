import React, { useState } from "react";
import Link from "next/link";

import Mainpage from "@/components/layouts/Mainpage";
import UploadFile from "@/components/atoms/pages/audience/upload/UploadFile";
import PasteEmails from "@/components/atoms/pages/audience/upload/PasteEmails";

import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";

export interface IContact {
	email: string;
	category: string;
}

const importContacts = () => {
	const [terms, setTerms] = useState(false);
	const [step, setStep] = useState(1);
	const [format, setFormat] = useState<"file" | "text" | "">("");
	const [contacts, setContacts] = useState<IContact[]>([]);

	const changeFormat = (e: any) => {
		setFormat(e.target.id);
	};

	return (
		<Mainpage>
			<main className="pb-12">
				<Link href="/dashboard/audience" className="flex items-center gap-4 mt-8 text-lg text-sec">
					<button>
						<IoIosArrowBack className="!text-sec" />
					</button>
					<p className="text-sec">Overview</p>
				</Link>

				<h3 className="mt-6 text-2xl font-bold">Upload contacts</h3>

				<div className="mt-6 w-full border-[1px] bg-white overflow-hidden rounded-[5px] h-auto">
					{/* Step 1  */}
					<div className={`${step === 1 ? "bg-white" : "bg-[#F7FAFC] py-8"} border-b-[1px] flex items-start justify-start gap-8 w-full p-12 h-auto`}>
						<div className={`w-10 h-10 ${step !== 1 ? "bg-[#C6F6D5]" : "bg-white"} flex items-center justify-center shadow-md shadow-slate-500 rounded-full`}>
							{step === 1 && <p>1</p>}
							{step !== 1 && <IoMdCheckmark />}
						</div>
						<div className={`w-[95%] ${step === 1 ? "h-auto" : "h-8"} overflow-hidden`}>
							<div className="w-full mt-2 border-b-[1px] pb-10">
								<h3 className="text-lg mb-10 font-bold">Confirmation of terms</h3>
								<div className="flex items-center gap-3">
									<input type="checkbox" className="w-4 h-4" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
									<label htmlFor="" className="text-lg">
										I confirm these contacts have consented to receive my communications
									</label>
								</div>
							</div>
							<button
								className={`${!terms ? "opacity-40" : "hover:opacity-80"} block w-auto px-8 py-3 ml-auto mt-10 text-white rounded-[6px] bg-[#32325c] `}
								disabled={!terms}
								onClick={() => setStep((prev) => ++prev)}>
								Continue
							</button>
						</div>
					</div>
					{/* Step 2 */}
					<div className={`${step <= 2 ? "bg-white" : "bg-[#F7FAFC] py-12"}  py-8 border-b-[1px] flex items-start justify-start gap-8 w-full px-12 h-auto`}>
						<div className={`w-10 h-10 ${step > 2 ? "bg-[#C6F6D5]" : "bg-white"} flex items-center justify-center shadow-md shadow-slate-500 rounded-full`}>
							{step <= 2 && <p>2</p>}
							{step > 2 && <IoMdCheckmark />}
						</div>
						<div className={`w-[95%] ${step == 2 ? "h-auto" : "h-8"} overflow-hidden`}>
							<div className="w-full mt-2 border-b-[1px] pb-10">
								<h3 className="text-lg mb-10 font-bold">How do you want to upload contacts?</h3>
								<div className="flex items-center gap-3 mb-3">
									<input type="radio" className="w-4 h-4" name="upload_format" id="file" checked={format === "file"} onChange={changeFormat} />
									<label htmlFor="file" className="" id="file">
										Upload contacts from file (csv, json)
									</label>
								</div>
								<div className="flex items-center gap-3">
									<input type="radio" className="w-4 h-4" name="upload_format" id="text" checked={format === "text"} onChange={changeFormat} />
									<label htmlFor="text" className="">
										Type or copy and paste contacts
									</label>
								</div>
							</div>
							<div className="flex items-center justify-end mt-10 gap-4 w-auto">
								<button className="block w-auto px-8 py-3 text-sec rounded-[6px] bg-transparent hover:opacity-50" onClick={() => setStep((prev) => --prev)}>
									Back
								</button>
								<button
									className={`${!format ? "opacity-50" : "hover:opacity-80"} block w-auto px-8 py-3 text-white rounded-[6px] bg-[#32325c] `}
									disabled={!format}
									onClick={() => setStep((prev) => ++prev)}>
									Continue
								</button>
							</div>
						</div>
					</div>
					{/* Step 3 */}
					<div className="bg-white border-b-[1px] flex items-start justify-start gap-8 w-full p-12 h-auto">
						<div className={`w-10 h-10 ${step > 3 ? "bg-[#C6F6D5]" : "bg-white"} flex items-center justify-center shadow-md shadow-slate-500 rounded-full`}>
							{step <= 3 && <p>3</p>}
							{step > 3 && <IoMdCheckmark />}
						</div>
						<div className={`w-[95%] ${step == 3 ? "h-auto" : "h-8"} overflow-hidden`}>
							<h3 className="text-lg mb-10 mt-2 font-bold">Add contacts</h3>
							<div>
								{/* For uploading a file  */}
								{format === "file" && <UploadFile setStep={setStep} setContacts={setContacts} />}

								{/* For pasting contacts */}
								{format === "text" && <PasteEmails setStep={setStep} setContacts={setContacts} />}
								<></>
							</div>
						</div>
					</div>

					{/* Step 4 */}
					<div className="bg-white border-b-[1px] flex items-start justify-start gap-8 w-full p-12 h-auto">
						<div className={`w-10 h-10 ${step > 4 ? "bg-[#C6F6D5]" : "bg-white"} flex items-center justify-center shadow-md shadow-slate-500 rounded-full`}>
							{step <= 4 && <p>4</p>}
							{step > 4 && <IoMdCheckmark />}
						</div>
						<div className={`w-[95%] ${step == 4 ? "h-auto" : "h-8"} overflow-hidden`}>
							<h3 className="text-lg mb-10 mt-2 font-bold">Contact fields</h3>
							<div className="pb-6 border-b-[1px]">
								<p className="w-full text-sm opacity-90">
									We found <span>{contacts?.length} </span> contact(s)
								</p>
							</div>
							<div className="flex items-center justify-end mt-10 gap-4 w-auto">
								<button className="block w-auto px-8 py-3 text-sec rounded-[6px] bg-transparent hover:opacity-50" onClick={() => setStep((prev) => --prev)}>
									Back
								</button>
								<button
									className={`${!format ? "opacity-50" : "hover:opacity-80"} block w-auto px-8 py-3 text-white rounded-[6px] bg-[#32325c] `}
									disabled={!format}
									onClick={() => setStep((prev) => ++prev)}>
									Continue
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Mainpage>
	);
};

export default importContacts;
