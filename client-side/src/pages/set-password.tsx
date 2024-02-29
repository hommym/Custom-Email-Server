import Link from "next/link";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";

export default function Login() {
	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<div className="w-[300px] h-[40px] flex items-center justify-center gap-3">
					<div className="w-10 h-10 bg-[green]"></div>
					<h3 className="text-deep-text font-bold text-[28px]">Email API</h3>
				</div>
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white">
					<h3 className="text-3xl mb-8 font-normal">Set your password</h3>
					<p className="mb-8 opacity-90">Enter your new password below to proceed to reset your password.</p>

					<PrimaryInput name="email" type="password" label="Enter Password" id="email" />
					<PrimaryInput name="email" type="password" label="Confirm Password" id="email" />

					<PrimaryButton text="Reset Password" />

					<Link href={"/login"} className="text-sec  mt-12 hover:opacity-80">
						Cancel reset
					</Link>
				</form>
			</section>
		</main>
	);
}
