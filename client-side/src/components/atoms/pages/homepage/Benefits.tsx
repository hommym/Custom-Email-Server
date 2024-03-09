import React, { useState } from "react";
import Image from "next/image";

import PrimaryButton from "../../PrimaryButton";

import SendEmailsImage from "@/assets/send-email.webp";
import GrowAudienceImage from "@/assets/grow-audience.webp";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

const Benefits = () => {
	const [active, setActive] = useState(0);
	const user = useSelector(useUserSlice);
	return (
		<section className=" max-w-6xl  mx-auto w-full h-auto py-24 flex items-stretch  justify-between gap-6">
			<article className="w-1/5">
				{["Send Email", "Grow your audience"].map((benefit, index) => (
					<button key={index} className="w-full rounded-[5px] h-16 overflow-hidden gap-4 bg-white shadow-2xl mb-4 flex items-center justify-start" onClick={() => setActive(index)}>
						<div className={`w-3 h-full ${active === index ? "bg-sec" : "bg-transparent"}`}></div>
						<p className={`${active === index ? "font-black text-deep-text text-[18px]" : ""}`}>{benefit}</p>
					</button>
				))}
			</article>
			<article className="w-4/5 bg-white rounded-l-[20px] p-8">
				{active === 0 && (
					<div className="w-full h-full flex items-start justify-between gap-8">
						<div className="w-1/2 h-full ">
							<h3 className="text-4xl text-deep-text font-black mb-8">Send your emails reliably in seconds</h3>
							<p className="opacity-90 mb-12 leading-[30px]">
								Creating and sending emails has never been easier! You can send the right message at the right time with just a few clicks. Thanks to our robust delivery engine, you
								can be sure your emails reach the inbox. Create your campaigns manually with our intuitive campaign creator or send an automated workflow that can manage your email
								sends.
							</p>

							<PrimaryButton text="Try for free" href={user?._id ? "/dashboard" : "/create-account"} sx="!w-[150px] !font-bold" />
						</div>

						<div className="w-1/2 h-full  relative">
							<Image src={SendEmailsImage} alt="Send Emails" fill />
						</div>
					</div>
				)}
				{active === 1 && (
					<div className="w-full h-full flex items-start justify-between gap-8">
						<div className="w-1/2 h-full ">
							<h3 className="text-4xl text-deep-text font-black mb-8">Build meaningful connections seamlessly</h3>
							<p className="opacity-90 mb-12 leading-[30px]">
								Deliver the true value of your business to the right audience with our easy-to-use landing pages or web forms. No coding skills required, access to a gallery full of
								pre-designed templates, and just two steps to share your new touchpoints to connect with your ideal customer anywhere. You can mix it with our powerful email
								automations for even better results.
							</p>

							<PrimaryButton text="Try for free" href={user?._id ? "/dashboard/audience" : "/create-account"} sx="!w-[150px] !font-bold" />
						</div>

						<div className="w-1/2 h-full  relative">
							<Image src={GrowAudienceImage} alt="Grow Audience" fill />
						</div>
					</div>
				)}
			</article>
		</section>
	);
};

export default Benefits;
