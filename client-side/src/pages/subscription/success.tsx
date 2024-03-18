/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import axios from "axios";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Link from "next/link";
import { useParams } from "next/navigation";

const StripeSuccess = () => {
	const [success, setSuccess] = useState(false);
	const searchParams = useParams();
	console.log(searchParams);
	// const sessionId = searchParams.get("session_id");
	// const router = useNavigate();

	// useEffect(() => {
	// 	if (!sessionId) {
	// 		router("/stripe", { replace: true });
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
				{success && (
					<>
						<h3 className="font-black text-2xl mb-4">Payment Successful</h3>
						<p className="text-center opacity-80">Your payment was successful. Please proceed</p>

						<div className="flex items-center justify-center flex-col mt-24">
							<Link href="/stripe" className="w-[250px] bg-blue-400 flex items-center justify-center text-white mb-4 rounded-[5px] py-2">
								Back To Payment Page
							</Link>
						</div>
					</>
				)}

				{!success && (
					<>
						<h3 className="font-black text-2xl mb-4">Validating Payment</h3>
						<p className="text-center opacity-80">Please wait while we validate your payment...</p>{" "}
						<div className="mt-12">
							<p className="opacity-80">Verifying payment, please wait...</p>
						</div>
					</>
				)}
			</div>
		</main>
	);
};

export default StripeSuccess;
