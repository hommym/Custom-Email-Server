import Link from "next/link";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Logo from "@/components/atoms/Logo";
import { setPasswordSchema } from "@/libs/hookform";

export default function SetPassword() {
	const { register, handleSubmit } = useSelectedPropertiesFromHookForm(setPasswordSchema);

	const setPassword = (data: any) => {
		const { email } = data;
		console.log({ email });
	};

	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<Logo />
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white" onSubmit={handleSubmit(setPassword)}>
					<h3 className="text-3xl mb-8 font-normal">Set your password</h3>
					<p className="mb-8 opacity-90">Enter your new password below to proceed to reset your password.</p>

					<PrimaryInput name="password" type="password" label="Enter Password" register={register} />
					<PrimaryInput name="confirmpassword" type="password" label="Confirm Password" register={register} />

					<PrimaryButton text="Reset Password" type="submit" />

					<Link href={"/login"} className="text-sec  mt-12 hover:opacity-80">
						Cancel reset
					</Link>
				</form>
			</section>
		</main>
	);
}
