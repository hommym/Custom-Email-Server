import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { loginSchema } from "@/libs/hookform";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import LogInWithGoogle from "@/components/atoms/LogInWithGoogle";
import Logo from "@/components/atoms/Logo";
import { useLoginRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { useRouter } from "next/router";

export default function Login() {
	const [loggedIn, setLoggedIn] = useState(false);
	const { register, handleSubmit, reset } = useSelectedPropertiesFromHookForm(loginSchema);
	const [loginUserRequest, { data, error, isLoading }] = useLoginRequestMutation();
	const router = useRouter();

	const loginUser = (data: any) => {
		const { email, password } = data;
		loginUserRequest({ email, password });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Login was successful", { autoClose: 1500 });
		reset();

		setTimeout(() => {
			// Set user data
			router.replace("/dashboard");
		}, 1500);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<Logo />
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white" onSubmit={handleSubmit(loginUser)}>
					<h3 className="text-3xl font-normal">Log in</h3>
					<LogInWithGoogle />

					<div className="w-full gap-3 mt-8  flex items-center justify-between">
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
						<p className="text-[#32325c] text-lg font-medium">or</p>
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
					</div>

					<PrimaryInput name="email" label="Email" register={register} />
					<PrimaryInput name="password" label="Password" register={register} type="password" />

					<div className="w-full mb-6 flex items-center gap-2">
						<input type="checkbox" className="w-4 h-4 accent-sec" onChange={(e) => setLoggedIn(e.target.checked)} />
						<label htmlFor="">Keep me logged in</label>
					</div>

					<PrimaryButton text="Sign In" type="submit" isLoading={isLoading} />

					<div className="w-full h-[1px] bg-[rgb(226,232,240)] my-8"></div>

					<div className="flex items-center w-full justify-between gap-4">
						<Link href={"/forgot-password"} className="text-sec hover:opacity-80">
							I forgot my password
						</Link>
						<Link href={"/create-account"} className="text-sec hover:opacity-80">
							Don't have an account? sign up
						</Link>
					</div>
				</form>
			</section>
		</main>
	);
}
