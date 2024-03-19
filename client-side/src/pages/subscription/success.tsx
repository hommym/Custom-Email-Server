/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const StripeSuccess = () => {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const type = searchParams.get("type");
	const router = useRouter();

	useEffect(() => {
		if (!sessionId || !type) {
			router.replace("/pricings");
			return;
		}
	}, [sessionId, type]);
	// Reload is needed to fetch new data, too lazy to use redux
	const backHome = () => {
		window.location.href = "/pricings";
	};
	return (
		<main className="w-full h-screen bg-blue-50 flex items-center justify-center">
			<div className="w-[460px] h-auto min-h-[70vh] rounded-[5px] flex items-center flex-col p-10 shadow-2xl bg-white">
				<>
					<h3 className="font-black text-2xl mb-4">Payment Successful</h3>
					<p className="text-center opacity-80">Your payment was successful. Please proceed</p>

					<div className="flex items-center justify-center flex-col mt-24">
						<button onClick={backHome} className="w-[250px] bg-blue-400 flex items-center justify-center text-white mb-4 rounded-[5px] py-2">
							Back To Payment Page
						</button>
					</div>
				</>
			</div>
		</main>
	);
};

export default StripeSuccess;
