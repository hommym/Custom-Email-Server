import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import Logo from "@/components/atoms/Logo";

export default function VerifyAccount() {
	const params = useSearchParams();
	const token = params.get("token");

	const verifyAccount = () => {
		if (!token) {
			toast.error("The provided token is not valid", { autoClose: 1500 });
			return;
		}
		console.log(token);
	};

	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<Logo />
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white">
					<h3 className="text-3xl mb-8 font-normal">Verify Your Account</h3>
					<p className="mb-8 opacity-90">Please click on the button below to show your consent and proceed to verify your account on Elastic Email .</p>

					<PrimaryButton text="Verify Account" handleClick={verifyAccount} />
				</form>
			</section>
		</main>
	);
}
