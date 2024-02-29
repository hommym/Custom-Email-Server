import Link from "next/link";
import { useState } from "react";

import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";

export default function Login() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<main className="w-full h-auto min-h-screen bg-bg">
			<section className="w-full max-w-[560px] flex flex-col items-center justify-center py-12 mx-auto">
				<div className="w-[300px] h-[40px] flex items-center justify-center gap-3">
					<div className="w-10 h-10 bg-[green]"></div>
					<h3 className="text-deep-text font-bold text-[28px]">Email API</h3>
				</div>
				<form action="" className="w-full flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 p-12 px-16 shadow-md bg-white">
					<h3 className="text-3xl font-normal">Log in</h3>
					<button className="w-[180px] flex items-center gap-2 mt-8 h-10 p-[3px] bg-[#1a73e8] rounded-[3px] overflow-hidden">
						<div className="w-9 rounded-l-[3px] h-full bg-white flex items-center justify-center"></div>
						<p className="text-sm text-white font-medium">Sign in with Google</p>
					</button>

					<div className="w-full gap-3 mt-8  flex items-center justify-between">
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
						<p className="text-[#32325c] text-lg font-medium">or</p>
						<div className="w-1/2 block h-[1px] bg-[rgb(226,232,240)]"></div>
					</div>

					<PrimaryInput name="email" label="Email" id="email" />
					<PrimaryInput name="password" label="Password" id="password" type="password" />

					<div className="w-full mb-6 flex items-center gap-2">
						<input type="checkbox" className="w-4 h-4 accent-sec" onChange={(e) => setLoggedIn(e.target.checked)} />
						<label htmlFor="">Keep me logged in</label>
					</div>

					<PrimaryButton text="Sign In" />

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
