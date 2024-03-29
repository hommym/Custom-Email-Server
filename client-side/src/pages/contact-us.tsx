import React from "react";
import Link from "next/link";

import Staticpage from "@/components/layouts/Staticpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { contactSchema } from "@/libs/hookform";

const contactUs = () => {
	const { register, handleSubmit } = useSelectedPropertiesFromHookForm(contactSchema);

	const sendContactMessage = (data: any) => {
		const { name, email, message } = data;
		console.log({ name, message, email });
	};
	return (
		<Staticpage>
			<main className="flex flex-col items-center justify-center py-24">
				<h3 className="text-deep-text text-4xl mb-8 font-bold">Let's talk</h3>
				<p className="mb-3">
					For most issues, we've prepared our in {""}
					<Link href="/" className="text-deep-text font-bold hover:underline">
						Help Center
					</Link>{" "}
					.
				</p>

				<p className="text-center w-1/2 leading-[30px]">If you still have some questions, don't worry - we have the answers. You can reach out to us directly by completing the form below.</p>

				<section className="w-full h-auto">
					<div className="w-full max-w-6xl mx-auto rounded-[25px] shadow-md h-auto bg-[#F8F8FC] mt-12 py-24">
						<form action="" className="w-[70%] mx-auto" onSubmit={handleSubmit(sendContactMessage)}>
							<div className="flex items-center justify-between gap-4">
								<div className="w-full">
									<label htmlFor="name" className="block mb-[5px] text-deep-text font-medium text-sm">
										Name <span className="text-red-400">*</span>
									</label>
									<input id="name" className="w-full h-12 text-sm px-3 border-[1px] rounded-[5px] " type="text" {...register("name")} />
								</div>
								<div className="w-full">
									<label htmlFor="email" className="block mb-[5px] text-deep-text font-medium text-sm">
										Email <span className="text-red-400">*</span>
									</label>
									<input id="email" className="w-full h-12 text-sm px-3 border-[1px] rounded-[5px] " type="text" {...register("email")} />
								</div>
							</div>

							<div className="mt-8">
								<label htmlFor="message" className="block mb-[5px] text-deep-text font-medium text-sm">
									Message <span className="text-red-400">*</span>
								</label>
								<textarea id="message" className="w-full p-4 text-sm h-48 border-[1px] resize-none rounded-[5px]" {...register("message")}></textarea>
							</div>

							<PrimaryButton text="Send" sx="!w-[150px] !h-[60px] py-4 !font-bold !bg-deep-text !mt-8" type="submit" />
						</form>
					</div>
				</section>
			</main>
		</Staticpage>
	);
};

export default contactUs;
