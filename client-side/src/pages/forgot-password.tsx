import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect } from "react";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { forgotPasswordSchema } from "@/libs/hookform";
import { useRequestPasswordResetRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Logo from "@/components/atoms/Logo";

export default function Login() {
	const { register, handleSubmit, reset } = useSelectedPropertiesFromHookForm(forgotPasswordSchema);
	const [resetPasswordRequest, { data, error, isLoading }] = useRequestPasswordResetRequestMutation();

	const resetPassword = (data: any) => {
		const { email } = data;
		resetPasswordRequest({ email });
	};
	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
		reset();
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<Logo />
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white" onSubmit={handleSubmit(resetPassword)}>
					<h3 className="text-3xl mb-8 font-normal">Reset your password</h3>
					<p className="mb-8">Enter your email address below and we'll send you a link to reset your password.</p>

					<PrimaryInput name="email" label="Email" register={register} />
					<PrimaryButton text="Send recovery link" type="submit" isLoading={isLoading} />

					<Link href={"/login"} className="text-sec  mt-12 hover:opacity-80">
						Back
					</Link>
				</form>
			</section>
		</main>
	);
}
