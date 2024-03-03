import React, { useState } from "react";
import { IContact } from "@/pages/dashboard/audience/import";

export interface IPostEmail {
	setStep: React.Dispatch<React.SetStateAction<number>>;
	setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}

const PasteEmails = ({ setStep, setContacts }: IPostEmail) => {
	const [text, setText] = useState("");

	const proceedStep = () => {
		let newText = text.split(",");
		let contacts = newText.filter((contact) => contact).map((contact) => ({ email: contact, category: "all" }));
		setContacts(contacts);
		setStep((prev) => ++prev);
	};
	return (
		<>
			<div className="h-auto mt-4 rounded-[5px]">
				<>
					<label className="w-full text-sm opacity-90 font-medium" htmlFor="contactsList">
						Type or copy and paste contacts. Please separate each by a comma
					</label>
					<textarea
						className="w-full h-24 border-[1px] outline-sec mt-2 rounded-[5px] p-3 opacity-90 text-sm resize-none"
						id="contactsList"
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
				</>
			</div>
			<div className="flex items-center justify-end mt-10 gap-4 w-auto">
				<button className="block w-auto px-8 py-3 text-sec rounded-[6px] bg-transparent hover:opacity-50" onClick={() => setStep((prev) => --prev)}>
					Back
				</button>
				<button className={`${!text ? "opacity-50" : "hover:opacity-80"} block w-auto px-8 py-3 text-white rounded-[6px] bg-[#32325c] `} disabled={!text} onClick={proceedStep}>
					Continue
				</button>
			</div>
		</>
	);
};

export default PasteEmails;
