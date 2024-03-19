/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const StripeSuccess = () => {
	// useEffect(() => {
	// 	if (!sessionId) {
	// 		router("/stripe");
	// 		return;
	// 	}
	// 	(async function () {
	// 		try {
	// 			await axios.get(`/api/stripe/validate-checkout-session?sessionId=${sessionId}`);
	// 			setSuccess(true);
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	})();
	// }, [sessionId, router]);
	return (
		<main className="w-full h-screen bg-blue-50 flex items-center justify-center">
			<div className="w-[460px] h-auto min-h-[70vh] rounded-[5px] flex items-center flex-col p-10 shadow-2xl bg-white">
				<>
					<h3 className="font-black text-2xl text-red-500 mb-4">Payment Error</h3>
					<p className="text-center opacity-80">Your payment was cancelled or unsuccesful. Proceed to the payment page to try again.</p>

					<div className="flex items-center justify-center flex-col mt-24">
						<Link href="/pricings" className="w-[250px] bg-blue-400 flex items-center justify-center text-white mb-4 rounded-[5px] py-2">
							Back To Payment Page
						</Link>
					</div>
				</>
			</div>
		</main>
	);
};

export default StripeSuccess;
