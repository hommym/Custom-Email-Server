import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useUploadContactsMutation } from "@/apis/usersApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import { IoMdInformationCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFileOn } from "react-icons/ci";

const UploadFile = ({ setStep, setContacts }: { setStep: React.Dispatch<React.SetStateAction<number>>; setContacts: any }) => {
	const [extractContacts, { data, error, isLoading }] = useUploadContactsMutation();
	const [file, setFile] = useState<any>({});
	const getFile = (e: any) => {
		const files = e.target?.files;

		if (!files) {
			return;
		}
		setFile(files[0]);
	};

	const getContactsFromFile = () => {
		extractContacts({ file });
	};

	useEffect(() => {
		if (!data) return;
		setContacts(data?.emailAddresses);
		toast.success("Contacts extracted successfully", { autoClose: 500 });

		setStep((prev) => ++prev);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<>
			<div className="p-5 border-[1px] rounded-[5px] bg-[#F3F5FF] flex items-start justify-start gap-2">
				<button>
					<IoMdInformationCircle className="text-xl text-sec" />
				</button>
				<p className="text-sm">
					We support various formats but for the smoothest performance we recommend .csv file. Make sure that the file has included field labeled 'email' and an optional 'category' field for
					grouping
				</p>
			</div>
			<div className="border-dashed border-[1px]  h-auto mt-4 rounded-[5px]">
				{!file?.name && (
					<>
						<label className="w-full flex hover:cursor-pointer h-[40vh] items-center justify-center flex-col" htmlFor="emailFile">
							<div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
								<AiOutlinePlus />
							</div>
							<p className="mt-3">Upload a file</p>
						</label>
						<input type="file" accept=".csv , .json" id="emailFile" className="hidden" onChange={getFile} />
					</>
				)}
				{file?.name && (
					<div className="w-full h-[30vh] flex items-center p-4 justify-center">
						<div className="w-full h-12 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<CiFileOn className="text-sec text-xl" />
								<p className="opacity-90 text-sm"> {file?.name}</p>
							</div>
							<button className="p-2 rounded-full hover:bg-slate-200 text-xl" onClick={() => setFile({})}>
								<IoClose />
							</button>
						</div>
					</div>
				)}
			</div>
			<div className="flex items-center justify-end mt-10 gap-4 w-auto">
				<button className="block w-auto px-8 py-3 text-sec rounded-[6px] bg-transparent hover:opacity-50" onClick={() => setStep((prev) => --prev)}>
					Back
				</button>
				<button className={`${!file ? "opacity-50" : "hover:opacity-80"} block w-auto px-8 py-3 text-white rounded-[6px] bg-[#32325c] `} disabled={!file} onClick={getContactsFromFile}>
					Continue
				</button>
			</div>
		</>
	);
};

export default UploadFile;
