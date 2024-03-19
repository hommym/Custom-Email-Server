import { IPricing } from "@/pages/pricings";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

import PrimaryButton from "../atoms/PrimaryButton";

import { IoCheckmark } from "react-icons/io5";
import { useLazyCreateSubscriptionSessionQuery } from "@/apis/stripeApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

interface IPricingCard extends IPricing {
	priceId: any;
}

const PricingCard = ({ name, desc, contacts, emails, amount, features, priceId }: IPricingCard) => {
	const user = useSelector(useUserSlice);

	const [createSession, { data, error, isLoading }] = useLazyCreateSubscriptionSessionQuery();

	const planManagement = () => {
		createSession({ priceId });
	};

	useEffect(() => {
		if (!data) return;
		window.location.href = data.url;
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<div className="w-full bg-white shadow-2xl flex items-center justify-center flex-col p-10  rounded-[10px]">
			<h1 className="text-3xl font-bold text-deep-text mb-6">{name}</h1>
			<p className="text-center w-[65%] mb-16 text-sm">{desc}</p>

			<h3 className="text-deep-text text-sm font-bold mb-4">
				$<span className="text-6xl">{amount}</span> / month
			</h3>
			<p className="font-normal text-sm">for up to {contacts} contacts</p>
			<p className="font-normal text-sm">and up to {emails}</p>

			{!user?._id && <PrimaryButton text={name === "Starter" ? "Try For Free" : "Get Started"} sx="!mt-8 !w-1/2" href={"/create-account"} />}
			{user?._id && user?.role === "admin" && (
				<>
					{name === "Starter" && <PrimaryButton text={user?.subscription === "free" ? "Current Plan" : "Free Tier"} disabled={true} sx="!mt-8 !w-1/2" handleClick={planManagement} />}
					{name !== "Starter" && (
						<PrimaryButton text={user?.subscription === "pro" ? "Cancel Plan" : "Subscribe"} disabled={isLoading} isLoading={isLoading} sx="!mt-8 !w-1/2" handleClick={planManagement} />
					)}
				</>
			)}

			<div className="w-full mt-6">
				{features?.map((feature, index) => (
					<div key={index} className="flex items-center justify-start gap-2 mb-2">
						<span className="w-8 h-8 flex items-center justify-center text-[#4FD1C5]">
							<IoCheckmark />
						</span>
						<p>{feature}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PricingCard;
