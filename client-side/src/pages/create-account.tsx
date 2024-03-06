import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { registerSchema } from "@/libs/hookform";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Logo from "@/components/atoms/Logo";
import LogInWithGoogle from "@/components/atoms/LogInWithGoogle";
import { useRegisterUserRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

export default function CreateAccount() {
	const [tcsAccepted, setTcsAccepted] = useState(false);
	const { register, handleSubmit } = useSelectedPropertiesFromHookForm(registerSchema);
	const [registerUserRequest, { data, error, isLoading }] = useRegisterUserRequestMutation();

	const registerUser = (data: any) => {
		const { firstname, lastname, email, password } = data;
		registerUserRequest({ firstname, lastname, email, password });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<Logo />
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white" onSubmit={handleSubmit(registerUser)}>
					<h3 className="text-2xl font-medium">Sign up</h3>
					<LogInWithGoogle />
					<div className="w-full gap-3 mt-8  flex items-center justify-between">
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
						<p className="text-[#32325c] text-lg font-medium">or</p>
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
					</div>

					<PrimaryInput name="email" label="Email" register={register} />
					<PrimaryInput name="password" label="Password" type="password" register={register} />

					<div className="w-full flex items-center justify-between gap-4">
						<PrimaryInput name="firstname" label="First name" register={register} />
						<PrimaryInput name="lastname" label="Last name" register={register} />
					</div>

					<div className="w-full mb-6 flex items-center gap-2">
						<input type="checkbox" className="w-4 h-4 accent-sec" onChange={(e) => setTcsAccepted(e.target.checked)} />
						<label htmlFor="">
							I have read and agree to the <Link href="/">Terms of Use</Link>{" "}
						</label>
					</div>

					<PrimaryButton text="Sign Up" disabled={!tcsAccepted} type="submit" isLoading={isLoading} />

					<div className="w-full h-[1px] bg-[rgb(226,232,240)] my-8"></div>

					<Link href={"/login"} className="text-sec font-medium hover:underline">
						Already have an account? log in
					</Link>
				</form>
			</section>
		</main>
	);
}
