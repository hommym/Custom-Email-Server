import React from "react";
import Image from "next/image";

import pricings from "@/data/pricings.json";

import Staticpage from "@/components/layouts/Staticpage";
import PricingCard from "@/components/molecules/PricingCard";

import PricingsImage from "@/assets/pricings.png";

export interface IPricing {
	name: string;
	desc: string;
	amount: number;
	emails: string;
	contacts: number;
	features: string[];
}

const Pricings = () => {
	return (
		<Staticpage>
			<main className="py-24 bg-[#F8F8FC] w-full flex items-center justify-center flex-col">
				<div className="w-12 h-12  mb-12 rounded-full flex items-center relative justify-center">
					<Image alt="Pricings Image" src={PricingsImage} fill />
				</div>
				<h1 className="text-4xl  font-bold text-deep-text">Email Marketing Pricing</h1>

				<p className="text-sm opacity-80 mt-3">Choose an Email Marketing plan that best suits your business needs.</p>

				<div className="w-full max-w-4xl mx-auto mt-14 flex items-start justify-between gap-12">
					{pricings?.map((pricing, index) => (
						<PricingCard {...pricing} />
					))}
				</div>
			</main>
		</Staticpage>
	);
};

export default Pricings;
